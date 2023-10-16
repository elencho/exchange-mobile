import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTrades } from '@app/refactor/utils/tradeUtils'
import { setTrades, setTotalTradesQty, setTradesOffset } from './tradeSlice'

export const fetchTradesThunk = createAsyncThunk(
	'fetchTrades',
	async (_, { dispatch, getState }) => {
		const {
			fiatCodesQuery,
			offset,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
		} = getState().trades

		const tradeQueryParams = {
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

		try {
			dispatch(setTradesOffset(0))
			const tradesData = await fetchTrades(tradeQueryParams)
			const newTrades = tradesData?.data
			dispatch(setTrades([...newTrades]))
			dispatch(setTotalTradesQty(tradesData.paging.pageCount))

			console.log('fetchTradesThunk')
		} catch (error) {
			// Handle error as needed
			console.error('Error fetching trades:', error)
		}
	}
)

export const refreshTradesThunk = createAsyncThunk(
	'refreshTrades',
	async (_, { dispatch, getState }) => {
		const {
			fiatCodesQuery,
			offset,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
			trades,
		} = getState().trades

		const tradeQueryParams = {
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

		try {
			console.log('refreshTrades')
			const tradesData = await fetchTrades(tradeQueryParams)
			const newTrades = tradesData?.data
			dispatch(setTradesOffset(0))
			dispatch(setTrades([...newTrades]))
		} catch (error) {
			console.error('Error refreshing Trades:', error)
		}
	}
)

export const reachScrollEndThunk = createAsyncThunk(
	'reachScrollEndThunk',
	async (_, { dispatch, getState }) => {
		//Todo: Outsource to selector
		const {
			fiatCodesQuery,
			offset,
			statusQuery,
			actionQuery,
			cryptoCodeQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
			trades,
			totalTradesQty,
		} = getState().trades

		const tradeQueryParams = {
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

		try {
			console.log('reachScrollEnd trades')

			if (trades.length < totalTradesQty) {
				dispatch(setTradesOffset(offset + 1))
				tradeQueryParams.offset = offset + 1

				const tradesData = await fetchTrades(tradeQueryParams)
				const newTrades = tradesData?.data

				dispatch(setTrades([...trades, ...newTrades]))
			}

			//ToDo:  if (transactionType === 'trades')
		} catch (error) {
			console.error('Error refreshing transactions:', error)
		}
	}
)
