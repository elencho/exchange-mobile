import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import {
  actionTypes,
  saveTransactions,
  setTypeFilter,
  fetchTransactions,
} from '../transactions/actions';

import { fetchTransactions as fetch } from '../../utils/fetchTransactions';
import { getParams } from './selectors';

function* fetchTransactionsSaga() {
  const params = yield select(getParams);
  const transactions = yield call(fetch, params);
  yield put(saveTransactions(transactions));
}

function* typeSaga(action) {
  const { filter } = action;
  yield put(setTypeFilter(filter === 'ALL' ? null : filter));
  yield put(fetchTransactions());
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeLatest('TYPE_SAGA', typeSaga);
}
