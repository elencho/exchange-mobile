import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTransactions } from '@app/refactor/utils/transactionUtils'
import {
	setTotalTransactionsQty,
	setTransactions,
	setTransactionsOffset,
} from './transactionSlice'

const methodsMapping = {
	Ecommerce: ['ECOMMERCE'],
	Wire: ['WIRE'],
	'Crypto Transaction': ['WALLET', 'WALLET_INTERNAL'],
	Staking: ['STAKING'],
	B2C: ['B2C'],
	Transfer: ['TRANSFER'],
}

export const fetchTransactionsThunk = createAsyncThunk(
	'fetchTransactions',
	async (_, { dispatch, getState }) => {
		//Todo: Outsource to selector
		const {
			typeFilter,
			method,
			status,
			cryptoFilter,
			fromDateTime,
			toDateTime,
			offset,
			limit,
			txIdOrRecipient,
			transactions,
		} = getState().transactions

		const queryParams: FetchTransactionsQuery = {
			type: typeFilter?.length === 1 ? typeFilter[0] : null,
			methods: methodsMapping[method],
			statuses: status,
			currency: cryptoFilter?.length > 0 ? cryptoFilter : null,
			fromTime: fromDateTime,
			toTime: toDateTime,
			offset: 0,
			limit: 10,
			txIdOrRecipient: txIdOrRecipient?.length > 0 ? txIdOrRecipient : null,
		}

		try {
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
		const {
			typeFilter,
			method,
			status,
			cryptoFilter,
			fromDateTime,
			toDateTime,
			offset,
			limit,
			txIdOrRecipient,
			transactions,
			totalTransactionsQty,
		} = getState().transactions

		const queryParams: FetchTransactionsQuery = {
			type: typeFilter?.length === 1 ? typeFilter[0] : null,
			methods: methodsMapping[method],
			statuses: status,
			currency: cryptoFilter?.length > 0 ? cryptoFilter : null,
			fromTime: fromDateTime,
			toTime: toDateTime,
			offset: 0,
			limit: 10,
			txIdOrRecipient: txIdOrRecipient?.length > 0 ? txIdOrRecipient : null,
		}

		try {
			console.log('refreshTransactions')
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
		//Todo: Outsource to selector
		const {
			typeFilter,
			method,
			status,
			cryptoFilter,
			fromDateTime,
			toDateTime,
			offset,
			limit,
			txIdOrRecipient,
			transactions,
			totalTransactionsQty,
		} = getState().transactions

		const queryParams: FetchTransactionsQuery = {
			type: typeFilter?.length === 1 ? typeFilter[0] : null,
			methods: methodsMapping[method],
			statuses: status,
			currency: cryptoFilter?.length > 0 ? cryptoFilter : null,
			fromTime: fromDateTime,
			toTime: toDateTime,
			offset,
			limit: 10,
			txIdOrRecipient: txIdOrRecipient?.length > 0 ? txIdOrRecipient : null,
		}

		try {
			console.log('reachScrollEnd')

			if (transactions.length < totalTransactionsQty) {
				dispatch(setTransactionsOffset(offset + 1))
				queryParams.offset = offset + 1
				console.log('queryParams.offset', queryParams.offset)

				const transactionsData = await fetchTransactions(queryParams)
				const newTransactions = transactionsData?.data

				dispatch(setTransactions([...transactions, ...newTransactions]))
			}

			//ToDo:  if (transactionType === 'trades')
		} catch (error) {
			console.error('Error refreshing transactions:', error)
		}
	}
)
