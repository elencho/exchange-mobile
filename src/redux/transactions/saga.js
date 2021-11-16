import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import {
  actionTypes,
  saveTransactions,
  setTypeFilter,
  fetchTransactions,
  chooseCurrency,
  toggleCurrencyModal,
  filterCurrencies,
  setAbbr,
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

function* currencySaga(action) {
  const { name, currencyList, abbr } = action;
  yield put(chooseCurrency(name));
  yield put(toggleCurrencyModal(false));
  yield put(filterCurrencies(currencyList));
  yield put(setAbbr(abbr));
}

function* testSaga(action) {
  const { navigation } = action;

  yield put(fetchTransactions());
  yield call(navigation.goBack);
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeLatest(actionTypes.TYPE_SAGA_ACTION, typeSaga);
  yield takeLatest(actionTypes.CURRENCY_SAGA_ACTION, currencySaga);
  yield takeLatest('AA', testSaga);
}
