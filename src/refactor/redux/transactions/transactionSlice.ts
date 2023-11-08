// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TransactionState {
	selectedTransactionDetails: {
		currency?: string
		provider?: string
		method?: Methods[]
		transactionInfo?: string
		baseCurrency?: string
		quoteCurrency?: string
		action?: string
		recipient?: string
		tag?: string
	}

	// Query Params
	cryptoFilter: null | string
	limit: number
	method: Methods[]
	status: Status[]
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
	selectedTransactionDetails: {},

	...initialQueryParams,
}

const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransactionsOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload
		},

		setTypeFilter: (state, action: PayloadAction<string[]>) => {
			state.typeFilter = action.payload
		},
		setStatusFilter: (state, action: PayloadAction<Status[]>) => {
			state.status = action.payload
		},
		setCryptoFilter: (state, action: PayloadAction<null | string>) => {
			state.cryptoFilter = action.payload
		},
		setMethodFilter: (state, action: PayloadAction<Methods[]>) => {
			state.method = action.payload
		},
		setPreviousTransactionsFilter: (state, action: PayloadAction<{}>) => {
			return {
				...state,
				...action.payload,
			}
		},
		setFromTime: (state, action: PayloadAction<number | null>) => {
			state.fromDateTime = action.payload
		},
		setToTime: (state, action: PayloadAction<number | null>) => {
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
