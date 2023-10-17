import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTransactions } from '@app/refactor/utils/transactionUtils'
import {
	selectTransactionQueryParams,
	setTotalTransactionsQty,
	setTransactions,
	setTransactionsOffset,
} from './transactionSlice'

export const fetchTransactionsThunk = createAsyncThunk(
	'fetchTransactions',
	async (_, { dispatch, getState }) => {
		const state = getState()

		try {
			const queryParams = selectTransactionQueryParams(state)
			dispatch(setTransactionsOffset(0))
			const transactionsData = await fetchTransactions(queryParams)
			const newTransactions = transactionsData?.data
			dispatch(setTransactions([...newTransactions]))
			dispatch(setTotalTransactionsQty(transactionsData.paging.pageCount))

			console.log('fetchTransactionsThunk')
		} catch (error) {
			console.error('Error fetching transactions:', error)
		}
	}
)

export const refreshTransactionsThunk = createAsyncThunk(
	'refreshTransactions',
	async (_, { dispatch, getState }) => {
		const state = getState()

		try {
			console.log('refreshTransactions')
			const queryParams = selectTransactionQueryParams(state)
			const transactionsData = await fetchTransactions(queryParams)
			const newTransactions = transactionsData?.data
			dispatch(setTransactionsOffset(0))
			dispatch(setTransactions([...newTransactions]))
		} catch (error) {
			console.error('Error refreshing transactions:', error)
		}
	}
)

export const reachScrollEndThunk = createAsyncThunk(
	'reachScrollEndThunk',
	async (_, { dispatch, getState }) => {
		const state = getState()
		const { offset, transactions, totalTransactionsQty } = state.transactions

		try {
			const queryParams = selectTransactionQueryParams(state)
			console.log('reachScrollEnd')

			if (transactions.length < totalTransactionsQty) {
				dispatch(setTransactionsOffset(offset + 1))
				queryParams.offset = offset + 1
				const transactionsData = await fetchTransactions(queryParams)
				const newTransactions = transactionsData?.data
				dispatch(setTransactions([...transactions, ...newTransactions]))
			}
		} catch (error) {
			console.error('Error refreshing transactions:', error)
		}
	}
)
