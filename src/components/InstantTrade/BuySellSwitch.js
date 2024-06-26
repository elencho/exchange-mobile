import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { setTradeType } from '../../redux/trade/actions'
import AppText from '../AppText'

export default function BuySellSwitch() {
	const dispatch = useDispatch()
	const tradeType = useSelector((state) => state.trade.tradeType)

	const backgroundCond = (t) => {
		if (tradeType === t && tradeType === 'Buy') {
			return { backgroundColor: '#0CCBB5' }
		}
		if (tradeType === t && tradeType === 'Sell') {
			return { backgroundColor: '#E0355D' }
		}
		return { backgroundColor: colors.SECONDARY_BACKGROUND }
	}

	const handleType = (t) => dispatch(setTradeType(t))

	useEffect(() => {
		return () => handleType('Buy')
	}, [])

	return (
		<View style={styles.container}>
			{['Buy', 'Sell'].map((t) => (
				<Pressable
					style={[styles.button, backgroundCond(t)]}
					key={t}
					onPress={() => handleType(t)}>
					<AppText style={styles.text} body>
						{t}
					</AppText>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 40,
		flex: 1,
	},
	text: {
		color: colors.PRIMARY_TEXT,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		// paddingBottom: 20,
		gap: 10,
		marginTop: 10,
	},
})
