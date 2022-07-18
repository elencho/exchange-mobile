import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveOffers,
  saveTrades,
  fetchOffers as fetchOffersAction,
  setOffersLoading,
  setPairObject,
  setTradesLoading,
  fetchTrades as fetchTradesAction,
  setBalance,
  saveCards,
  setDepositProvider,
  setDepositProviders,
  setFee,
  saveCardTradeData,
  pairObjectSagaAction,
  depositProvidersSagaAction,
  cardsSagaAction,
  setCurrentBalanceObj,
} from './actions';
import {
  getParams,
  getTrades,
  paramsForTrade,
  getCardParams,
  paramsForFee,
  withdrawalFeeParams,
} from './selectors';
import {
  fetchTrades,
  fetchOffers,
  submitTrade,
  fetchBalance,
  fetchCards,
  fetchFees,
} from '../../utils/fetchTrades';
import { toggleBuySellModal } from '../modals/actions';
import { getWhitelistAction, setWalletTab } from '../wallet/actions';
import { fetchCurrencies } from '../transactions/actions';

function* fetchTradesSaga() {
  yield put(setTradesLoading(true));
  const params = yield select(getParams);
  const newTrades = yield call(fetchTrades, params);
  yield put(saveTrades(newTrades));
  yield put(setTradesLoading(false));
}

function* pairObjectSaga(action) {
  const { offers } = action;
  let object;
  const fiat = yield select((state) => state.trade.fiat);
  const crypto = yield select((state) => state.trade.crypto);

  if (offers) {
    yield call(() =>
      offers[fiat].forEach((o) => {
        if (o.pair.baseCurrency === crypto) object = o;
      })
    );
    yield put(setPairObject(object));
  }
}

function* depositProvidersSaga() {
  let provider; // It will become first item of depositProviders array for a particular fiat
  let providers; // Banks that have ecommerce
  const balance = yield select((state) => state.trade.balance);
  const fiat = yield select((state) => state.trade.fiat);

  const setProviders = () =>
    balance.balances.forEach((b) => {
      if (b.depositMethods.ECOMMERCE && fiat === b.currencyCode) {
        providers = b.depositMethods.ECOMMERCE;
        // provider = b.depositMethods.ECOMMERCE[0].provider;
      }
    });

  if (balance) {
    if (balance.balances) yield call(setProviders);
  }
  // yield put(setDepositProvider(provider));
  yield put(setDepositProviders(providers));
}

function* cardsSaga() {
  const cardParams = yield select(getCardParams);
  const cards = yield call(fetchCards, cardParams);
  yield put(saveCards(cards));
}

function* fetchOffersSaga() {
  yield put(setOffersLoading(true));
  const offers = yield call(fetchOffers);
  yield put(saveOffers(offers));

  yield put(pairObjectSagaAction(offers));

  const balance = yield call(fetchBalance);
  yield put(setBalance(balance));

  yield put(depositProvidersSagaAction());
  yield put(cardsSagaAction());

  yield put({ type: 'CLASIFY_CURRENCIES' });

  yield put(setOffersLoading(false));
}

function* submitTradeSaga() {
  yield put(setTradesLoading(true));
  const params = yield select(paramsForTrade);
  const data = yield call(submitTrade, params);
  if (data) {
    if (data.status >= 200 && data.status < 300) {
      yield put(saveCardTradeData(data.data));
      // yield put(fetchTradesAction());
      // yield put(toggleBuySellModal(false));
      yield put(setTradesLoading(false));
    }
  }
}

function* fetchFeeSaga(action) {
  const { feeType } = action;
  const params = yield select(
    feeType === 'withdrawal' ? withdrawalFeeParams : paramsForFee
  );
  const fee = yield call(fetchFees, params);
  yield put(setFee(fee));
}

function* addNewCardSaga(action) {
  const { navigation, balances, fiat, name, code } = action;
  let obj;

  balances.forEach((b) => {
    if (b.currencyCode === fiat) obj = b;
  });

  yield put(setCurrentBalanceObj(obj));
  yield put(setWalletTab('Manage Cards'));
  yield put(toggleBuySellModal(false));
  yield delay(500);
  yield put({ type: 'GO_TO_BALANCE', name, code, navigation });
}

function* refreshWalletAndTradesSaga() {
  // For now, trades and wallet screen refreshes are the same
  yield put(fetchOffersAction());
  yield put(fetchTradesAction());
  yield put(fetchCurrencies());
  yield put(getWhitelistAction());
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRADES, fetchTradesSaga);
  yield takeLatest(actionTypes.FETCH_OFFERS, fetchOffersSaga);
  yield takeLatest(actionTypes.PAIR_OBJECT_SAGA, pairObjectSaga);
  yield takeLatest(actionTypes.DEPOSIT_PROVIDERS_SAGA, depositProvidersSaga);
  yield takeLatest(actionTypes.CARDS_SAGA, cardsSaga);
  yield takeLatest(actionTypes.SUBMIT_TRADE, submitTradeSaga);
  yield takeLatest(actionTypes.FETCH_FEE, fetchFeeSaga);
  yield takeLatest('ADD_NEW_CARD_SAGA', addNewCardSaga);
  yield takeLatest('REFRESH_WALLET_AND_TRADES', refreshWalletAndTradesSaga);
}
