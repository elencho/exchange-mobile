// } from '@app/refactor/redux/transactions/transactionSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setTradesOffset } from '@app/refactor/redux/trade/tradeSlice'
import { fetchTrades as fetchTradesApi } from '@app/refactor/utils/tradeUtils'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useTrades = () => {
	const [trades, setTrades] = useState<Trade[]>([])
	const [tradesLoading, setTradesLoading] = useState(false)
	const [totalTradesQty, setTotalTradesQty] = useState(0)

	const dispatch = useDispatch()

	const {
		fiatCodesQuery,
		offset,
		statusQuery,
		actionQuery,
		cryptoCodeQuery,
		fromDateTimeQuery,
		toDateTimeQuery,
	} = useSelector((state: RootState) => state.trades)

	const queryParams = {
		offset,
		limit: 10,
		statuses: statusQuery,
		fromTime: fromDateTimeQuery,
		toTime: toDateTimeQuery,
		fiatCodes: fiatCodesQuery,
		cryptoCode:
			cryptoCodeQuery === 'Show all currency' ? null : cryptoCodeQuery,
		actions: actionQuery,
	}

	const fetchTrades = async () => {
		setTradesLoading(true)

		try {
			const tradesData = await fetchTradesApi({
				...queryParams,
				offset: 0,
			})
			const newTrades = tradesData?.data ?? []
			setTrades([...newTrades])
			setTotalTradesQty(tradesData?.paging?.pageCount)

			console.log('fetch Trades')
		} catch (error) {
			console.error('Error fetching trades:', error)
		} finally {
			setTradesLoading(false)
		}
	}

	const refreshTrades = async () => {
		setTradesLoading(true)

		try {
			console.log('refresh Trades')
			dispatch(setTradesOffset(0))
			const tradesData = await fetchTradesApi({ ...queryParams, offset: 0 })
			const newTrades = tradesData?.data
			setTrades([...newTrades])
		} catch (error) {
			console.error('Error refreshing trades:', error)
		} finally {
			setTradesLoading(false)
		}
	}

	const reachScrollEnd = async () => {
		try {
			console.log('reachScrollEnd Trades')

			if (trades.length < totalTradesQty) {
				dispatch(setTradesOffset(offset + 1))
				queryParams.offset = offset + 1
				const tradesData = await fetchTradesApi(queryParams)
				const newTrades = tradesData?.data ?? []

				setTrades((prev) => [...prev, ...newTrades])
			}
		} catch (error) {
			console.error('Error refreshing trades:', error)
		}
	}

	return {
		trades,
		tradesLoading,
		fetchTrades,
		reachScrollEnd,
		refreshTrades,
		totalTradesQty,
		setTrades,
	}
}

export default useTrades
