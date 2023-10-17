import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTrades } from '@app/refactor/utils/tradeUtils'
import {
	setTrades,
	setTotalTradesQty,
	setTradesOffset,
	selectTradeQueryParams,
} from './tradeSlice'

export const fetchTradesThunk = createAsyncThunk(
	'fetchTrades',
	async (_, { dispatch, getState }) => {
		const state = getState()

		try {
			const tradeQueryParams = selectTradeQueryParams(state)
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
		const state = getState()

		try {
			console.log('refreshTrades')
			const tradeQueryParams = selectTradeQueryParams(state)
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
		const state = getState()

		//Todo: Outsource to selector
		const { offset, trades, totalTradesQty } = getState().trades

		try {
			console.log('reachScrollEnd trades')
			const tradeQueryParams = selectTradeQueryParams(state)

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
