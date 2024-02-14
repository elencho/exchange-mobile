import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useTheme } from '@theme/index'
import { StyleSheet, View } from 'react-native'
import AppBackground from '@components/background'
import InfoMark from '@app/components/InstantTrade/InfoMark'
import TopRow from '@components/top_row'
import { useEffect, useState } from 'react'
import { TradeTypeSwitcher } from '@app/refactor/screens/convert/components/TradeTypeSwitcher'
import { Timer } from '@app/refactor/screens/convert/components/Timer'
import { useCoins } from '@app/refactor/screens/convert/hooks/use-coins'
import ChooseFiatModal from '@app/refactor/screens/convert/modals/ChooseFiatModal'
import { MaterialIndicator } from 'react-native-indicators'
import ChooseCryptoModal from '@app/refactor/screens/convert/modals/ChooseCryptoModal'
import BalanceChips from '@app/refactor/screens/convert/components/BalanceChips'
import InfoModal from '@app/components/InstantTrade/InfoModal'
import CardSection from '@app/refactor/screens/convert/components/CardSection'
import CoinPair from '@app/refactor/screens/convert/components/CoinPair'
import { AppButton } from '@components/button'
import { convertColors } from '@app/refactor/screens/convert/util'
import { useNotificationPermissions } from '@app/screens/useNotificationPermissions'
import WithKeyboard from '@app/components/WithKeyboard'
import CardTotalFee from '@app/refactor/screens/convert/components/CardTotalFee'
import { handlePair } from '@app/refactor/screens/convert/hooks/handle-pair'

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	useNotificationPermissions()

	const { styles, theme } = useTheme(_styles)

	const [cardError, setCardError] = useState<boolean>(false)
	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [chosenCard, setChosenCard] = useState<Card>()
	const [selectedChip, setSelectedChip] = useState<number>()
	const [buyWithCardChecked, setBuyWithCardChecked] = useState(false)

	const [fiatModalVisible, setFiatModalVisible] = useState(false)
	const [cryptoModalVisible, setCryptoModalVisible] = useState(false)

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
			})
	}

	const {
		pair,
		fiats,
		cryptos,
		cards,
		fees,
		loading,
		fetchCoins,
		onCoinSelected,
		maxLimitCard,
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
	})

	useEffect(() => {
		if (tradeType === 'Buy') {
			cards.length === 1 && setChosenCard(cards[0])
		} else {
			setChosenCard(undefined)
		}
	}, [tradeType, cards])

	useEffect(() => {
		clearErrors()
	}, [tradeType])

	const clearErrors = () => {
		setErrorInputs([])
		setErrorText('')
		setCardError(false)
	}

	const onTimerExpire = () => {
		fetchCoins()
	}

	const onButtonClick = () => {
		if (buyWithCardChecked && !chosenCard) {
			setCardError(true)
			setErrorInputs(['low', 'up'])
		} else if (
			buyWithCardChecked &&
			maxLimitCard &&
			Number(upAmount) > maxLimitCard
		) {
			setErrorText('max limit ' + maxLimitCard)
		} else {
			handleButtonClick()
		}
	}

	const handleDropDownClick = (type: CoinType) => {
		type === 'Crypto' ? setCryptoModalVisible(true) : setFiatModalVisible(true)
	}

	const buttonText = () => {
		const buySell = tradeType === 'Buy' ? 'Buy' : 'Sell'
		return buySell + ' ' + pair?.crypto.displayCcy
	}

	const showPercentages = !(
		tradeType === 'Buy' &&
		buyWithCardChecked &&
		pair?.fiat.buyWithCard === true
	)

	const showCardSection = tradeType === 'Buy' && pair?.fiat.buyWithCard === true

	const canShowLoading = () => {
		const noModalsVisible = !(fiatModalVisible || cryptoModalVisible)
		return noModalsVisible && pair !== undefined && loading
	}

	return (
		<AppBackground>
			<TopRow
				headlineLogo={<InfoMark inner="?" color={theme.color.textThird} />}
			/>
			{canShowLoading() || !pair ? (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					style={{ alignSelf: 'center' }}
				/>
			) : (
				<WithKeyboard
					style={styles.withKeyboard}
					keyboardVerticalOffsetIOS={40}
					flexGrow
					modal={undefined}
					refreshControl={undefined}
					padding={false}
					scrollUp={false}
					noRefresh={true}>
					<View style={styles.container}>
						<TradeTypeSwitcher
							selectedType={tradeType}
							onTypeChanged={setTradeType}
						/>
						<CoinPair
							pair={pair}
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
								selectedChip={selectedChip}
								onChipSelect={setSelectedChip}
							/>
						)}
						{showCardSection && (
							<CardSection
								chosenCard={chosenCard}
								buyWithCardChecked={buyWithCardChecked}
								setBuyWithCardChecked={(checked) => {
									setCardError(false)
									setBuyWithCardChecked(checked)
									if (!checked) {
										setChosenCard(undefined)
									}
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
							/>
						)}
						<Timer
							pair={pair}
							tradeType={tradeType}
							onTimerExpired={onTimerExpire}
						/>
						{buyWithCardChecked && chosenCard && (
							<CardTotalFee
								card={chosenCard}
								fiat={pair.fiat}
								amount={upAmount}
							/>
						)}
						<View style={{ height: 30 }} />
						<View style={{ flex: 1 }} />
						<AppButton
							style={styles.button}
							backgroundColor={
								tradeType === 'Buy' ? convertColors.buy : convertColors.sell
							}
							variant="primary"
							text={buttonText()}
							onPress={onButtonClick}
						/>
						<InfoModal />
						<ChooseFiatModal
							visible={fiatModalVisible}
							fiats={fiats}
							chosenFiat={pair.fiat}
							onCoinSelected={(fiat: Coin) => {
								onCoinSelected(fiat)
								setFiatModalVisible(false)
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
							}}
							dismiss={() => setCryptoModalVisible(false)}
						/>
					</View>
				</WithKeyboard>
			)}
		</AppBackground>
	)
}

const _styles = () =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		withKeyboard: {},
		button: {
			verticalAlign: 'bottom',
			marginBottom: 15,
		},
	})

export default ConvertNow
