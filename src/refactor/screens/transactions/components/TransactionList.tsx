import { useIsFocused } from '@react-navigation/native'
import React, { memo, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomRefreshControl from '@components/refreshControll'
import List from '@app/assets/images/List.svg'
import AppText from '@app/components/AppText'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'
import colors from '@app/constants/colors'
import {
	fetchTransactionsThunk,
	reachScrollEndThunk,
	refreshTransactionsThunk,
} from '@app/refactor/redux/transactions/transactionThunks'
import Transaction from '@app/refactor/screens/transactions/components/Transaction'
import ListFooter from './ListFooter'

const TransactionList = () => {
	const isFocused = useIsFocused()
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTransactionsThunk())
	}, [])

	const {
		transactions: {
			transactions,
			transactionsLoading,
			totalTransactionsQty,
			code: currencyCode,
			currency,
			activeTab,
		},
	} = useSelector((state) => state)

	const renderTransaction = ({ item, index }) => {
		return (
			<Transaction
				isTransfer
				transactionData={item}
				loading={transactionsLoading}
				isLast={index === transactions?.length - 1}
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
		if (transactions.length === totalTransactionsQty) {
			return
		} else if (transactions.length <= totalTransactionsQty) {
			dispatch(reachScrollEndThunk())
		}
	}

	const footer = memo(() =>
		!transactionsLoading ? (
			<TransactionSkeleton
				length={[1]}
				isInstantTrade={activeTab === 'Instant trade'}
				isFooter
			/>
		) : (
			<View />
		)
	)

	return transactionsLoading ? (
		<View style={{ marginTop: 10 }}>
			<TransactionSkeleton
				length={[0, 1, 2, 3, 4, 5]}
				isInstantTrade={activeTab === 'Instant trade'}
				isFooter={false}
			/>
		</View>
	) : (
		<FlatList
			style={styles.transactions}
			contentContainerStyle={{ flexGrow: 1 }}
			data={transactions}
			renderItem={renderTransaction}
			keyExtractor={(item, index) => item.transactionId + index}
			onEndReached={handleScrollEnd}
			onEndReachedThreshold={1}
			showsVerticalScrollIndicator={false}
			nestedScrollEnabled
			initialNumToRender={10}
			ListFooterComponent={
				<ListFooter
					isLoading={transactionsLoading}
					dataArray={transactions}
					totalDataQty={totalTransactionsQty}
				/>
			}
			ListEmptyComponent={listEmptyContainer}
			keyboardShouldPersistTaps="never"
			maxToRenderPerBatch={30}
			refreshControl={
				<CustomRefreshControl
					refreshing={transactionsLoading}
					onRefresh={() => dispatch(refreshTransactionsThunk())}
				/>
			}
		/>
	)
}

export default TransactionList

const styles = StyleSheet.create({
	transactions: {
		flex: 1,
		marginTop: 30,
	},
	empty: {
		flex: 1,
		marginTop: '35%',
		alignItems: 'center',
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
		marginTop: 17,
	},
})
