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
  setTransparentBackground,
  toggleTransactionModal,
} from '../transactions/actions';

import { fetchTransactions as fetch } from '../../utils/fetchTransactions';
import { getParams, modalTopParams } from './selectors';
import { currencyList } from '../../constants/filters';

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

function* showResultsSaga(action) {
  const { navigation } = action;

  yield put(fetchTransactions());
  yield call(navigation.goBack);
}

function* modalTopSaga() {
  const params = yield select(modalTopParams);

  if (params.currencyModal) {
    yield put(toggleCurrencyModal(false));
    yield put(filterCurrencies(currencyList));
  }
  if (params.transactionModal) {
    yield put(toggleTransactionModal(false));
    yield delay(500);
    yield put(setTransparentBackground(false));
  }
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeLatest(actionTypes.TYPE_SAGA_ACTION, typeSaga);
  yield takeLatest(actionTypes.CURRENCY_SAGA_ACTION, currencySaga);
  yield takeLatest(actionTypes.MODAL_TOP_SAGA, modalTopSaga);
  yield takeLatest(actionTypes.SHOW_RESULTS, showResultsSaga);
}
