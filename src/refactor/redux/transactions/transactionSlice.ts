// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export interface TransactionState {
	totalTransactionsQty: number | null
	transactions: []
	transactionsLoading: boolean
	selectedTransactionDetails: {}

	// Query Params
	cryptoFilter: null | string
	limit: number
	method: []
	status: string[]
	offset: number
	fromDateTime: number | null
	toDateTime: number | null
	typeFilter: string[]
	txIdOrRecipient: string
}

const initialQueryParams = {
	cryptoFilter: null,
	limit: 10,
	method: [],
	status: [],
	offset: 0,
	fromDateTime: null,
	toDateTime: null,
	typeFilter: [],
	txIdOrRecipient: '',
}

const initialState: TransactionState = {
	totalTransactionsQty: null,
	transactions: [],
	selectedTransactionDetails: {},
	transactionsLoading: false,

	...initialQueryParams,
}

const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransactions: (state, action: PayloadAction<[]>) => {
			state.transactions = action.payload
		},

		setTotalTransactionsQty: (state, action: PayloadAction<number>) => {
			state.totalTransactionsQty = action.payload
		},
		setTransactionsOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload
		},

		setTypeFilter: (state, action: PayloadAction<string[]>) => {
			state.typeFilter = action.payload
		},
		setStatusFilter: (state, action: PayloadAction<string[]>) => {
			state.status = action.payload
		},
		setCryptoFilter: (state, action: PayloadAction<null | string>) => {
			state.cryptoFilter = action.payload
		},
		setMethodFilter: (state, action: PayloadAction<[]>) => {
			state.method = action.payload
		},
		setPreviousTransactionsFilter: (state, action: PayloadAction<{}>) => {
			return {
				...state,
				...action.payload,
			}
		},
		setFromTime: (state, action: PayloadAction<number>) => {
			state.fromDateTime = action.payload
		},
		setToTime: (state, action: PayloadAction<number>) => {
			state.toDateTime = action.payload
		},
		setTransactionsSearch: (state, action: PayloadAction<string>) => {
			state.txIdOrRecipient = action.payload
		},
		clearTransactionFilters: (state) => {
			return { ...state, ...initialQueryParams }
		},
		setSelectedTransactionDetails: (state, action: PayloadAction<{}>) => {
			state.selectedTransactionDetails = action.payload
		},
	},
	// extraReducers: (builder) => {},
})

export const {
	setTransactions,
	setTotalTransactionsQty,
	setTransactionsOffset,
	setStatusFilter,
	setTypeFilter,
	setPreviousTransactionsFilter,
	setMethodFilter,
	setCryptoFilter,
	setFromTime,
	setToTime,
	setTransactionsSearch,
	clearTransactionFilters,
	setSelectedTransactionDetails,
} = transactionSlice.actions
export default transactionSlice.reducer
