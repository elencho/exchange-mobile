import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import colors from '../../constants/colors'
import AppText from '../AppText'
import NewCurrencySwitch from './NewCurrencySwitch'
import TotalBalanceSkeleton from './TotalBalanceSkeleton'

export default function TotalBalance({ balanceLoading }) {
	const filter = useSelector((state) => state.wallet.usdBtcSwitch)
	const balance = useSelector((state) => state.trade.balance)

	const primary = () => {
		if (balance) {
			const { totalValueBTC, totalValueUSD } = balance
			return filter === 'USD' ? `${totalValueUSD} USD` : `${totalValueBTC} BTC`
		}
	}

	const secondary = () => {
		if (balance) {
			const { totalValueBTC, totalValueUSD } = balance
			return filter === 'USD' ? `${totalValueBTC} BTC` : `${totalValueUSD} USD`
		}
	}

	return (
		<View style={styles.wrapper}>
			{!balanceLoading ? (
				<View style={styles.container}>
					<View style={styles.balanceContainer}>
						<View style={styles.justify}>
							<View style={styles.row}>
								<AppText header style={styles.primary}>
									{primary()}
								</AppText>
							</View>
							<View style={styles.row}>
								<AppText body style={styles.secondary}>
									{secondary()}
								</AppText>
							</View>
						</View>
					</View>
					<NewCurrencySwitch />
				</View>
			) : (
				<TotalBalanceSkeleton />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.SECONDARY_BACKGROUND,
		padding: 25,
		// borderRadius: 6,
		borderRadius: 22,
	},
	balanceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 14,
	},

	primary: {
		color: colors.PRIMARY_TEXT,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginBottom: 5,
		marginTop: 8,
	},
	row: {
		flexDirection: 'row',
	},
	wrapper: {
		paddingBottom: 25,
	},
})
