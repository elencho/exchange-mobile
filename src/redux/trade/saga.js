import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveOffers,
  saveTrades,
  setOffersLoading,
  setPairObject,
  setTradesLoading,
} from './actions';
import { getParams, getTrades, paramsForTrade } from './selectors';
import { fetchTrades, fetchOffers, submitTrade } from '../../utils/fetchTrades';

function* fetchTradesSaga() {
  yield put(setTradesLoading(true));
  const params = yield select(getParams);
  const trades = yield select(getTrades);
  const newTrades = yield call(fetchTrades, params);
  yield put(saveTrades([...trades, ...newTrades]));
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
  yield put(setOffersLoading(false));
}

function* submitTradeSaga() {
  yield put(setTradesLoading(true));
  const params = yield select(paramsForTrade);
  yield call(submitTrade, params);
  yield put(setTradesLoading(false));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRADES, fetchTradesSaga);
  yield takeLatest(actionTypes.FETCH_OFFERS, fetchOffersSaga);
  yield takeLatest(actionTypes.SUBMIT_TRADE, submitTradeSaga);
}
