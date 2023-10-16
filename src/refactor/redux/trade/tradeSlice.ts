// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTradesThunk, refreshTradesThunk } from './tradeThunks'

// import { startLogin, usernameAndPaswordThunk } from './authThunks'

interface TradeState {
	trades: []
	offers: { USD: []; GEL: [] }
	pairObject: {}
	currentTrade: { price: ''; size: '' }
	hideOtherPairs: boolean
	fiat: string
	crypto: string
	fiatsArray: []

	tradeType: string
	Balance_Card: string
	balanceLoading: boolean
	balance: {}
	currentBalanceObj: {}
	card: null
	cards: []
	cardsToDisplayInModal: []
	// cardsLoading: boolean
	fee: null
	depositProvider: null
	depositProviders: null
	cryptosArray: []
	cryptosArrayConstant: []

	totalTradesQty: null | number
	tradesLoading: boolean
	isTradesButtonLoading: boolean
	moreTradesLoading: boolean
	offersLoading: boolean

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
	limit: 50,
	fromDateTimeQuery: null,
	toDateTimeQuery: null,
	statusQuery: [],
	actionQuery: [],
	cryptoCodeQuery: null,
	fiatCodesQuery: [],
}

const initialState: TradeState = {
	trades: [],
	offers: { USD: [], GEL: [] },
	pairObject: {},
	currentTrade: { price: '', size: '' },
	hideOtherPairs: false,
	fiat: 'GEL',
	crypto: 'BTC',
	fiatsArray: [],

	tradeType: 'Buy',
	Balance_Card: 'balance',
	balanceLoading: false,
	balance: {},
	currentBalanceObj: {},
	card: null,
	cards: [],
	cardsToDisplayInModal: [],
	fee: null,
	depositProvider: null,
	depositProviders: null,
	cryptosArray: [],
	cryptosArrayConstant: [],
	totalTradesQty: null,
	tradesLoading: false,
	isTradesButtonLoading: false,
	moreTradesLoading: false,
	offersLoading: false,

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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTradesThunk.pending, (state) => {
				state.tradesLoading = true
			})
			.addCase(fetchTradesThunk.fulfilled, (state, action) => {
				state.tradesLoading = false
				// state.trades = action.payload
			})
			.addCase(fetchTradesThunk.rejected, (state) => {
				state.tradesLoading = false
			})
			.addCase(refreshTradesThunk.pending, (state) => {
				state.tradesLoading = true
			})
			.addCase(refreshTradesThunk.fulfilled, (state, action) => {
				state.tradesLoading = false
				// state.trades = action.payload
			})
			.addCase(refreshTradesThunk.rejected, (state) => {
				state.tradesLoading = false
			})
	},
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
} = tradeSlice.actions
export default tradeSlice.reducer
