// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

interface TradeState {
	selectedTradeDetails: {}

	// Query Params
	offset: number
	limit: number
	fromDateTimeQuery: number | null
	toDateTimeQuery: number | null
	statusQuery: StatusTrades[]
	actionQuery: Actions[]
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
	selectedTradeDetails: {},

	...initialQueryParams,
}

const tradeSlice = createSlice({
	name: 'trades',
	initialState,
	reducers: {
		setFiatCodesQuery: (state, action: PayloadAction<string[]>) => {
			state.fiatCodesQuery = action.payload
		},
		setStatusQuery: (state, action: PayloadAction<StatusTrades[]>) => {
			state.statusQuery = action.payload
		},
		setTradeActionQuery: (state, action: PayloadAction<Actions[]>) => {
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
		setFromDateQuery: (state, action: PayloadAction<number | null>) => {
			state.fromDateTimeQuery = action.payload
		},
		setToDateQuery: (state, action: PayloadAction<number | null>) => {
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
	setFiatCodesQuery,
	setStatusQuery,
	setTradeActionQuery,
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
