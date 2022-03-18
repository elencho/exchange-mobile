import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import {
  fetchCryptoAddresses,
  fetchWireDeposit,
} from '../../utils/walletUtils';
import { chooseCurrency, setAbbr } from '../transactions/actions';
import {
  actionTypes,
  goToBalanceAction,
  saveCryptoAddresses,
  saveWireDepositInfo,
  setNetwork,
} from '../wallet/actions';
// import { wireDepositParams } from './selectors';

function* wireDepositSaga(action) {
  const { name, code, navigation } = action;
  const wireDepositData = yield call(fetchWireDeposit, code);

  yield put(saveWireDepositInfo(wireDepositData));
  // yield put(setNetwork(network));
  yield put({ type: 'GO_TO_BALANCE', name, code, navigation });
}

function* cryptoAddressesSaga(action) {
  const { name, code, navigation, network } = action;
  const cryptoAddresses = yield call(fetchCryptoAddresses, code, network);

  yield put(saveCryptoAddresses(cryptoAddresses));
  // yield put(setNetwork(network))
  yield put(goToBalanceAction(name, code, navigation));
}

function* goToBalanceSaga(action) {
  const { name, code, navigation } = action;
  yield put(setAbbr(code));
  yield put(chooseCurrency(name));
  yield call(() => navigation.navigate('Balance'));
}

export default function* () {
  yield takeLatest(actionTypes.WIRE_DEPOSIT_ACTION, wireDepositSaga);
  yield takeLatest(actionTypes.CRYPTO_ADDRESSES_ACTION, cryptoAddressesSaga);
  yield takeLatest(actionTypes.GO_TO_BALANCE, goToBalanceSaga);
}
