import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../../../constants/colors'
import AppText from '../../AppText'
import PurpleText from '../../PurpleText'

export default function BulletsBlock() {
	const bullets = [
		'A deposit address is necessary if you are receiving assets from outside of Cryptal',
		'You do not need an address to trade',
	]

	const Bullet = ({ b }) => (
		<View style={styles.row}>
			<View style={styles.bullet} />
			<AppText subtext style={styles.subtext}>
				{b}
			</AppText>
		</View>
	)

	return (
		<View style={styles.block}>
			{bullets.map((b) => (
				<Bullet key={b} b={b} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		paddingVertical: 18,
		paddingHorizontal: 22,
		marginVertical: 10,
		backgroundColor: 'rgba(140, 144, 252, 0.1)',
	},
	bullet: {
		width: 5,
		height: 5,
		backgroundColor: '#838BB2',
		marginTop: 5,
	},

	row: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	subtext: {
		color: '#838BB2',
		lineHeight: 15,
		marginLeft: 15,
	},
})
