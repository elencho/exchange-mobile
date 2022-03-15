import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { fetchWireDeposit } from '../../utils/walletUtils';
import { chooseCurrency, setAbbr } from '../transactions/actions';
import {
  actionTypes,
  saveWireDepositInfo,
  wireDepositAction,
} from '../wallet/actions';
// import { wireDepositParams } from './selectors';

function* wireDepositSaga(action) {
  const { name, code, navigation } = action;
  yield put(setAbbr(code));
  yield put(chooseCurrency(name));
  const wireDepositData = yield call(fetchWireDeposit, code);
  yield put(saveWireDepositInfo(wireDepositData));
  yield call(() => navigation.navigate('Balance'));
}

export default function* () {
  yield takeLatest(actionTypes.WIRE_DEPOSIT_ACTION, wireDepositSaga);
}
