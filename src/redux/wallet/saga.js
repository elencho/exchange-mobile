import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  addWhitelistAddress,
  cryptoWithdrawal,
  fetchCryptoAddresses,
  fetchWhitelist,
  fetchWireDeposit,
  generateCryptoAddress,
} from '../../utils/walletUtils';
import { chooseCurrency, setAbbr } from '../transactions/actions';
import {
  actionTypes,
  goToBalanceAction,
  saveCryptoAddresses,
  saveWhitelist,
  saveWireDepositInfo,
  setHasWhitelist,
  setNetwork,
  setNewWhitelist,
} from '../wallet/actions';
import { addWhitelistParams, withdrawalParams } from './selectors';

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

function* generateCryptoAddressSaga(action) {
  const { code, network } = action;
  const newAddress = yield call(generateCryptoAddress, code, network);

  const cryptoAddresses = yield select((state) => state.wallet.cryptoAddresses);
  yield put(saveCryptoAddresses([...cryptoAddresses, newAddress]));
}

function* goToBalanceSaga(action) {
  const { name, code, navigation } = action;
  yield put(setAbbr(code));
  yield put(chooseCurrency(name));
  yield call(() => navigation.navigate('Balance'));
}

function* withdrawalSaga(action) {
  const { OTP } = action;
  const params = yield select(withdrawalParams);
  const status = yield call(cryptoWithdrawal, OTP, params);
  if (status === 200) {
    // some success code here, for modal or smth
  }
}

function* getWhitelistSaga() {
  const currency = yield select((state) => state.transactions.code);
  const whitelist = yield call(fetchWhitelist, currency);
  yield put(saveWhitelist(whitelist));
  yield put(setHasWhitelist(whitelist.length > 0));
}

function* addWhitelistSaga(action) {
  const { OTP } = action;
  const params = yield select(addWhitelistParams);
  const whitelist = yield select((state) => state.wallet.whitelist);
  const data = yield call(addWhitelistAddress, OTP, params);
  if (data.status === 200) {
    yield put(setNewWhitelist({}));
    yield put(saveWhitelist([...whitelist, data.data]));
  }
}

export default function* () {
  yield takeLatest(actionTypes.WIRE_DEPOSIT_ACTION, wireDepositSaga);
  yield takeLatest(actionTypes.CRYPTO_ADDRESSES_ACTION, cryptoAddressesSaga);
  yield takeLatest(actionTypes.GO_TO_BALANCE, goToBalanceSaga);
  yield takeLatest(
    actionTypes.GENERATE_CRYPTO_ADDRESS,
    generateCryptoAddressSaga
  );
  yield takeLatest(actionTypes.WITHDRAWAL_ACTION, withdrawalSaga);
  yield takeLatest(actionTypes.GET_WHITELIST_ACTION, getWhitelistSaga);
  yield takeLatest(actionTypes.ADD_WHITELIST_ACTION, addWhitelistSaga);
}
