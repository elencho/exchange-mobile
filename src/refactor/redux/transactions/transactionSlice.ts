// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	fetchTransactionsThunk,
	refreshTransactionsThunk,
} from './transactionThunks'

// import { startLogin, usernameAndPaswordThunk } from './authThunks'

interface TransactionState {
	tabRoute: null
	stackRoute: null
	tabNavigationRef: {}
	totalTransactionsQty: number | null
	transactions: []
	currencies: []
	currenciesConstant: []
	currentTransaction: {}
	currency: string
	activeTab: 'Transfer' | 'Convert'
	code: null
	selectedTransactionDetails: {}

	transactionsLoading: boolean
	moreTransactionsLoading: boolean

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
	limit: 25,
	method: [],
	status: [],
	offset: 0,
	fromDateTime: null,
	toDateTime: null,
	typeFilter: [],
	txIdOrRecipient: '',
}

const initialState: TransactionState = {
	tabRoute: null,
	stackRoute: null,
	tabNavigationRef: {},
	totalTransactionsQty: null,
	transactions: [],
	currencies: [],
	currenciesConstant: [],
	currentTransaction: {},
	currency: 'Show All Currency',
	activeTab: 'Transfer',
	code: null,
	selectedTransactionDetails: {},

	transactionsLoading: false,
	moreTransactionsLoading: false,

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
		setActiveTab: (state, action: PayloadAction<'Transfer' | 'Convert'>) => {
			state.activeTab = action.payload
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
	extraReducers: (builder) => {
		builder
			.addCase(fetchTransactionsThunk.pending, (state) => {
				state.transactionsLoading = true
			})
			.addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
				state.transactionsLoading = false
				// state.transactions = action.payload
			})
			.addCase(fetchTransactionsThunk.rejected, (state) => {
				state.transactionsLoading = false
			})
			.addCase(refreshTransactionsThunk.pending, (state) => {
				state.transactionsLoading = true
			})
			.addCase(refreshTransactionsThunk.fulfilled, (state, action) => {
				state.transactionsLoading = false
				// state.transactions = action.payload
			})
			.addCase(refreshTransactionsThunk.rejected, (state) => {
				state.transactionsLoading = false
			})
	},
})

export const {
	setTransactions,
	setTotalTransactionsQty,
	setActiveTab,
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

//Selectors
const methodsMapping = {
	Ecommerce: ['ECOMMERCE'],
	Wire: ['WIRE'],
	'Crypto Transaction': ['WALLET', 'WALLET_INTERNAL'],
	Staking: ['STAKING'],
	B2C: ['B2C'],
	Transfer: ['TRANSFER'],
}

export const selectTransactionQueryParams = (state) => {
	const {
		typeFilter,
		method,
		status,
		cryptoFilter,
		fromDateTime,
		toDateTime,
		offset,
		txIdOrRecipient,
	} = state?.transactions

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

	return queryParams
}
