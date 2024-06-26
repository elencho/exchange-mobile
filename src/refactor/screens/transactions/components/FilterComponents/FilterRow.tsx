import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Failed from '@assets/images/Status_Failed.svg'
import Pending from '@assets/images/Status_Pending.svg'
import Success from '@assets/images/Status_Success.svg'
import AppText from '@components/text'
import colors from '@app/constants/colors'
import {
	setFiatCodesQuery,
	setStatusQuery,
	setTradeActionQuery,
} from '@app/refactor/redux/trade/tradeSlice'
import {
	setStatusFilter,
	setTypeFilter,
} from '@app/refactor/redux/transactions/transactionSlice'
import { RootState } from '@app/refactor/redux/rootReducer'

const statusIcons = {
	SUCCESS: <Success />,
	PENDING: <Pending />,
	FAILED: <Failed />,
}
const statusMapping = {
	PENDING: ['PENDING', 'WAITING_DEPOSIT'],
	FAILED: ['FAILED', 'EXPIRED'],
	SUCCESS: ['COMPLETED'],
}

const currencyMapping = {
	TOGEL: 'GEL',
	TOUSD: 'USD',
	TOEUR: 'EUR',
}

const tradeActionMapping = {
	BUY: 'BID',
	SELL: 'ASK',
}

type Statuses = 'PENDING' | 'FAILED' | 'SUCCESS'

interface Props {
	array: string[]
	filterType: string
}

export default function FilterRow({ array = [''], filterType }: Props) {
	const dispatch = useDispatch()
	const transactionsState = useSelector(
		(state: RootState) => state.transactions
	)
	const tradesState = useSelector((state: RootState) => state.trades)

	const { typeFilter, method, status: transactionStatus } = transactionsState
	const { statusQuery, actionQuery, fiatCodesQuery } = tradesState

	const handleFilter = (fil: string) => {
		if (filterType === 'currency') {
			if (fiatCodesQuery.includes(currencyMapping[fil])) {
				dispatch(
					setFiatCodesQuery(
						[...fiatCodesQuery].filter((item) => item !== currencyMapping[fil])
					)
				)
			} else {
				dispatch(setFiatCodesQuery([...fiatCodesQuery, currencyMapping[fil]]))
			}
		} else if (filterType === 'statusTrade') {
			if (statusQuery?.includes(statusMapping[fil][0])) {
				dispatch(
					setStatusQuery(
						[...statusQuery].filter(
							(item) => !statusMapping[fil].includes(item)
						)
					)
				)
			} else dispatch(setStatusQuery([...statusQuery, ...statusMapping[fil]]))
		} else if (filterType === 'statusTransaction') {
			if (transactionStatus?.includes(fil)) {
				dispatch(
					setStatusFilter(
						[...transactionStatus].filter((item) => !fil.includes(item))
					)
				)
			} else dispatch(setStatusFilter([...transactionStatus, fil]))
		} else if (filterType === 'type') {
			if (typeFilter?.includes(fil)) {
				dispatch(setTypeFilter([...typeFilter].filter((item) => item !== fil)))
			} else {
				dispatch(setTypeFilter([...typeFilter, fil]))
			}
		} else if (filterType === 'tradeAction') {
			if (actionQuery?.includes(tradeActionMapping[fil])) {
				dispatch(
					setTradeActionQuery(
						[...actionQuery].filter((item) => item !== tradeActionMapping[fil])
					)
				)
			} else {
				dispatch(setTradeActionQuery([...actionQuery, tradeActionMapping[fil]]))
			}
		}
	}
	const filterConditional = (fil) => {
		if (filterType === 'type') return typeFilter.includes(fil)
		if (filterType === 'method') return fil === method
		if (filterType === 'statusTrade')
			return statusQuery?.includes(statusMapping[fil][0])
		if (filterType === 'currency')
			return fiatCodesQuery.includes(currencyMapping[fil])
		if (filterType === 'tradeAction')
			return actionQuery?.includes(tradeActionMapping[fil])
		if (filterType === 'statusTransaction')
			return transactionStatus?.includes(fil)
	}

	const RenderItem = ({ item }) => {
		return (
			<Pressable
				style={[
					styles.filterButton,
					filterConditional(item) && {
						backgroundColor: 'rgba(74, 109, 255, 0.18)',
					},
				]}
				onPress={() => handleFilter(item)}>
				{(filterType === 'statusTrade' ||
					filterType === 'statusTransaction') && (
					<View style={{ marginRight: 6 }}>
						{statusIcons[item as Statuses]}
					</View>
				)}
				<AppText
					style={[
						styles.text,
						filterConditional(item) && { color: colors.SECONDARY_PURPLE },
					]}
					medium={filterConditional(item)}>
					{item}
				</AppText>
			</Pressable>
		)
	}

	return (
		<View style={styles.container}>
			{array.map((item, idx) => (
				<RenderItem item={item} key={`filterItem${idx}`} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: 12,
	},
	filterButton: {
		height: 34,
		minWidth: 78,
		paddingHorizontal: 20,
		borderRadius: 40,
		backgroundColor: 'rgba(31, 31, 53, 0.9)',
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},

	text: {
		color: '#c0c5e0',
		fontSize: 14,
	},
})
