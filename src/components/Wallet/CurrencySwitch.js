import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { setUsdBtcSwitch } from '../../redux/wallet/actions'
import AppText from '../AppText'

export default function CurrencySwitch() {
	const dispatch = useDispatch()
	const filter = useSelector((state) => state.wallet.usdBtcSwitch)

	const setFilter = (f) => {
		dispatch(setUsdBtcSwitch(f))
	}

	return (
		<View style={styles.row}>
			{['USD', 'BTC'].map((f, i) => (
				<Pressable
					key={f}
					style={[styles.filter, i === 1 && { marginLeft: 8 }]}
					onPress={() => setFilter(f)}>
					<AppText
						body
						style={{
							color:
								colors[f === filter ? 'SECONDARY_PURPLE' : 'SECONDARY_TEXT'],
						}}>
						{f}
					</AppText>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	filter: {
		width: 55,
		height: 25,
		borderRadius: 13,
		backgroundColor: 'rgba(122, 132, 181, 0.15)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
	},
})
