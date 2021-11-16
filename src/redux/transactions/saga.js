import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actionTypes, saveTransactions } from '../transactions/actions';

import { fetchTransactions } from '../../utils/fetchTransactions';
import { getParams } from './selectors';

function* fetchTransactionsSaga(action) {
  const params = yield select(getParams);
  const transactions = yield call(fetchTransactions, params);
  yield put(saveTransactions(transactions));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
}
