import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import {
	fetchTrades,
	fetchOffers,
	submitTrade,
	fetchBalance,
	fetchCards,
	fetchFees,
} from '../../utils/fetchTrades'
import { toggleBuySellModal } from '../modals/actions'
import { fetchUserInfo } from '../profile/actions'
import {
	cryptoAddressesAction,
	getWhitelistAction,
	setWalletTab,
	wireDepositAction,
	withdrawalTemplatesAction,
} from '../wallet/actions'
import {
	actionTypes,
	saveOffers,
	saveTrades,
	instantTradeTabAction,
	setOffersLoading,
	setPairObject,
	setTradesLoading,
	fetchTrades as fetchTradesAction,
	setBalance,
	saveCards,
	setDepositProvider,
	setDepositProviders,
	setFee,
	pairObjectSagaAction,
	depositProvidersSagaAction,
	cardsSagaAction,
	setCurrentBalanceObj,
	setCrypto,
	switchBalanceCard,
	setTotalTrades,
	setTradeOffset,
	setMoreTradesLoading,
	fetchFee,
	setTradesButtonLoading,
} from './actions'
import {
	getParams,
	getTrades,
	paramsForTrade,
	getCardParams,
	depositFeeParams,
	withdrawalFeeParams,
} from './selectors'

// function* fetchTradesSaga({ isMoreLoading }) {
// 	if (isMoreLoading) {
// 		yield put(setMoreTradesLoading(true))
// 	} else {
// 		yield put(setTradesLoading(true))
// 	}
// 	const params = yield select(getParams)
// 	const trades = yield select((state) => state.trade.trades)

// 	const newTrades = yield call(fetchTrades, params)
// 	const newestTrades = newTrades?.data
// 	if (newestTrades?.length > 0) {
// 		yield put(setTotalTrades(newTrades?.paging.pageCount))
// 		yield put(saveTrades([...trades, ...newestTrades]))
// 	}
// 	yield put(setMoreTradesLoading(false))
// 	yield put(setTradesLoading(false))
// }

function* pairObjectSaga(action) {
	const { offers } = action
	let object
	const fiat = yield select((state) => state.trade.fiat)
	const crypto = yield select((state) => state.trade.crypto)

	if (offers) {
		yield call(() =>
			offers[fiat]?.forEach((o) => {
				if (o.pair?.baseCurrency === crypto) object = o
			})
		)
		if (!object && offers[fiat]) {
			object = offers[fiat][0]
			yield put(setCrypto(object.pair.baseCurrency))
		}
		yield put(setPairObject(object))
	}
}

function* depositProvidersSaga(action) {
	const { balances } = action

	let providers // Banks that have ecommerce
	const fiat = yield select((state) => state.trade.fiat)

	const setProviders = () =>
		balances?.forEach((b) => {
			if (b?.depositMethods?.ECOMMERCE && fiat === b?.currencyCode) {
				providers = b?.depositMethods?.ECOMMERCE
			}
		})

	if (balances) yield call(setProviders)
	yield put(setDepositProviders(providers))
}

function* cardsSaga() {
	yield put({ type: 'TOGGLE_CARDS_LOADING', cardsLoading: true })

	const cardParams = yield select(getCardParams)
	const cards = yield call(fetchCards, cardParams)
	yield put(saveCards(cards))

	yield put({ type: 'TOGGLE_CARDS_LOADING', cardsLoading: false })
}

function* instantTradeTabSaga() {
	yield put(setOffersLoading(true))
	yield put({ type: 'BALANCE_SAGA' })

	const offers = yield call(fetchOffers)
	yield put(saveOffers(offers))
	yield put(setTradeOffset(0))
	yield put(pairObjectSagaAction(offers))

	yield put(cardsSagaAction())

	yield put({ type: 'CLASIFY_CURRENCIES' })

	yield put(setOffersLoading(false))
}

function* balanceSaga() {
	yield put({ type: 'TOGGLE_BALANCE_LOADING', balanceLoading: true })

	const balance = yield call(fetchBalance)
	if (balance) {
		yield put(setBalance(balance))
		yield put(depositProvidersSagaAction(balance?.balances))

		const code = yield select((state) => state.transactions.code)
		if (code) {
			let obj
			balance?.balances?.forEach((b) => {
				if (code === b.currencyCode) obj = b
			})
			yield put(setCurrentBalanceObj(obj))
		}
	}
	yield put({ type: 'TOGGLE_BALANCE_LOADING', balanceLoading: false })
}

function* submitTradeSaga() {
	const params = yield select(paramsForTrade)
	const card = yield select((state) => state.trade.card)
	yield put(setTradesButtonLoading(true))

	const data = yield call(submitTrade, params)
	if (data?.status >= 200 && data?.status < 300) {
		if (card) {
			yield put({ type: 'SET_APP_WEBVIEW_OBJ', webViewObj: data?.data })
		} else {
			yield put({ type: 'BALANCE_SAGA' })
			yield put(saveTrades([]))
			yield put(setTradeOffset(0))
			yield put(fetchTradesAction(false))
			yield put(toggleBuySellModal(false))
		}
	}
	yield put(setTradesButtonLoading(false))
}

