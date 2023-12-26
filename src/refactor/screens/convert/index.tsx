import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import InfoMark from '@app/components/InstantTrade/InfoMark'
import colors from '@app/constants/colors'
import { setTradeType } from '@app/redux/trade/actions'
import TopRow from '@components/top_row'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { TradeTypeSwitcher } from '@app/refactor/screens/convert/components/trade_type_switcher'

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
		</AppBackground>
	)
}
const _styles = (theme: Theme) => StyleSheet.create({})

export default ConvertNow
