import React, { useEffect, memo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import List from '@assets/images/List.svg'
import AppText from '@app/components/AppText'
import CustomRefreshContol from '@app/components/CustomRefreshContol'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'
import colors from '@app/constants/colors'
import { IS_IOS } from '@app/constants/system'
import {
	fetchTradesThunk,
	reachScrollEndThunk,
	refreshTradesThunk,
} from '@app/refactor/redux/trade/tradeThunks'
import Transaction from '@app/refactor/screens/transactions/components/Transaction'
import ListFooter from './ListFooter'

const TradeList = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTradesThunk())
	}, [])

	const {
		trades: {
			trades: tradesData,
			totalTradesQty,
			moreTradesLoading,
			tradesLoading,
		},
		transactions: { activeTab },
	} = useSelector((state) => state)

	const handleScrollEnd = () => {
		if (tradesData.length === totalTradesQty) {
			return
		} else if (tradesData.length <= totalTradesQty && !moreTradesLoading) {
			dispatch(reachScrollEndThunk())
		}
	}

	const onRefresh = () => dispatch(refreshTradesThunk())

	const renderTrade = ({ item, index }) => (
		<Transaction
			transactionData={item}
			isLast={index === tradesData.length - 1}
		/>
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

	return (
		<View style={styles.container}>
			{tradesLoading && !moreTradesLoading ? (
				<View style={{ marginTop: IS_IOS ? -10 : 20 }}>
					<TransactionSkeleton
						length={[1, 2, 3, 4, 5]}
						isInstantTrade={activeTab === 'Instant trade'}
					/>
				</View>
			) : (
				<FlatList
					style={{ height: 280 }}
					data={tradesData}
					renderItem={renderTrade}
					keyExtractor={(item, idx) => item.creationTime + idx}
					onEndReached={handleScrollEnd}
					onEndReachedThreshold={1}
					contentContainerStyle={{ flexGrow: 1 }}
					nestedScrollEnabled
					showsVerticalScrollIndicator={false}
					initialNumToRender={5}
					ListFooterComponent={
						<ListFooter
							isLoading={tradesLoading}
							totalDataQty={totalTradesQty}
							dataArray={tradesData}
						/>
					}
					ListEmptyComponent={listEmptyContainer}
					maxToRenderPerBatch={30}
					refreshControl={
						<CustomRefreshContol
							refreshing={tradesLoading}
							onRefresh={onRefresh}
						/>
					}
				/>
			)}
		</View>
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
	header: {
		color: colors.PRIMARY_TEXT,
	},
	right: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	subText: {
		color: colors.SECONDARY_TEXT,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
})
