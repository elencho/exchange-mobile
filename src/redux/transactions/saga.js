import { call, put, select, take, takeLatest } from 'redux-saga/effects'
import {
	fetchTransactions as fetch,
	fetchCurrencies as currenciesApi,
	totalAmount,
} from '../../utils/fetchTransactions'
import {
	setCryptosArray,
	setCryptosArrayConstant,
	setFiatsArray,
	setMoreTradesLoading,
	setTradeOffset,
} from '../trade/actions'
import { fetchTrades } from '../trade/actions'
import {
	actionTypes,
	saveTransactions,
	setTypeFilter,
	fetchTransactions,
	chooseCurrency,
	filterCurrencies,
	setAbbr,
	toggleLoading,
	setTransactionsOffset,
	setMethodFilter,
	setTotalTransactions,
	typeAction,
	saveCurrencies,
	saveCurrenciesConstant,
	setCurrentTransaction,
	setStatusFilter,
	statusAction,
} from '../transactions/actions'
import {
	getParams,
	getTransactions,
	getOffset,
	getMethod,
	totalLoadedTransactions,
	getType,
	getStatus,
} from './selectors'

function* fetchTransactionsSaga({ isMoreLoading }) {
	if (isMoreLoading) {
		yield put(setMoreTradesLoading(true))
	} else {
		yield put(toggleLoading(true))
	}
	const params = yield select(getParams)
	const transactions = yield select(getTransactions)

	const newTransactions = yield call(fetch, params)
	const total = yield call(totalAmount, params)

	const totalTransactions = yield select(
		(state) => state.transactionsOld.totalTransactions
	)

	if (!totalTransactions) {
		yield put(setTotalTransactions(total))
	}
	if (newTransactions) {
		yield put(saveTransactions([...transactions, ...newTransactions]))
	}
	yield put(setMoreTradesLoading(false))
	yield put(toggleLoading(false))
}

function* refreshTransactionsSaga() {
	yield put(toggleLoading(true))

	const params = yield select(getParams)

	const total = yield call(totalAmount, params)

	yield put(setTotalTransactions(total))

	yield put(setTransactionsOffset(0))
	const transactions = yield call(fetch, params)

	if (transactions) {
		yield put(saveTransactions(transactions))
	}

	yield put(toggleLoading(false))
}

function* fetchCurrenciesSaga() {
	const currencies = yield call(currenciesApi)

	if (currencies) {
		const curArr = [{ name: 'Show All Currency', code: '' }, ...currencies]
		yield put(saveCurrencies(curArr))
		yield put(saveCurrenciesConstant(curArr))

		yield put({ type: 'CLASIFY_CURRENCIES' })
	}
}

function* reachScrollEndSaga(action) {
	const { transactionType } = action

	if (transactionType === 'transactions') {
		const params = yield select(getParams)
		const offset = yield select(getOffset)
		const loadedTransactions = yield select(totalLoadedTransactions)
		const total = yield call(totalAmount, params)
		yield put(setTotalTransactions(total))

		const totalTransactions = yield select(
			(state) => state.transactionsOld.totalTransactions
		)

		if (loadedTransactions < totalTransactions) {
			yield put(setTransactionsOffset(offset + 1))
			yield put(fetchTransactions(true))
		}
	}

	if (transactionType === 'trades') {
		const offset = yield select((state) => state.trade.offset)
		const limit = yield select((state) => state.trade.limit)

		yield put(setTradeOffset(offset + 1))
		yield put(fetchTrades(true))
	}
} // ???
function* showResultsSaga() {
	yield put(saveTransactions([]))
	yield put(setTransactionsOffset(0))
	yield put({ type: 'REFRESH_TRANSACTIONS_ACTION' })
}

//Currencies Saga
function* currencySaga(action) {
	const { name, currencyList, code } = action
	yield put(chooseCurrency(name))
	yield put(filterCurrencies(currencyList))
	yield put(setAbbr(code))
}

function* transactionDetailsSaga(action) {
	const { currentTransaction } = action
	yield put(setCurrentTransaction(currentTransaction))
}

function* clasifyCurrenciesSaga() {
	const transactions = yield select((state) => state.transactionsOld)
	const trade = yield select((state) => state.trade)
	const { offers, fiat } = trade
	const { currencies, tabRoute } = transactions

	let fiatsArray = []
	let cryptosArray = []

	currencies.forEach((c) => {
		if (c.type === 'FIAT') fiatsArray.push(c)
		if (c.type === 'CRYPTO' && tabRoute !== 'Trade') cryptosArray.push(c)
		if (c.type === 'CRYPTO' && tabRoute === 'Trade') {
			offers &&
				offers[fiat].forEach((o) => {
					if (o.pair.baseCurrency === c.code) cryptosArray.push(c)
				})
		}
	})

	yield put(setFiatsArray(fiatsArray))
	yield put(setCryptosArray(cryptosArray))
	yield put(setCryptosArrayConstant(cryptosArray))
}

export default function* () {
	yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga)
	yield takeLatest(actionTypes.SET_TX_ID_OR_RECIPIENT, fetchTransactionsSaga)
	yield takeLatest(actionTypes.FETCH_CURRENCIES, fetchCurrenciesSaga)
	yield takeLatest(actionTypes.CURRENCY_SAGA_ACTION, currencySaga)
	yield takeLatest(actionTypes.SHOW_RESULTS, showResultsSaga)
	yield takeLatest(actionTypes.REACH_SCROLL_END, reachScrollEndSaga)
	yield takeLatest('CLASIFY_CURRENCIES', clasifyCurrenciesSaga)
	yield takeLatest('REFRESH_TRANSACTIONS_ACTION', refreshTransactionsSaga)
	yield takeLatest(actionTypes.TRANSACTION_DETAILS_SAGA, transactionDetailsSaga)
}
