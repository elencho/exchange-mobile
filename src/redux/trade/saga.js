import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actionTypes } from './actions';

function* fetchTransactionsSaga() {
  // yield put(toggleLoading(true));
  // const params = yield select(getParams);
  // const transactions = yield select(getTransactions);
  // const newTransactions = yield call(fetch, params);
  // yield put(saveTransactions([...transactions, ...newTransactions]));
  // yield put(toggleLoading(false));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
}
