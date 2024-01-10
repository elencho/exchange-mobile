import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View } from 'react-native'
import AppBackground from '@components/background'
import InfoMark from '@app/components/InstantTrade/InfoMark'
import TopRow from '@components/top_row'
import { useEffect, useState } from 'react'
import { TradeTypeSwitcher } from '@app/refactor/screens/convert/components/TradeTypeSwitcher'
import { Timer } from '@app/refactor/screens/convert/components/Timer'
import { CoinInput } from '@app/refactor/screens/convert/components/CoinInput'
import CoinInputArrow from '@assets/images/CoinInputArrow.svg'
import { useCoins } from '@app/refactor/screens/convert/hooks/use-coins'
import ChooseFiatModal from '@app/refactor/screens/convert/modals/ChooseFiatModal'
import { MaterialIndicator } from 'react-native-indicators'
import ChooseCryptoModal from '@app/refactor/screens/convert/modals/ChooseCryptoModal'
import BalanceChips from '@app/refactor/screens/convert/components/BalanceChips'
import InfoModal from '@app/components/InstantTrade/InfoModal'
import CardSection from '@app/refactor/screens/convert/components/CardSection'

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	const { styles, theme } = useTheme(_styles)

	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [buyWithCardChecked, setBuyWithCardChecked] = useState(false)
	const [chosenCard, setChosenCard] = useState<Card>()

	const [fiatModalVisible, setFiatModalVisible] = useState(false)
	const [cryptoModalVisible, setCryptoModalVisible] = useState(false)

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

	const CoinInputs = () => {
		const upperCoin = tradeType === 'Buy' ? pair?.fiat : pair?.crypto
		const lowerCoin = tradeType === 'Sell' ? pair?.fiat : pair?.crypto

		return upperCoin && lowerCoin ? (
			<View style={{ marginTop: 24 }}>
				<CoinInput coin={upperCoin} onDropdownClick={handleDropDownClick} />
				<View style={{ height: 10 }} />
				<CoinInput coin={lowerCoin} onDropdownClick={handleDropDownClick} />
				<CoinInputArrow
					width={36}
					height={36}
					style={{
						position: 'absolute',
						top: '40%',
						left: '45%',
					}}
				/>
			</View>
		) : (
			<View />
		)
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
				<View>
					<TradeTypeSwitcher
						selectedType={tradeType}
						onTypeChanged={setTradeType}
					/>
					<CoinInputs />
					{!buyWithCardChecked && (
						<BalanceChips
							onChipPressed={(balanceMultiplier) => {
								// TODO: Multiply balance
							}}
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

					<InfoModal />
					<CryptoModals />
				</View>
			)}
		</AppBackground>
	)
}
const _styles = (theme: Theme) => StyleSheet.create({})

export default ConvertNow
