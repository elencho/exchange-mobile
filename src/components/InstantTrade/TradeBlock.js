import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import colors from '../../constants/colors'
import AppText from '../AppText'
import CurrencyDropdowns from './CurrencyDropdowns'
import ReadyTrades from './ReadyTrades'
import Timer from './Timer'

export default function TradeBlock() {
	const state = useSelector((state) => state.trade)
	const { fiat, crypto, tradeType, pairObject } = state

	const price = () => {
		let price
		const { buyPrice, sellPrice, pair } = pairObject
		if (pair) {
			if (pair.baseCurrency === crypto) {
				price = tradeType === 'Buy' ? buyPrice : sellPrice
			}
			return price
		}
	}

	return (
		<View style={styles.container}>
			<CurrencyDropdowns />

			<AppText subtext body style={styles.price}>
				1 {crypto} = {pairObject && price()} {fiat}
			</AppText>

			<ReadyTrades />

			<Timer />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginBottom: 10,
	},
	price: {
		color: colors.SECONDARY_TEXT,
		marginVertical: 10,
	},
})
