import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet } from 'react-native'
import AppBackground from '@components/background'
import InfoMark from '@app/components/InstantTrade/InfoMark'
import TopRow from '@components/top_row'
import { useEffect, useState } from 'react'
import { TradeTypeSwitcher } from '@app/refactor/screens/convert/components/TradeTypeSwitcher'
import { Timer } from '@app/refactor/screens/convert/components/Timer'
import { useApi } from '@app/refactor/setup/network/useApi'
import { fetchOffersApi } from '@app/refactor/screens/convert/api/convertNowApi'

const ConvertNow = ({ navigation }: ScreenProp<'ConvertNow'>) => {
	const { styles, theme } = useTheme(_styles)

	const [tradeType, setTradeType] = useState<TradeType>('Buy')

	return (
		<AppBackground>
			<TopRow
				headlineLogo={<InfoMark inner="?" color={theme.color.textThird} />}
			/>
			<TradeTypeSwitcher
				selectedType={tradeType}
				onTypeChanged={setTradeType}
			/>
			<Timer />
		</AppBackground>
	)
}
const _styles = (theme: Theme) => StyleSheet.create({})

export default ConvertNow