function* fetchFeeSaga(action) {
	const { feeType } = action
	const params = yield select(
		feeType === 'withdrawal' ? withdrawalFeeParams : depositFeeParams
	)
	const fee = yield call(fetchFees, params)
	yield put(setFee(fee))
}

function* addNewCardSaga(action) {
	const { navigation, balances, name, code } = action
	let obj

	balances.forEach((b) => {
		if (b.currencyCode === code) obj = b
	})

	const tab = yield select((state) => state.transactions.tabNavigationRef)
	const tabRoute = yield select((state) => state.transactions.tabRoute)
	if (tabRoute !== 'Wallet') yield call(() => tab.navigate('Wallet'))

	yield put(setCurrentBalanceObj(obj))
	yield put(setWalletTab('Manage Cards'))
	yield put(cardsSagaAction())
	yield put(toggleBuySellModal(false))
	yield delay(500)
	yield put({ type: 'GO_TO_BALANCE', name, code, navigation })
	yield put(switchBalanceCard('balance'))
}

function* refreshWalletAndTradesSaga() {
	const state = yield select((state) => state)
	const {
		wallet: { walletTab, network, depositRestriction, withdrawalRestriction },
		trade: { currentBalanceObj },
		profile: { userInfo },
		modals: { addWhitelistModalVisble, whitelistActionsModalVisible },
		transactions: { stackRoute, tabRoute, currency, code },
	} = state

	const wallet = tabRoute === 'Wallet'
	const trade = tabRoute === 'Trade'
	const main = stackRoute === 'Main'
	const balance = stackRoute === 'Balance'
	const deposit = walletTab === 'Deposit'
	const withdrawal = walletTab === 'Withdrawal'
	const manageCards = walletTab === 'Manage Cards'
	const whitelist = walletTab === 'Whitelist'
	const ecommerce = network === 'ECOMMERCE'
	const crypto = currentBalanceObj?.type === 'CRYPTO'
	const fiat = currentBalanceObj?.type === 'FIAT'

	const m = withdrawal ? 'withdrawalMethods' : 'depositMethods'
	const restriction = withdrawal ? withdrawalRestriction : depositRestriction
	const isAvailable = (obj) =>
		Object.keys(obj[m])?.length && !Object.keys(restriction)?.length

	if (main && trade) {
		yield put(setTradeOffset(0))
		yield put(saveTrades([]))
		yield put(instantTradeTabAction())
		yield put(fetchTradesAction())
	}

	if (balance) {
		yield put(setFee(null))

		if (deposit && fiat && !ecommerce) {
			yield put(wireDepositAction(currency, code))
		}
		if (withdrawal && fiat && !ecommerce) {
			yield put({ type: 'CLEAR_WITHDRAWAL_INPUTS' })
		}

		if (wallet && !whitelist && isAvailable(currentBalanceObj)) {
			// wire deposit saga is exclusion
			if (ecommerce) yield put(cardsSagaAction())
			if (withdrawal && fiat) yield put(withdrawalTemplatesAction())
		}

		if (crypto && isAvailable(currentBalanceObj)) {
			if (
				withdrawal ||
				(whitelist && !addWhitelistModalVisble && !whitelistActionsModalVisible)
			)
				yield put(getWhitelistAction())
			// if (withdrawal) {
			//   yield put(fetchFee('withdrawal'));
			// }
		}
	}

	if (main && wallet) yield put({ type: 'BALANCE_SAGA' })
	if (!Object.keys(userInfo)?.length) yield put(fetchUserInfo())
}

export default function* () {
	// yield takeLatest(actionTypes.FETCH_TRADES, fetchTradesSaga)
	yield takeLatest(actionTypes.INSTANT_TRADE_TAB_SAGA, instantTradeTabSaga)
	yield takeLatest(actionTypes.PAIR_OBJECT_SAGA, pairObjectSaga)
	yield takeLatest(actionTypes.DEPOSIT_PROVIDERS_SAGA, depositProvidersSaga)
	yield takeLatest('BALANCE_SAGA', balanceSaga)
	yield takeLatest(actionTypes.CARDS_SAGA, cardsSaga)
	yield takeLatest(actionTypes.SUBMIT_TRADE, submitTradeSaga)
	yield takeLatest(actionTypes.FETCH_FEE, fetchFeeSaga)
	yield takeLatest('ADD_NEW_CARD_SAGA', addNewCardSaga)
	yield takeLatest('REFRESH_WALLET_AND_TRADES', refreshWalletAndTradesSaga)
}
