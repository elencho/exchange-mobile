import { call, put, select, takeLatest } from 'redux-saga/effects';

import { actionTypes } from './actions';

import { getModalRef } from './selectors';

function* currencySaga(action) {
  // const { name, currencyList, code } = action;
  // yield put(chooseCurrency(name));
  // yield put(filterCurrencies(currencyList));
  // yield put(setAbbr(code));
  // const modalRef = yield select(getModalRef);
  // yield call(modalRef.close);
}

export default function* () {
  yield takeLatest('AA', currencySaga);
}
