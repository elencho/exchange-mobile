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
import {
	fetchBalanceApi,
	fetchOffersApi,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { useApi } from '@app/refactor/setup/network/useApi'
import { useCoins } from '@app/refactor/screens/hooks/use-coins'

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	const { styles, theme } = useTheme(_styles)

	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const { data, loading, fetchData } = useCoins()

	useEffect(() => {
		fetchData()
	}, [])

	const CoinInputs = () => {
		// change order based on buy/sell
		return (
			<View style={{ marginTop: 24 }}>
				<CoinInput />
				<View style={{ height: 10 }} />
				<CoinInput />
				<CoinInputArrow
					width={36}
					height={36}
					style={{
						position: 'absolute',
						top: '40%',
						left: '46%',
					}}
				/>
			</View>
		)
	}

	return (
		<AppBackground>
			<TopRow
				headlineLogo={<InfoMark inner="?" color={theme.color.textThird} />}
			/>
			<TradeTypeSwitcher
				selectedType={tradeType}
				onTypeChanged={setTradeType}
			/>
			<CoinInputs />
			<Timer />
		</AppBackground>
	)
}
const _styles = (theme: Theme) => StyleSheet.create({})

export default ConvertNow
