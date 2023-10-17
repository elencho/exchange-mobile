import {
	useNavigation,
	useFocusEffect,
	useIsFocused,
} from '@react-navigation/native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTradesThunk } from '@app/refactor/redux/trade/tradeThunks'
import { fetchTransactionsThunk } from '@app/refactor/redux/transactions/transactionThunks'
import TransactionModal from '@app/refactor/screens/transactions/components/TransactionModal'
import List from '../assets/images/List.svg'
import AppText from '../components/AppText'
import Background from '../components/Background'
import CustomRefreshContol from '../components/CustomRefreshContol'
import TransactionsBlock from '../components/InstantTrade/TransactionsBlock'
import OneTransactionSkeleton from '../components/TransactionHistory/OneTransactionSkeleton'
import TopRow from '../components/TransactionHistory/TopRow'
import Transaction from '../components/TransactionHistory/Transaction'
import TransactionSkeleton from '../components/TransactionHistory/TransactionSkeleton'
import SearchAndFilter from '../components/TransactionHistory/widgets/SearchAndFilter'
import TabSwitcher from '../components/TransactionHistory/widgets/TabSwitcher'
import colors from '../constants/colors'
import { clearFiltersTrade, saveTrades } from '../redux/trade/actions'
import {
	chooseCurrency,
	clearFilters,
	reachScrollEnd,
	setAbbr,
	setActiveTab,
	setTransactionsOffset,
} from '../redux/transactions/actions'

function TransactionHistory({ navigation }) {
	const isFocused = useIsFocused()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTransactionsThunk())
		dispatch(fetchTradesThunk())
	}, [])

	const state = useSelector((state) => state)
	const {
		transactions: {
			transactions,
			loading,
			totalTransactions,
			code: currencyCode,
			currency,
			activeTab,
		},
		trade: { moreTradesLoading },
	} = state

	const clearAllFilters = () => {
		dispatch(clearFiltersTrade())
		dispatch(clearFilters())
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
		dispatch(setActiveTab('Transfer'))
		Keyboard.dismiss()
	}

	useFocusEffect(
		useCallback(() => {
			dispatch(chooseCurrency(currency))
		}, [currency])
	)

	useEffect(() => {
		dispatch(chooseCurrency('Show All Currency'))
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
		Keyboard.dismiss()
	}, [navigation])

	useEffect(() => {
		return () => clearAllFilters()
	}, [])

	useEffect(() => {
		return () => {
			dispatch(clearFiltersTrade())
			dispatch(clearFilters())
			dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
			dispatch(setActiveTab('Transfer'))
			Keyboard.dismiss()
		}
	}, [])

	//Loader for Convert
	const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
	const numOfRender = useRef(0)
	useEffect(() => {
		numOfRender.current++
	}, [activeTab])

	useEffect(() => {
		setTimeout(() => {
			setIsLoadingTransactions(false)
		}, 1000)
	}, [])

	const onRefresh = () => {
		dispatch(setTransactionsOffset(0))
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
	}

	const transactionsCurrencyFiltered =
		currency === 'Show All Currency'
			? transactions
			: transactions.filter((t) => t.currency == currencyCode)

	const renderTransaction = ({ item, index }) => {
		return (
			<Transaction
				isTransfer
				transactionData={item}
				loading={loading}
				isLast={
					!moreTradesLoading &&
					index === transactionsCurrencyFiltered?.length - 1
				}
			/>
		)
	}

	const listEmptyContainer = (
		<View style={styles.empty}>
			<List />
			<AppText subtext style={styles.subtext}>
				Transaction history no transactions
			</AppText>
		</View>
	)

	const handleScrollEnd = () => {
		if (transactions.length === totalTransactions) {
			return
		} else if (transactions.length <= totalTransactions && !moreTradesLoading) {
			dispatch(reachScrollEnd('transactions'))
		}
	}

	const footer = memo(() =>
		moreTradesLoading && !loading ? (
			<TransactionSkeleton
				length={[0]}
				isInstantTrade={activeTab === 'Instant trade'}
				isFooter
			/>
		) : (
			<View />
		)
	)

	return (
		<Background>
			<TopRow clear={clearAllFilters} />
			<TabSwitcher />
			<SearchAndFilter
				navigation={navigation}
				isInstantTrade={activeTab === 'Instant trade'}
			/>

			{loading || isLoadingTransactions ? (
				<View style={{ marginTop: 10 }}>
					<TransactionSkeleton
						length={[0, 1, 2, 3, 4, 5, 6]}
						isInstantTrade={activeTab === 'Instant trade'}
					/>
				</View>
			) : activeTab === 'Transfer' ? (
				<FlatList
					style={styles.transactions}
					contentContainerStyle={{ flexGrow: 1 }}
					data={transactionsCurrencyFiltered}
					renderItem={renderTransaction}
					keyExtractor={(item, index) => item.transactionId + index}
					onEndReached={handleScrollEnd}
					onEndReachedThreshold={1}
					showsVerticalScrollIndicator={false}
					nestedScrollEnabled
					initialNumToRender={5}
					ListFooterComponent={transactions.length > 0 && footer}
					ListEmptyComponent={listEmptyContainer}
					keyboardShouldPersistTaps="never"
					maxToRenderPerBatch={30}
					refreshControl={
						<CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
					}
				/>
			) : (
				<TransactionsBlock isFirstRender={numOfRender.current === 1} />
			)}

			{isFocused && <TransactionModal transactions />}
		</Background>
	)
}

export default TransactionHistory

const styles = StyleSheet.create({
	empty: {
		flex: 1,
		marginTop: '35%',
		alignItems: 'center',
	},
	loader: {
		flex: 1,
	},
	transactions: {
		flex: 1,
		marginTop: 30,
	},
	filter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
		marginTop: 17,
	},
})
