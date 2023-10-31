import { Pressable, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppText from '@components/text'
import PurpleText from '@app/components/PurpleText'
import colors from '@app/constants/colors'
import { IS_ANDROID } from '@app/constants/system'
import {
	clearTradeFilters,
	setTradesOffset,
} from '@app/refactor/redux/trade/tradeSlice'
import {
	clearTransactionFilters,
	setTransactionsOffset,
} from '@app/refactor/redux/transactions/transactionSlice'

function TransactionFilterBottom({ handleClose, isInstantTrade }) {
	const {
		transactions: {
			cryptoFilter: cryptoTransactions,
			method: selectedMethod,
			typeFilter,
			fromDateTime,
			toDateTime,
			status,
		},
		trades: {
			fiatCodesQuery,
			statusQuery,
			cryptoCodeQuery,
			actionQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
		},
	} = useSelector((state) => state)

	const dispatch = useDispatch()
	const isFilteredTrades = Boolean(
		fiatCodesQuery?.length > 0 ||
			actionQuery?.length > 0 ||
			statusQuery?.length > 0 ||
			cryptoCodeQuery ||
			fromDateTimeQuery ||
			toDateTimeQuery
	)
	const isFilteredTransactions = Boolean(
		typeFilter?.length > 0 ||
			cryptoTransactions ||
			fromDateTime ||
			toDateTime ||
			selectedMethod?.length > 0 ||
			status?.length > 0
	)
	const isFilteredAny = isInstantTrade
		? isFilteredTrades
		: isFilteredTransactions

	const showResults = () => {
		isInstantTrade
			? dispatch(setTradesOffset(0))
			: dispatch(setTransactionsOffset(0))
		handleClose()
	}

	const clear = () => {
		if (isFilteredAny) {
			handleClose()
			isInstantTrade
				? dispatch(clearTradeFilters())
				: dispatch(clearTransactionFilters())
		}
	}

	return (
		<View>
			<Pressable style={styles.button} onPress={showResults}>
				<AppText medium style={styles.white}>
					Show Result
				</AppText>
			</Pressable>
			<TouchableOpacity style={styles.clear} onPress={clear}>
				<PurpleText
					style={styles.purple}
					text="Clear Filters"
					disabled={!isFilteredAny}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default TransactionFilterBottom

const styles = StyleSheet.create({
	purple: {
		fontSize: 14,
		lineHeight: 18,
		marginTop: 30,
		marginBottom: IS_ANDROID ? 14 : 0,
		marginHorizontal: 5,
	},
	button: {
		backgroundColor: colors.PRIMARY_PURPLE,
		paddingVertical: 15,
		alignItems: 'center',
	},
	download: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	white: {
		fontSize: 14,
		lineHeight: 18,
		color: colors.PRIMARY_TEXT,
	},
	clear: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
})
