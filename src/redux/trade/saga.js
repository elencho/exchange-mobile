import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actionTypes, saveTrades } from './actions';
import { toggleLoading } from '../transactions/actions';
import { getParams, getTrades } from './selectors';
import { fetchTrades } from '../../utils/fetchTrades';

function* fetchTradesSaga() {
  yield put(toggleLoading(true));
  const params = yield select(getParams);
  const trades = yield select(getTrades);
  const newTrades = yield call(fetchTrades, params);
  yield put(saveTrades([...trades, ...newTrades]));
  yield put(toggleLoading(false));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRADES, fetchTradesSaga);
}
