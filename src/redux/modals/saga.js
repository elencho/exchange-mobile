import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { actionTypes, toggleCurrencyModal } from './actions';

function* currencySaga(action) {
  yield put(setModalRef(action.ref));
  // const aa = yield select((state) => state.modals.chooseCurrencyModalVisible);
  // const modalRef = yield select(getModalRef);
  // yield delay(1000);
  // yield call(() => console.log(modalRef));
  // yield call(() => modalRef.open());
}

export default function* () {
  yield takeLatest('AAA', currencySaga);
}
