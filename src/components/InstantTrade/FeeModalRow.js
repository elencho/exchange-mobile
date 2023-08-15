import React from 'react'
import { StyleSheet, View } from 'react-native'

import colors from '../../constants/colors'
import AppText from '../AppText'

export default function FeeModalRow({
	start,
	end,
	mastercard,
	visa,
	amex,
	hasAmex,
}) {
	return (
		<View style={styles.row}>
			<AppText style={[styles.text, styles.flex]} body>
				{start} - {end}
			</AppText>
			<View style={[styles.percentages, hasAmex && styles.flex]}>
				<View style={styles.percent}>
					<AppText body style={styles.text}>
						{mastercard} {mastercard && '%'}
					</AppText>
				</View>
				<View style={[styles.percent, !hasAmex && { marginLeft: 35 }]}>
					<AppText body style={styles.text}>
						{visa} {visa && '%'}
					</AppText>
				</View>
				{hasAmex && (
					<View style={styles.percent}>
						<AppText body style={styles.text}>
							{amex && amex.toFixed(1)} {amex && '%'}
						</AppText>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	flex: {
		flex: 0.5,
	},
	percentages: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	percent: {
		alignItems: 'center',
		width: 40, // same as icon container
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		color: colors.PRIMARY_TEXT,
	},
})
