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
import { useCoins } from '@app/refactor/screens/hooks/use-coins'
import ChooseFiatModal from '@app/refactor/screens/convert/modals/ChooseFiatModal'
import { MaterialIndicator } from 'react-native-indicators'
import KV from '@store/kv/regular'
import ChooseCryptoModal from '@app/refactor/screens/convert/modals/ChooseCryptoModal'

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	const { styles, theme } = useTheme(_styles)

	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [fiatModalVisible, setFiatModalVisible] = useState(false)
	const [cryptoModalVisible, setCryptoModalVisible] = useState(false)

	const [chosenFiat, setChosenFiat] = useState<Coin>()
	const [chosenCrypto, setChosenCrypto] = useState<Coin>()

	const { fiats, cryptos, loading } = useCoins()

	useEffect(() => {
		if (fiats.length > 0 && cryptos.length > 0) {
			setChosenFiat(fiats[0])
			setChosenCrypto(cryptos[0])
		}
	}, [fiats, cryptos])

	const handleDropDownClick = (type: CoinType) => {
		type === 'Crypto' ? setCryptoModalVisible(true) : setFiatModalVisible(true)
	}

	const CoinInputs = () => {
		const upperCoin = tradeType === 'Buy' ? chosenFiat : chosenCrypto
		const lowerCoin = tradeType === 'Sell' ? chosenFiat : chosenCrypto

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

	return loading ? (
		<MaterialIndicator
			color="#6582FD"
			animationDuration={3000}
			style={[{ position: 'absolute', alignSelf: 'center' }]}
		/>
	) : (
		<AppBackground>
			<TopRow
				headlineLogo={<InfoMark inner="?" color={theme.color.textThird} />}
			/>
			{loading ? (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					style={[{ position: 'absolute', alignSelf: 'center' }]}
				/>
			) : (
				<View>
					<TradeTypeSwitcher
						selectedType={tradeType}
						onTypeChanged={setTradeType}
					/>
					<CoinInputs />
					<Timer />

					<ChooseFiatModal
						visible={fiatModalVisible}
						fiats={fiats}
						onCoinSelected={(fiat: Coin) => {
							setChosenFiat(fiat)
							setFiatModalVisible(false)
						}}
						dismiss={() => setFiatModalVisible(false)}
					/>

					<ChooseCryptoModal
						visible={cryptoModalVisible}
						cryptos={cryptos}
						onCoinSelected={(crypto: Coin) => {
							setChosenCrypto(crypto)
							setFiatModalVisible(false)
						}}
						dismiss={() => setCryptoModalVisible(false)}
					/>
				</View>
			)}
		</AppBackground>
	)
}
const _styles = (theme: Theme) => StyleSheet.create({})

export default ConvertNow
