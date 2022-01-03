import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveOffers,
  saveTrades,
  setOffersLoading,
  setPairObject,
  setTradesLoading,
  fetchTrades as fetchTradesAction,
  setBalance,
  saveCards,
  setDepositProvider,
  setDepositProviders,
  setFee,
} from './actions';
import {
  getParams,
  getTrades,
  paramsForTrade,
  getCardParams,
  paramsForFee,
} from './selectors';
import {
  fetchTrades,
  fetchOffers,
  submitTrade,
  fetchBalance,
  fetchCards,
  fetchFees,
} from '../../utils/fetchTrades';

function* fetchTradesSaga() {
  yield put(setTradesLoading(true));
  const params = yield select(getParams);
  // const trades = yield select(getTrades);
  const newTrades = yield call(fetchTrades, params);
  yield put(saveTrades(newTrades));
  yield put(setTradesLoading(false));
}

function* fetchOffersSaga() {
  yield put(setOffersLoading(true));
  const offers = yield call(fetchOffers);
  yield put(saveOffers(offers));

  let object;
  const fiat = yield select((state) => state.trade.fiat);
  const crypto = yield select((state) => state.trade.crypto);

  yield call(() =>
    offers[fiat].forEach((o) => {
      if (o.pair.baseCurrency === crypto) {
        object = o;
      }
    })
  );
  yield put(setPairObject(object));

  const balance = yield call(fetchBalance);
  yield put(setBalance(balance));

  let provider; // It will become first item of depositProviders array for a particular fiat
  let providers; // Banks that have ecommerce
  yield call(() => {
    balance.balances.forEach((b) => {
      if (b.depositTypes.includes('ECOMMERCE')) {
        providers = b.ecommerceDepositProviders;

        if (b.currencyCode === fiat) {
          provider = b.ecommerceDepositProviders[0].provider;
        }
      }
    });
  });
  yield put(setDepositProvider(provider));
  yield put(setDepositProviders(providers));

  const cardParams = yield select(getCardParams);
  const cards = yield call(fetchCards, cardParams);
  yield put(saveCards(cards));
  yield put(setOffersLoading(false));
}

function* submitTradeSaga() {
  yield put(setTradesLoading(true));
  const params = yield select(paramsForTrade);
  yield call(submitTrade, params);
  yield put(fetchTradesAction());
  yield put(setTradesLoading(false));
}

function* fetchFeeSaga() {
  const params = yield select(paramsForFee);
  const fee = yield call(fetchFees, params);
  yield put(setFee(fee));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRADES, fetchTradesSaga);
  yield takeLatest(actionTypes.FETCH_OFFERS, fetchOffersSaga);
  yield takeLatest(actionTypes.SUBMIT_TRADE, submitTradeSaga);
  yield takeLatest(actionTypes.FETCH_FEE, fetchFeeSaga);
}
