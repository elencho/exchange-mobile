import React, { memo, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import List from '@assets/images/List.svg'
import AppText from '@app/components/AppText'
import CustomRefreshContol from '@app/components/CustomRefreshContol'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'
import colors from '@app/constants/colors'
import Transaction from '@app/refactor/screens/transactions/components/ListComponents/Transaction'
import ListFooter from './ListFooter'
import { useTrades } from '@app/refactor/screens/transactions/hooks'
import { useFocusEffect } from '@react-navigation/native'
import { RootState } from '@app/refactor/redux/rootReducer'

interface Props {
	isInstantTrade: boolean
}

const TradeList: React.FC<Props> = ({ isInstantTrade }) => {
	const {
		fetchTrades,
		refreshTrades,
		trades,
		tradesLoading,
		totalTradesQty,
		reachScrollEnd,
	} = useTrades()

	const {
		modalState: { transactionFiltersModalVisible },
		trades: {
			fiatCodesQuery,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
		},
	} = useSelector((state: RootState) => state)

	useFocusEffect(
		useCallback(() => {
			!transactionFiltersModalVisible && fetchTrades()
		}, [
			fiatCodesQuery,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
			transactionFiltersModalVisible,
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

	const renderTrade = ({ item, index }) => (
		<Transaction transactionData={item} isLast={index === totalTradesQty - 1} />
	)

	const listEmptyContainer = () =>
		!tradesLoading && (
			<View style={styles.empty}>
				<List />
				<AppText subtext style={[styles.subText, { marginTop: 17 }]}>
					Instant trade no transactions
				</AppText>
			</View>
		)

	return tradesLoading ? (
		<View style={{ marginTop: 10 }}>
			<TransactionSkeleton
				length={[1, 2, 3, 4, 5]}
				isInstantTrade={isInstantTrade}
			/>
		</View>
	) : (
		<FlatList
			style={styles.container}
			data={trades}
			renderItem={renderTrade}
			keyExtractor={(item, idx) => item.creationTime + idx}
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
			ListEmptyComponent={listEmptyContainer}
			maxToRenderPerBatch={30}
			refreshControl={
				<CustomRefreshContol refreshing={tradesLoading} onRefresh={onRefresh} />
			}
		/>
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
