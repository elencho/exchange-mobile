import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import Skeleton from '../Skeleton'
import NewCurrencySwitch from './NewCurrencySwitch'

const TotalBalanceSkeleton = () => {
	return (
		<View style={styles.wrapper}>
			<Skeleton width={80} height={10} style={{ marginBottom: 18 }} />
			<Skeleton width={160} height={8} />
			<View style={{ marginTop: 30 }}>
				<NewCurrencySwitch />
			</View>
		</View>
	)
}

export default TotalBalanceSkeleton

const styles = StyleSheet.create({
	secSmallWrapper: {
		alignItems: 'flex-end',
	},
	wrapper: {
		padding: 25,

		backgroundColor: colors.SECONDARY_BACKGROUND,
	},
})
