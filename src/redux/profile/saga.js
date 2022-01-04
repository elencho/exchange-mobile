import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actionTypes, setFee } from './actions';
import { getParams } from './selectors';
import { fetchFees } from '../../utils/fetchTrades';

function* fetchFeeSaga() {
  // const params = yield select(paramsForFee);
  // const fee = yield call(fetchFees, params);
  // yield put(setFee(fee));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRADES, fetchFeeSaga);
}
