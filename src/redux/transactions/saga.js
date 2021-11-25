import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveTransactions,
  setTypeFilter,
  fetchTransactions,
  chooseCurrency,
  toggleCurrencyModal,
  filterCurrencies,
  setAbbr,
  toggleLoading,
  increaseOffset,
  setMethodFilter,
  typeAction,
  saveCurrencies,
  saveCurrenciesConstant,
  setCurrentTransaction,
} from '../transactions/actions';

import {
  fetchTransactions as fetch,
  fetchCurrencies as currenciesApi,
  totalAmount,
} from '../../utils/fetchTransactions';
import {
  getParams,
  getTransactions,
  getOffset,
  getMethod,
  totalLoadedTransactions,
  getModalRef,
} from './selectors';

function* fetchTransactionsSaga() {
  yield put(toggleLoading(true));

  const params = yield select(getParams);
  const transactions = yield select(getTransactions);
  const newTransactions = yield call(fetch, params);

  yield put(saveTransactions([...transactions, ...newTransactions]));

  yield put(toggleLoading(false));
}

function* fetchCurrenciesSaga() {
  const currencies = yield call(currenciesApi);
  yield put(
    saveCurrencies([{ name: 'Show All Currency', code: '' }, ...currencies])
  );
  yield put(
    saveCurrenciesConstant([
      { name: 'Show All Currency', code: '' },
      ...currencies,
    ])
  );
}

function* reachScrollEndSaga() {
  const params = yield select(getParams);
  const offset = yield select(getOffset);
  const loadedTransactions = yield select(totalLoadedTransactions);

  const total = yield call(totalAmount, params);

  if (loadedTransactions < total) {
    yield put(increaseOffset(offset + 1));
    yield put(fetchTransactions());
  }
}

function* typeSaga(action) {
  const { filter } = action;

  yield put(saveTransactions([]));
  yield put(increaseOffset(0));
  yield put(setTypeFilter(filter === 'ALL' ? null : filter));
  yield put(fetchTransactions());
}

function* filterSaga(action) {
  const { filter, multiselect } = action;
  let method = yield select(getMethod);

  method = method || [];

  let newMultiFilter;

  if (filter !== 'All') {
    if (multiselect && !method.includes(filter)) {
      newMultiFilter = [...method, filter].splice(
        method.indexOf('All') + 1,
        method.length + 1
      );
      yield put(setMethodFilter(newMultiFilter));
    }
    if (multiselect && method.includes(filter)) {
      newMultiFilter = method.filter((f) => filter !== f);
      yield put(setMethodFilter(newMultiFilter));
    }
  } else {
    yield put(setMethodFilter(['All']));
  }
  if (!multiselect) {
    yield put(typeAction(filter));
  }
}

function* currencySaga(action) {
  const { name, currencyList, code } = action;
  yield put(chooseCurrency(name));
  yield put(toggleCurrencyModal(false));
  yield put(filterCurrencies(currencyList));
  yield put(setAbbr(code));
}

function* showResultsSaga(action) {
  const { navigation } = action;

  yield put(saveTransactions([]));
  yield put(increaseOffset(0));
  yield put(fetchTransactions());
  yield call(navigation.goBack);
}

function* modalSaga(action) {
  const { currentTransaction } = action;
  const modalRef = yield select(getModalRef);
  yield put(setCurrentTransaction(currentTransaction));
  yield call(modalRef.open);
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeLatest(actionTypes.FETCH_CURRENCIES, fetchCurrenciesSaga);
  yield takeLatest(actionTypes.TYPE_SAGA_ACTION, typeSaga);
  yield takeLatest(actionTypes.CURRENCY_SAGA_ACTION, currencySaga);
  yield takeLatest(actionTypes.SHOW_RESULTS, showResultsSaga);
  yield takeLatest(actionTypes.REACH_SCROLL_END, reachScrollEndSaga);
  yield takeLatest(actionTypes.FILTER_SAGA_ACTION, filterSaga);
  yield takeLatest(actionTypes.MODAL_SAGA_ACTION, modalSaga);
}
