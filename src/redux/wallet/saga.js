import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  addWhitelistAddress,
  cryptoWithdrawal,
  deleteWhitelistAddress,
  editWhitelistAddress,
  fetchCryptoAddresses,
  fetchTemplates,
  fetchWhitelist,
  fetchWireDeposit,
  generateCryptoAddress,
} from '../../utils/walletUtils';
import { chooseCurrency, setAbbr } from '../transactions/actions';
import {
  actionTypes,
  chooseWhitelist,
  getWhitelistAction,
  goToBalanceAction,
  saveCryptoAddresses,
  saveTemplates,
  saveWhitelist,
  saveWireDepositInfo,
  setDepositRestriction,
  setHasMultipleMethods,
  setHasMultipleNetworks,
  setHasWhitelist,
  setNewWhitelist,
  setWithdrawalRestriction,
} from '../wallet/actions';
import {
  addWhitelistParams,
  editWhitelistParams,
  withdrawalParams,
} from './selectors';

function* methodNetworkRestrictionSaga() {
  const balance = yield select((state) => state.trade.balance);
  const code = yield select((state) => state.transactions.code);
  let hasMultipleMethods = false;
  let hasMultipleNetworks = false;
  let depositRestrictions = {};
  let withdrawalRestrictions = {};

  if (balance.balances) {
    yield call(() => {
      balance.balances.forEach((b) => {
        if (b.currencyCode === code) {
          hasMultipleMethods = Object.keys(b.depositMethods).length > 1;
          if (b.depositMethods.WALLET) {
            hasMultipleNetworks = b.depositMethods.WALLET.length > 1;
          }
          if (b.restrictions.DEPOSIT) {
            depositRestrictions = b.restrictions.DEPOSIT;
          }
          if (b.restrictions.WITHDRAWAL) {
            withdrawalRestrictions = b.restrictions.WITHDRAWAL;
          }
        }
      });
    });

    yield put(setHasMultipleMethods(hasMultipleMethods));
    yield put(setHasMultipleNetworks(hasMultipleNetworks));
    yield put(setDepositRestriction(depositRestrictions));
    yield put(setWithdrawalRestriction(withdrawalRestrictions));
  }
}

function* wireDepositSaga(action) {
  const { name, code, navigation } = action;
  const wireDepositData = yield call(fetchWireDeposit, code);

  yield put(saveWireDepositInfo(wireDepositData));
  yield put({ type: 'GO_TO_BALANCE', name, code, navigation });
  yield put({ type: 'METHOD_NETWORK_RESTRICTION' });
}

function* cryptoAddressesSaga(action) {
  const { name, code, navigation, network } = action;
  const cryptoAddresses = yield call(fetchCryptoAddresses, code, network);

  yield put(saveCryptoAddresses(cryptoAddresses ? cryptoAddresses : []));
  yield put(goToBalanceAction(name, code, navigation));
  yield put({ type: 'METHOD_NETWORK_RESTRICTION' });
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

function* editWhitelistSaga() {
  const params = yield select(editWhitelistParams);
  const { id, name } = params;
  const status = yield call(editWhitelistAddress, id, name);
  if (status === 200) {
    yield put(chooseWhitelist({}));
    yield put(getWhitelistAction());
  }
}

function* deleteWhitelistSaga(action) {
  const { OTP } = action;
  const id = yield select((state) => state.wallet.currentWhitelistObj.id);
  const status = yield call(deleteWhitelistAddress, id, OTP);
  if (status === 200) {
    yield put(chooseWhitelist({}));
    yield put(getWhitelistAction());
  }
}

function* withdrawalTemplatesSaga() {
  const currency = yield select((state) => state.transactions.code);
  const provider = yield select((state) => state.wallet.network);
  const templates = yield call(fetchTemplates, currency, provider);
  yield put(saveTemplates(templates));
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
  yield takeLatest(actionTypes.EDIT_WHITELIST_ACTION, editWhitelistSaga);
  yield takeLatest(actionTypes.DELETE_WHITELIST_ACTION, deleteWhitelistSaga);
  yield takeLatest(actionTypes.FECTH_TEMPLATES_ACTION, withdrawalTemplatesSaga);
  yield takeLatest('METHOD_NETWORK_RESTRICTION', methodNetworkRestrictionSaga);
}
