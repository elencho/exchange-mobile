import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useTheme } from '@theme/index'
import { StyleSheet, View } from 'react-native'
import AppBackground from '@components/background'
import InfoMark from '@app/components/InstantTrade/InfoMark'
import TopRow from '@components/top_row'
import { useEffect, useRef, useState } from 'react'
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

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	const { styles, theme } = useTheme(_styles)

	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [chosenCard, setChosenCard] = useState<Card>()
	const [selectedChip, setSelectedChip] = useState<number>()
	const [buyWithCardChecked, setBuyWithCardChecked] = useState(false)

	const [fiatModalVisible, setFiatModalVisible] = useState(false)
	const [cryptoModalVisible, setCryptoModalVisible] = useState(false)
	const [buttonClicked, setButtonClicked] = useState(false)

	const {
		pair,
		fiats,
		cryptos,
		cards,
		fees,
		loading,
		fetchCoins,
		onCoinSelected,
	} = useCoins()

	useEffect(() => {
		cards.length === 1 && setChosenCard(cards[0])
	}, [cards])

	const handleDropDownClick = (type: CoinType) => {
		type === 'Crypto' ? setCryptoModalVisible(true) : setFiatModalVisible(true)
	}

	const CryptoModals = () => {
		return (
			<>
				<ChooseFiatModal
					visible={fiatModalVisible}
					fiats={fiats}
					onCoinSelected={(fiat: Coin) => {
						onCoinSelected(fiat)
						setFiatModalVisible(false)
					}}
					dismiss={() => setFiatModalVisible(false)}
				/>

				<ChooseCryptoModal
					visible={cryptoModalVisible}
					cryptos={cryptos}
					onCoinSelected={(crypto: Coin) => {
						onCoinSelected(crypto)
						setCryptoModalVisible(false)
					}}
					dismiss={() => setCryptoModalVisible(false)}
				/>
			</>
		)
	}

	return (
		<AppBackground>
			<TopRow
				headlineLogo={<InfoMark inner="?" color={theme.color.textThird} />}
			/>
			{loading || !pair ? (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					style={{ alignSelf: 'center' }}
				/>
			) : (
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
						handleButtonClick={(success) => {
							console.log(success)
							setButtonClicked(false)
						}}
						buttonClicked={buttonClicked}
					/>
					{!buyWithCardChecked && (
						<BalanceChips
							selectedChip={selectedChip}
							onChipSelect={setSelectedChip}
						/>
					)}
					{tradeType === 'Buy' && pair.fiat.buyWithCard && (
						<CardSection
							cards={cards}
							chosenCard={chosenCard}
							buyWithCardChecked={buyWithCardChecked}
							setBuyWithCardChecked={setBuyWithCardChecked}
							chooseCardClicked={() =>
								navigation.navigate('SelectCard', {
									cards,
									fees,
									onCardChoose(card) {
										setChosenCard(card)
									},
								})
							}
						/>
					)}
					<Timer
						pair={pair}
						tradeType={tradeType}
						onTimerExpired={() => fetchCoins()}
					/>

					<View style={{ flex: 1 }} />
					<AppButton
						style={styles.button}
						backgroundColor={
							tradeType === 'Buy' ? convertColors.buy : convertColors.sell
						}
						variant="primary"
						text={
							(tradeType === 'Buy' ? 'Buy' : 'Sell') +
							' ' +
							pair?.fiat.displayCcy
						}
						onPress={() => {
							setButtonClicked(true)
						}}
					/>

					<InfoModal />
					<CryptoModals />
				</View>
			)}
		</AppBackground>
	)
}
const _styles = () =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		button: {
			marginBottom: 30,
		},
	})

export default ConvertNow
