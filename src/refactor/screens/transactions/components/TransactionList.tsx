import React, { memo, useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import CustomRefreshContol from '@app/components/CustomRefreshContol'

import List from '@app/assets/images/List.svg'
import AppText from '@app/components/AppText'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'
import colors from '@app/constants/colors'
import Transaction from '@app/refactor/screens/transactions/components/Transaction'
import ListFooter from './ListFooter'
import useTransactions from '../hooks/useTransactions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { useFocusEffect } from '@react-navigation/native'

const TransactionList = ({ isInstantTrade }) => {
	const {
		fetchTransactions,
		refreshTransactions,
		transactions,
		transactionsLoading,
		totalTransactionsQty,
		reachScrollEnd,
	} = useTransactions()

	const {
		typeFilter,
		method,
		status,
		cryptoFilter,
		fromDateTime,
		toDateTime,
		txIdOrRecipient,
	} = useSelector((state: RootState) => state.transactions)

	useFocusEffect(
		useCallback(() => {
			fetchTransactions()
		}, [
			typeFilter,
			method,
			status,
			cryptoFilter,
			fromDateTime,
			toDateTime,
			txIdOrRecipient,
		])
	)

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
