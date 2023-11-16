import React, { memo, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import CustomRefreshContol from '@app/components/CustomRefreshContol'
import List from '@app/assets/images/List.svg'
import AppText from '@components/text'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'
import colors from '@app/constants/colors'
import Transaction from '@app/refactor/screens/transactions/components/ListComponents/Transaction'
import ListFooter from './ListFooter'
import { useTransactions } from '@app/refactor/screens/transactions/hooks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { FilterState } from '../../transactions_history'
import { useFocusEffect } from '@react-navigation/native'

interface Props {
	isInstantTrade: boolean
	isFilterVisible: FilterState
}

const TransactionList: React.FC<Props> = ({
	isInstantTrade,
	isFilterVisible,
}) => {
	const {
		fetchTransactions,
		refreshTransactions,
		transactions,
		transactionsLoading,
		totalTransactionsQty,
		reachScrollEnd,
	} = useTransactions()

	const {
		transactions: {
			typeFilter,
			method,
			status,
			cryptoFilter,
			fromDateTime,
			toDateTime,
			txIdOrRecipient,
		},
	} = useSelector((state: RootState) => state)

	useFocusEffect(
		useCallback(() => {
			isFilterVisible.shouldFilter && fetchTransactions()
		}, [
			typeFilter,
			method,
			status,
			cryptoFilter,
			fromDateTime,
			toDateTime,
			txIdOrRecipient,
			isFilterVisible.isVisible,
		])
	)

	const renderTransaction = ({
		item,
		index,
	}: {
		item: Transaction
		index: number
	}) => {
		return (
			<Transaction
				isTransfer
				transactionData={item}
				isLast={index === totalTransactionsQty - 1}
			/>
		)
	}

	const listEmptyContainer = (
		<View style={styles.empty}>
			<List />
			<AppText style={styles.subtext}>
				Transaction history no transactions
			</AppText>
		</View>
	)

	const handleScrollEnd = () => {
		if (transactions.length === totalTransactionsQty) {
			return
		} else if (transactions.length <= totalTransactionsQty) {
			reachScrollEnd()
		}
	}

	return transactionsLoading ? (
		<View style={{ marginTop: 10 }}>
			<TransactionSkeleton
				length={[0, 1, 2, 3, 4, 5]}
				isInstantTrade={isInstantTrade}
				isFooter={false}
			/>
		</View>
	) : (
		<FlatList
			style={styles.transactions}
			contentContainerStyle={{ flexGrow: 1 }}
			data={transactions}
			renderItem={renderTransaction}
			keyExtractor={(item) => item.id.toString()}
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
					isInstantTrade={isInstantTrade}
				/>
			}
			ListEmptyComponent={listEmptyContainer}
			keyboardShouldPersistTaps="never"
			maxToRenderPerBatch={30}
			refreshControl={
				<CustomRefreshContol
					refreshing={transactionsLoading}
					onRefresh={() => refreshTransactions()}
				/>
			}
		/>
	)
}

export default memo(TransactionList)

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
