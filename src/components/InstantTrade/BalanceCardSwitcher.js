import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AppText from '../AppText'
import colors from '../../constants/colors'
import {
	setDepositProvider,
	switchBalanceCard,
	setCard,
} from '../../redux/trade/actions'

export default function BalanceCardSwitcher() {
	const dispatch = useDispatch()
	const Balance_Card = useSelector((state) => state.trade.Balance_Card)

	const handleFilter = (filter) => {
		dispatch(switchBalanceCard(filter))
		dispatch(setDepositProvider(null))
		dispatch(setCard(null))
	}

	const stylesCond = (f) => {
		if (f === Balance_Card) {
			return styles.active
		} else {
			return styles.inactive
		}
	}

	const textCond = (f) => {
		let text
		if (f === 'balance') {
			text = 'From Balance'
		}
		if (f === 'card') {
			text = 'With card'
		}

		const isActive = f === Balance_Card
		return (
			<AppText
				body
				medium={isActive}
				style={{ color: isActive ? colors.SECONDARY_PURPLE : '#C0C5E0' }}>
				{text}
			</AppText>
		)
	}

	return (
		<View style={styles.filterRow}>
			{['balance', 'card'].map((f) => (
				<Pressable
					style={[styles.button, stylesCond(f)]}
					onPress={() => handleFilter(f)}
					key={f}>
					{textCond(f)}
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	active: {
		backgroundColor: 'rgba(101, 130, 253, 0.15)',
	},
	inactive: {
		backgroundColor: colors.SECONDARY_BACKGROUND,
	},
	button: {
		paddingVertical: 10,
		borderRadius: 40,
		width: '48%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	text: {
		fontSize: 15,
		lineHeight: 19,
		color: colors.SECONDARY_TEXT,
	},
})
