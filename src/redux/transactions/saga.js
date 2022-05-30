import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveTransactions,
  setTypeFilter,
  fetchTransactions,
  chooseCurrency,
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
} from './selectors';
import {
  setCryptosArray,
  setCryptosArrayConstant,
  setFiatsArray,
  setTradeOffset,
} from '../trade/actions';
import { fetchTrades } from '../trade/actions';

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

  yield put({ type: 'CLASIFY_CURRENCIES' });
}

function* reachScrollEndSaga(action) {
  const { transactionType } = action;

  if (transactionType === 'transactions') {
    const params = yield select(getParams);
    const offset = yield select(getOffset);
    const loadedTransactions = yield select(totalLoadedTransactions);

    const total = yield call(totalAmount, params);

    if (loadedTransactions < total) {
      yield put(increaseOffset(offset + 1));
      yield put(fetchTransactions());
    }
  }

  if (transactionType === 'trades') {
    const offset = yield select((state) => state.trade.offset);
    const limit = yield select((state) => state.trade.limit);
    yield put(setTradeOffset(offset + 1));
    yield put(fetchTrades());
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
  yield put(filterCurrencies(currencyList));
  yield put(setAbbr(code));
}

function* showResultsSaga(action) {
  const { navigation } = action;

  yield put(saveTransactions([]));
  yield put(increaseOffset(0));
  yield put(fetchTransactions());
  yield call(() => navigation && navigation.goBack());
}

function* transactionDetailsSaga(action) {
  const { currentTransaction } = action;
  yield put(setCurrentTransaction(currentTransaction));
}

function* clasifyCurrenciesSaga() {
  const currencies = yield select((state) => state.transactions.currencies);

  let fiatsArray = [];
  let cryptosArray = [];

  if (currencies) {
    currencies.forEach((c) => {
      if (c.type === 'FIAT') fiatsArray.push(c);
      if (c.type === 'CRYPTO') cryptosArray.push(c);
    });
  }

  yield put(setFiatsArray(fiatsArray));
  yield put(setCryptosArray(cryptosArray));
  yield put(setCryptosArrayConstant(cryptosArray));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_TRANSACTIONS, fetchTransactionsSaga);
  yield takeLatest(actionTypes.FETCH_CURRENCIES, fetchCurrenciesSaga);
  yield takeLatest(actionTypes.TYPE_SAGA_ACTION, typeSaga);
  yield takeLatest(actionTypes.CURRENCY_SAGA_ACTION, currencySaga);
  yield takeLatest(actionTypes.SHOW_RESULTS, showResultsSaga);
  yield takeLatest(actionTypes.REACH_SCROLL_END, reachScrollEndSaga);
  yield takeLatest(actionTypes.FILTER_SAGA_ACTION, filterSaga);
  yield takeLatest('CLASIFY_CURRENCIES', clasifyCurrenciesSaga);
  yield takeLatest(
    actionTypes.TRANSACTION_DETAILS_SAGA,
    transactionDetailsSaga
  );
}
