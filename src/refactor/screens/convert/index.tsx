import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import AppBackground from '@components/background'
import TopRow from '@components/top_row'
import { useEffect, useState } from 'react'
import { TradeTypeSwitcher } from '@app/refactor/screens/convert/components/TradeTypeSwitcher'
import {
	COUNTDOWN_SECONDS,
	Timer,
} from '@app/refactor/screens/convert/components/Timer'
import { useCoins } from '@app/refactor/screens/convert/hooks/use-coins'
import ChooseFiatModal from '@app/refactor/screens/convert/modals/ChooseFiatModal'
import ChooseCryptoModal from '@app/refactor/screens/convert/modals/ChooseCryptoModal'
import BalanceChips from '@app/refactor/screens/convert/components/BalanceChips'
import CardSection from '@app/refactor/screens/convert/components/CardSection'
import CoinPair from '@app/refactor/screens/convert/components/CoinPair'
import { AppButton } from '@components/button'
import { convertColors } from '@app/refactor/screens/convert/util'
import { useNotificationPermissions } from '@app/screens/useNotificationPermissions'
import WithKeyboard from '@app/components/WithKeyboard'
import CardTotalFee from '@app/refactor/screens/convert/components/CardTotalFee'
import { handlePair } from '@app/refactor/screens/convert/hooks/handle-pair'
import InfoModal from '@app/refactor/screens/convert/modals/InfoModal'
import AppText from '@components/text'
import Skeleton from '@app/components/Skeleton'
import CustomRefreshContol from '@components/refresh-control'
import { useReturnedFrom } from '@app/refactor/common/hooks/use-returned-from'
import { t } from 'i18next'

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	useNotificationPermissions()

	const { styles } = useTheme(_styles)

	const [cardError, setCardError] = useState<boolean>(false)
	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [chosenCard, setChosenCard] = useState<Card>()
	const [selectedChip, setSelectedChip] = useState<number>()
	const [buyWithCardChecked, setBuyWithCardChecked] = useState(false)

	const [fiatModalVisible, setFiatModalVisible] = useState(false)
	const [cryptoModalVisible, setCryptoModalVisible] = useState(false)
	const [infoModalVisible, setInfoModalVisible] = useState(false)

	const goToConfirm = (spentAmount: string, receivedAmount: string) => {
		pair &&
			navigation.navigate('ConfirmConvert', {
				spentAmount,
				receivedAmount,
				pair,
				tradeType,
				card:
					tradeType === 'Buy' &&
					buyWithCardChecked &&
					pair.fiat.buyWithCard === true
						? chosenCard
						: undefined,
				onConfirmClose(reload: boolean) {
					if (reload) {
						resetScreen()
						fetchCoins(true, false)
					}
				},
			})
	}

	const {
		pair,
		fiats,
		cryptos,
		cards,
		fees,
		loading,
		refreshing,
		fetchCoins,
		fetchTotalFee,
		onCoinSelected,
		cardLimits,
		seconds,
		setSeconds,
		totalFee,
		setTotalFee,
	} = useCoins()

	const {
		upCoin,
		setUpCoin,
		upAmount,
		setUpAmount,
		lowCoin,
		setLowCoin,
		lowAmount,
		setLowAmount,
		lastChanged,
		setLastChanged,
		errorInputs,
		setErrorInputs,
		errorText,
		setErrorText,
		handleButtonClick,
		recalculateUp,
		recalculateLow,
	} = handlePair({
		tradeType,
		pair,
		buyWithCard: buyWithCardChecked,
		balanceMultiplier: selectedChip,
		onButtonSuccess: goToConfirm,
		cardLimits,
	})

	useReturnedFrom({
		from: 'UserProfile',
		onReturn: () => {
			resetScreen()
			fetchCoins(true, false)
		},
	})

	useEffect(() => {
		if (tradeType === 'Buy') {
			cards.length === 1 && setChosenCard(cards[0])
		} else {
			setChosenCard(undefined)
		}
	}, [tradeType, cards])

	useEffect(() => {
		if (!chosenCard) return
		if (!Number(upAmount)) {
			return setTotalFee({ fee: '0', total: '0' })
		}

		fetchTotalFee(chosenCard, Number(upAmount))
	}, [chosenCard, upAmount])

	useEffect(() => {
		setBuyWithCardChecked(false)
		clearErrors(true)
		setSelectedChip(undefined)
	}, [tradeType])

	useEffect(() => {
		if (!buyWithCardChecked) {
			cards.length !== 1 && setChosenCard(undefined)
		}
	}, [buyWithCardChecked])

	const clearErrors = (clearCard: boolean) => {
		setErrorInputs([])
		setErrorText('')
		clearCard && setCardError(false)
	}

	const onTimerExpire = () => {
		setSelectedChip(undefined)
		fetchCoins(false, false)
	}

	const onRefresh = () => {
		setSeconds(COUNTDOWN_SECONDS)
		fetchCoins(true, true)
	}

	const onButtonClick = () => {
		if (buyWithCardChecked && !chosenCard) {
			setCardError(true)
			if (!upAmount.trim().length || !lowAmount.trim().length) {
				setErrorInputs(['low', 'up'])
			}
		} else {
			handleButtonClick()
		}
	}

	const handleDropDownClick = (type: CoinType) => {
		type === 'Crypto' ? setCryptoModalVisible(true) : setFiatModalVisible(true)
	}

	const buttonText = () => {
		const buySell = tradeType === 'Buy' ? t('cn_buy') : t('cn_sell')
		return buySell + ' ' + pair?.crypto.displayCcy
	}

	const showPercentages = !(
		tradeType === 'Buy' &&
		buyWithCardChecked &&
		pair?.fiat.buyWithCard === true
	)

	const showCardSection = tradeType === 'Buy' && pair?.fiat.buyWithCard === true

	const InfoLogo = () => {
		return (
			<TouchableOpacity
				style={styles.infoContainer}
				onPress={() => setInfoModalVisible(true)}>
				<AppText variant="l" medium style={styles.infoText}>
					?
				</AppText>
			</TouchableOpacity>
		)
	}

	const resetScreen = () => {
		setUpAmount('')
		setLowAmount('')
		setLastChanged(null)
		setTradeType('Buy')
		setBuyWithCardChecked(false)
		setSelectedChip(undefined)
		clearErrors(true)
	}

	return (
		<AppBackground>
			<TopRow headlineLogo={<InfoLogo />} />
			<WithKeyboard
				keyboardVerticalOffsetIOS={40}
				flexGrow
				refreshControl={
					<CustomRefreshContol refreshing={refreshing} onRefresh={onRefresh} />
				}
				modal={undefined}
				padding={false}
				scrollUp={false}
				noRefresh={false}>
				<View style={styles.container}>
					<TradeTypeSwitcher
						selectedType={tradeType}
						onTypeChanged={setTradeType}
					/>
					<CoinPair
						pair={pair}
						loading={loading}
						tradeType={tradeType}
						balanceMultiplier={selectedChip}
						handleDropDownClick={handleDropDownClick}
						upCoin={upCoin}
						upAmount={upAmount}
						lowAmount={lowAmount}
						lowCoin={lowCoin}
						lastChanged={lastChanged}
						errorInputs={errorInputs}
						errorText={errorText}
						setUpCoin={setUpCoin}
						setLowCoin={setLowCoin}
						setUpAmount={setUpAmount}
						setLowAmount={setLowAmount}
						setLastChanged={setLastChanged}
						setErrorInputs={setErrorInputs}
						setErrorText={setErrorText}
						recalculateUp={recalculateUp}
						recalculateLow={recalculateLow}
					/>
					{showPercentages && (
						<BalanceChips
							animate={buyWithCardChecked}
							loading={loading}
							onChipSelect={(mul) => {
								clearErrors(false)
								setSelectedChip(mul)
							}}
						/>
					)}
					{showCardSection && (
						<CardSection
							chosenCard={chosenCard}
							buyWithCardChecked={buyWithCardChecked}
							setBuyWithCardChecked={(checked) => {
								clearErrors(true)
								setBuyWithCardChecked(checked)
							}}
							chooseCardClicked={() => {
								setCardError(false)
								navigation.navigate('SelectCard', {
									cards,
									fees,
									onCardChoose(card) {
										setChosenCard(card)
									},
								})
							}}
							error={cardError}
							loading={loading}
						/>
					)}
					<Timer
						seconds={seconds}
						setSeconds={setSeconds}
						pair={pair}
						loading={loading}
						tradeType={tradeType}
						onTimerExpired={onTimerExpire}
					/>
					{buyWithCardChecked && chosenCard && (
						<CardTotalFee
							card={chosenCard}
							fiat={pair?.fiat}
							loading={loading}
							totalFee={totalFee}
						/>
					)}
					<View style={{ height: 30 }} />
					<View style={{ flex: 1 }} />
					{loading ? (
						<Skeleton
							width={250}
							height={45}
							style={[styles.button, { borderRadius: 22, width: '100%' }]}
						/>
					) : (
						<AppButton
							style={styles.button}
							backgroundColor={
								tradeType === 'Buy' ? convertColors.buy : convertColors.sell
							}
							variant="primary"
							text={buttonText()}
							onPress={onButtonClick}
						/>
					)}
					<InfoModal
						visible={infoModalVisible}
						dismiss={() => setInfoModalVisible(false)}
					/>
					<ChooseFiatModal
						visible={fiatModalVisible}
						fiats={fiats}
						chosenFiat={pair?.fiat}
						onCoinSelected={(fiat: Coin) => {
							onCoinSelected(fiat)
							setFiatModalVisible(false)
							setBuyWithCardChecked(false)
							cards.length !== 1 && setChosenCard(undefined)
							clearErrors(false)
							setSelectedChip(undefined)
						}}
						dismiss={() => setFiatModalVisible(false)}
					/>
					<ChooseCryptoModal
						visible={cryptoModalVisible}
						cryptos={cryptos}
						pair={pair}
						tradeType={tradeType}
						onCoinSelected={(crypto: Coin) => {
							onCoinSelected(crypto)
							setCryptoModalVisible(false)
							clearErrors(false)
							setSelectedChip(undefined)
						}}
						dismiss={() => setCryptoModalVisible(false)}
					/>
				</View>
			</WithKeyboard>
		</AppBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		button: {
			verticalAlign: 'bottom',
			marginBottom: 15,
		},
		infoContainer: {
			borderColor: theme.color.textThird,
			borderWidth: 1,
			width: 25,
			height: 25,
			borderRadius: 15,
			justifyContent: 'center',
			alignItems: 'center',
		},
		infoText: {
			color: theme.color.textThird,
		},
	})

export default ConvertNow
