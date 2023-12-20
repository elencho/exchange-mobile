import React, { memo, useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import List from '@assets/images/List.svg'
import AppText from '@app/refactor/common/components/text'
import CustomRefreshContol from '@app/components/CustomRefreshContol'
// import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'
import TransactionSkeleton from './TransactionSkeleton'
import colors from '@app/constants/colors'
import Transaction from '@app/refactor/screens/transactions/components/ListComponents/Transaction'
import ListFooter from './ListFooter'
import { useTrades } from '@app/refactor/screens/transactions/hooks'
import { useFocusEffect } from '@react-navigation/native'
import { RootState } from '@app/refactor/redux/rootReducer'
import { FilterState } from '../../transactions_history'
import { TransactionModal } from '@app/refactor/screens/transactions/components/FilterComponents'

interface Props {
	isInstantTrade: boolean
	isFilterVisible: FilterState
}

const TradeList: React.FC<Props> = ({ isInstantTrade, isFilterVisible }) => {
	const {
		fetchTrades,
		refreshTrades,
		trades,
		tradesLoading,
		totalTradesQty,
		reachScrollEnd,
	} = useTrades()

	const {
		trades: {
			fiatCodesQuery,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
		},
	} = useSelector((state: RootState) => state)

	const [transactionDetails, setTransactionDetails] = useState({})

	useFocusEffect(
		useCallback(() => {
			isFilterVisible.shouldFilter && fetchTrades()
		}, [
			fiatCodesQuery,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
			isFilterVisible.isVisible,
		])
	)

	const handleScrollEnd = () => {
		if (trades.length === totalTradesQty) {
			return
		} else if (trades.length <= totalTradesQty) {
			reachScrollEnd()
		}
	}

	const onRefresh = () => refreshTrades()

	const renderTrade = ({ item, index }: { item: Trade; index: number }) => (
		<Transaction
			transactionData={item}
			isLast={index === totalTradesQty - 1}
			setTransactionDetails={setTransactionDetails}
		/>
	)

	const listEmptyContainer = () =>
		!tradesLoading && (
			<View style={styles.empty}>
				<List />
				<AppText style={[styles.subText, { marginTop: 17 }]}>
					Instant trade no transactions
				</AppText>
			</View>
		)

	return (
		<>
			{tradesLoading ? (
				<View style={{ marginTop: 10 }}>
					<TransactionSkeleton
						length={[1, 2, 3, 4, 5]}
						isInstantTrade={isInstantTrade}
						isFooter={undefined}
					/>
				</View>
			) : (
				<FlatList
					style={styles.container}
					data={trades}
					renderItem={renderTrade}
					keyExtractor={(item, idx) => `${item.creationTime}${idx.toString()}`}
					onEndReached={handleScrollEnd}
					onEndReachedThreshold={1}
					contentContainerStyle={{ flexGrow: 1 }}
					nestedScrollEnabled
					showsVerticalScrollIndicator={false}
					initialNumToRender={10}
					ListFooterComponent={
						<ListFooter
							isLoading={tradesLoading}
							totalDataQty={totalTradesQty}
							dataArray={trades}
							isInstantTrade={isInstantTrade}
						/>
					}
					ListEmptyComponent={() => <>{listEmptyContainer()}</>}
					maxToRenderPerBatch={30}
					refreshControl={
						<CustomRefreshContol
							refreshing={tradesLoading}
							onRefresh={onRefresh}
						/>
					}
				/>
			)}
			<TransactionModal
				transactions
				isInstantTrade={isInstantTrade}
				transactionDetails={transactionDetails}
				setTransactionDetails={setTransactionDetails}
			/>
		</>
	)
}
export default memo(TradeList)
const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		flex: 1,
	},
	empty: {
		marginTop: '35%',
		alignItems: 'center',
		flex: 1,
	},
	subText: {
		color: colors.SECONDARY_TEXT,
	},
})
