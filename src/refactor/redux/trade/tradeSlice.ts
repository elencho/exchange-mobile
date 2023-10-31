// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

interface TradeState {
	trades: []
	totalTradesQty: null | number
	tradesLoading: boolean
	selectedTradeDetails: {}

	// Query Params
	offset: number
	limit: number
	fromDateTimeQuery: number | null
	toDateTimeQuery: number | null
	statusQuery: string[]
	actionQuery: string[]
	cryptoCodeQuery: null | string
	fiatCodesQuery: string[]
}

const initialQueryParams = {
	offset: 0,
	limit: 10,
	fromDateTimeQuery: null,
	toDateTimeQuery: null,
	statusQuery: [],
	actionQuery: [],
	cryptoCodeQuery: null,
	fiatCodesQuery: [],
}

const initialState: TradeState = {
	trades: [],
	totalTradesQty: null,
	tradesLoading: false,
	selectedTradeDetails: {},

	...initialQueryParams,
}

const tradeSlice = createSlice({
	name: 'trades',
	initialState,
	reducers: {
		setTrades: (state, action: PayloadAction<[]>) => {
			state.trades = action.payload
		},
		setTotalTradesQty: (state, action: PayloadAction<number>) => {
			state.totalTradesQty = action.payload
		},
		setFiatCodesQuery: (state, action: PayloadAction<string[]>) => {
			state.fiatCodesQuery = action.payload
		},
		setStatusQuery: (state, action: PayloadAction<string[]>) => {
			state.statusQuery = action.payload
		},
		setTradeActionQuery: (state, action: PayloadAction<string[]>) => {
			state.actionQuery = action.payload
		},
		setTradesOffset: (state, action: PayloadAction<number>) => {
			state.offset = action.payload
		},
		setPreviousTradeFilter: (state, action: PayloadAction<{}>) => {
			return {
				...state,
				...action.payload,
			}
		},

		setCryptoCodeQuery: (state, action: PayloadAction<null | string>) => {
			state.cryptoCodeQuery = action.payload
		},
		setFromDateQuery: (state, action: PayloadAction<number>) => {
			state.fromDateTimeQuery = action.payload
		},
		setToDateQuery: (state, action: PayloadAction<number>) => {
			state.toDateTimeQuery = action.payload
		},
		clearTradeFilters: (state) => {
			return { ...state, ...initialQueryParams }
		},

		setSelectedTradeDetails: (state, action: PayloadAction<{}>) => {
			state.selectedTradeDetails = action.payload
		},
	},
	// extraReducers: (builder) => {},
})

export const {
	setTrades,
	setFiatCodesQuery,
	setStatusQuery,
	setTradeActionQuery,
	setTotalTradesQty,
	setTradesOffset,
	setPreviousTradeFilter,
	setCryptoCodeQuery,
	setFromDateQuery,
	setToDateQuery,
	clearTradeFilters,
	setSelectedTradeDetails,
} = tradeSlice.actions
export default tradeSlice.reducer

//Selectors
export const selectTradeQueryParams = (state: RootState) => {
	const {
		fiatCodesQuery,
		offset,
		statusQuery,
		actionQuery,
		cryptoCodeQuery,
		fromDateTimeQuery,
		toDateTimeQuery,
	} = state?.trades

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

	return tradeQueryParams
}
