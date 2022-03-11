import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchWireDeposit } from '../../utils/walletUtils';
import { actionTypes, saveWireDepositInfo } from '../wallet/actions';
// import { wireDepositParams } from './selectors';

function* wireDepositSaga() {
  const currency = yield select((state) => state.transactions.code);
  const wireDepositData = yield call(fetchWireDeposit, currency);
  yield put(saveWireDepositInfo(wireDepositData));
}

export default function* () {
  yield takeLatest(actionTypes.WIRE_DEPOSIT_ACTION, wireDepositSaga);
}
