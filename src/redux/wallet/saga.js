import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  addWhitelistAddress,
  cardWithdrawal,
  cryptoWithdrawal,
  deleteTemplates,
  deleteWhitelistAddress,
  editWhitelistAddress,
  fetchBanks,
  fetchCryptoAddresses,
  fetchTemplates,
  fetchWhitelist,
  fetchWireDeposit,
  generateCryptoAddress,
  maxWithdrawal,
  wireWithdrawal,
} from '../../utils/walletUtils';
import {
  toggleAddWhitelistModal,
  toggleEditWhitelistModal,
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
} from '../modals/actions';
import { setCard, setDepositProvider, setFee } from '../trade/actions';
import { chooseCurrency, setAbbr } from '../transactions/actions';
import {
  actionTypes,
  chooseTemplate,
  chooseWhitelist,
  getWhitelistAction,
  goToBalanceAction,
  saveBanks,
  saveCryptoAddress,
  saveTemplateAction,
  saveTemplates,
  saveWhitelist,
  saveWireDepositInfo,
  setDepositRestriction,
  setHasMultipleMethods,
  setHasMultipleNetworks,
  setHasWhitelist,
  setIban,
  setNewTemplateName,
  setNewWhitelist,
  setReceiverBank,
  setWithdrawalAmount,
  setWithdrawalBank,
  setWithdrawalNote,
  setWithdrawalRestriction,
  withdrawalTemplatesAction,
} from '../wallet/actions';
import {
  addWhitelistParams,
  cardWithdrawalParams,
  maxWithdrawalParams,
  editWhitelistParams,
  wireWithdrawalParams,
  withdrawalParams,
} from './selectors';

function* methodNetworkRestrictionSaga() {
  const currentBalanceObj = yield select(
    (state) => state.trade.currentBalanceObj
  );
  const walletTab = yield select((state) => state.wallet.walletTab);
  const m = walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';
  let hasMultipleMethods = false;
  let hasMultipleNetworks = false;
  let depositRestrictions = {};
  let withdrawalRestrictions = {};

  yield call(() => {
    const b = currentBalanceObj[m];
    const r = currentBalanceObj?.restrictions;

    hasMultipleMethods = Object.keys(b).length > 1;
    if (b?.WALLET) hasMultipleNetworks = b.WALLET?.length > 1;
    if (b?.WIRE) hasMultipleNetworks = b.WIRE?.length > 1;

    if (r?.DEPOSIT) depositRestrictions = r.DEPOSIT;
    if (r?.WITHDRAWAL) withdrawalRestrictions = r.WITHDRAWAL;
  });

  yield put(setHasMultipleMethods(hasMultipleMethods));
  yield put(setHasMultipleNetworks(hasMultipleNetworks));
  yield put(setDepositRestriction(depositRestrictions));
  yield put(setWithdrawalRestriction(withdrawalRestrictions));
}

function* wireDepositSaga(action) {
  const { name, code, navigation } = action;
  const network = yield select((s) => s.wallet.network);
  const language = yield select((s) => s.profile.language);
  const currentBalanceObj = yield select((s) => s.trade.currentBalanceObj);

  if (Object.keys(currentBalanceObj?.depositMethods)?.length) {
    const wireDepositData = yield call(fetchWireDeposit, code, network);
    if (wireDepositData) {
      const wireBanks = wireDepositData[language];
      yield put(saveWireDepositInfo(wireDepositData));
      yield put({ type: 'SAVE_WIRE_BANKS', wireBanks });
    }
  }

  yield put({ type: 'METHOD_NETWORK_RESTRICTION' });
  if (navigation) yield put({ type: 'GO_TO_BALANCE', name, code, navigation });
}

function* cryptoAddressesSaga(action) {
  const { name, code, navigation, network } = action;
  const currentBalanceObj = yield select(
    (state) => state.trade.currentBalanceObj
  );

  if (Object.keys(currentBalanceObj?.depositMethods)?.length) {
    const cryptoAddress = yield call(fetchCryptoAddresses, code, network);
    yield put(saveCryptoAddress(cryptoAddress ? cryptoAddress : {}));
  }

  yield put(goToBalanceAction(name, code, navigation));
  yield put({ type: 'METHOD_NETWORK_RESTRICTION' });
}

function* generateCryptoAddressSaga(action) {
  const { code, network } = action;
  const cryptoAddress = yield call(generateCryptoAddress, code, network);
  yield put(saveCryptoAddress(cryptoAddress));
}

function* goToBalanceSaga(action) {
  const { name, code, navigation } = action;
  yield put(setAbbr(code));
  yield put(chooseCurrency(name));
  yield call(() => navigation.navigate('Balance'));
}

function* getWhitelistSaga() {
  const currency = yield select((state) => state.transactions.code);
  const whitelist = yield call(fetchWhitelist, currency);
  yield put(saveWhitelist(whitelist));
  yield put(setHasWhitelist(whitelist?.length > 0));
}

export function* addWhitelistSaga(action) {
  const { OTP } = action;
  const params = yield select(addWhitelistParams);
  const whitelist = yield select((state) => state.wallet.whitelist);

  const google = yield select((state) => state.modals.googleOtpModalVisible);
  const sms = yield select((state) => state.modals.smsAuthModalVisible);
  const email = yield select((state) => state.modals.emailAuthModalVisible);

  const data = yield call(addWhitelistAddress, OTP, params);
  if (data) {
    if (google) yield put(toggleGoogleOtpModal(false));
    if (sms) yield put(toggleSmsAuthModal(false));
    if (email) yield put(toggleEmailAuthModal(false));

    yield put(setNewWhitelist({}));
    yield put(saveWhitelist([...whitelist, data]));
    yield put({ type: 'REFRESH_WALLET_AND_TRADES' });
    yield put(toggleAddWhitelistModal(false));
  }
}

function* editWhitelistSaga() {
  const params = yield select(editWhitelistParams);
  const { id, name } = params;
  const status = yield call(editWhitelistAddress, id, name);
  if (status === 200) {
    yield put(chooseWhitelist({}));
    yield put(getWhitelistAction());
    yield put(toggleEditWhitelistModal(false));
  }
}

function* deleteWhitelistSaga(action) {
  const { OTP } = action;
  const id = yield select((state) => state.wallet.currentWhitelistObj.id);
  const status = yield call(deleteWhitelistAddress, id, OTP);

  const google = yield select((state) => state.modals.googleOtpModalVisible);
  const sms = yield select((state) => state.modals.smsAuthModalVisible);
  const email = yield select((state) => state.modals.emailAuthModalVisible);

  if (status === 200) {
    yield put(chooseWhitelist({}));
    yield put(getWhitelistAction());

    if (google) yield put(toggleGoogleOtpModal(false));
    if (sms) yield put(toggleSmsAuthModal(false));
    if (email) yield put(toggleEmailAuthModal(false));
  }
}

function* withdrawalTemplatesSaga() {
  const currency = yield select((state) => state.transactions.code);
  const provider = yield select((state) => state.wallet.network);

  if (provider !== 'ECOMMERCE' && provider) {
    const templates = yield call(fetchTemplates, currency, provider);
    if (templates) yield put(saveTemplates(templates));

    const banks = yield call(fetchBanks, provider);
    if (banks) yield put(saveBanks(banks));
  }
}

function* cryptoWithdrawalSaga(action) {
  const { OTP } = action;
  const google = yield select((state) => state.modals.googleOtpModalVisible);
  const sms = yield select((state) => state.modals.smsAuthModalVisible);
  const email = yield select((state) => state.modals.emailAuthModalVisible);

  const params = yield select(withdrawalParams);
  const status = yield call(cryptoWithdrawal, OTP, params);
  if (status === 200) {
    if (google) yield put(toggleGoogleOtpModal(false));
    if (sms) yield put(toggleSmsAuthModal(false));
    if (email) yield put(toggleEmailAuthModal(false));

    yield put({ type: 'CLEAR_WITHDRAWAL_INPUTS' });
    yield put({ type: 'BALANCE_SAGA' });
  }
}

function* wireWithdrawalSaga(action) {
  const { OTP } = action;
  const google = yield select((state) => state.modals.googleOtpModalVisible);
  const sms = yield select((state) => state.modals.smsAuthModalVisible);
  const email = yield select((state) => state.modals.emailAuthModalVisible);

  const params = yield select(wireWithdrawalParams);
  const status = yield call(wireWithdrawal, OTP, params);
  if (status >= 200 && status < 300) {
    if (google) yield put(toggleGoogleOtpModal(false));
    if (sms) yield put(toggleSmsAuthModal(false));
    if (email) yield put(toggleEmailAuthModal(false));

    yield put({ type: 'CLEAR_WITHDRAWAL_INPUTS' });
    yield put({ type: 'BALANCE_SAGA' });
  }
}

function* cardWithdrawalSaga(action) {
  const { OTP } = action;
  const google = yield select((state) => state.modals.googleOtpModalVisible);
  const sms = yield select((state) => state.modals.smsAuthModalVisible);
  const email = yield select((state) => state.modals.emailAuthModalVisible);

  const params = yield select(cardWithdrawalParams);
  const status = yield call(cardWithdrawal, OTP, params);
  if (status >= 200 && status < 300) {
    if (google) yield put(toggleGoogleOtpModal(false));
    if (sms) yield put(toggleSmsAuthModal(false));
    if (email) yield put(toggleEmailAuthModal(false));

    yield put({ type: 'CLEAR_WITHDRAWAL_INPUTS' });
    yield put({ type: 'BALANCE_SAGA' });
  }
}

function* clearWithdrawalInputsSaga() {
  // crypto
  yield put(chooseWhitelist({}));
  yield put(setWithdrawalAmount(null));
  yield put(setWithdrawalNote(null));
  yield put(setFee(null));

  // + wire
  yield put(chooseTemplate({}));
  yield put(setIban(''));
  yield put(setWithdrawalBank({}));
  yield put(saveTemplateAction(false));
  yield put(setNewTemplateName(''));
  yield put(setReceiverBank({}));
  yield put(withdrawalTemplatesAction());

  // + card
  yield put(setDepositProvider(null));
  yield put(setCard(null));
}

function* maxWithdrawalSaga() {
  const params = yield select(maxWithdrawalParams);
  const max = yield call(maxWithdrawal, params);

  if (max) {
    yield put(setWithdrawalAmount(max?.amount));
    yield put(setFee(max));
  }
}

function* deleteTemplatesSaga(action) {
  const { id } = action;
  const status = yield call(deleteTemplates, id);
  if (status === 200) {
    yield put(withdrawalTemplatesAction());
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
  yield takeLatest(actionTypes.CRYPTO_WITHDRAWAL_ACTION, cryptoWithdrawalSaga);
  yield takeLatest(actionTypes.GET_WHITELIST_ACTION, getWhitelistSaga);
  yield takeLatest(actionTypes.ADD_WHITELIST_ACTION, addWhitelistSaga);
  yield takeLatest(actionTypes.EDIT_WHITELIST_ACTION, editWhitelistSaga);
  yield takeLatest(actionTypes.DELETE_WHITELIST_ACTION, deleteWhitelistSaga);
  yield takeLatest(actionTypes.FECTH_TEMPLATES_ACTION, withdrawalTemplatesSaga);
  yield takeLatest(actionTypes.WIRE_WITHDRAWAL_SAGA, wireWithdrawalSaga);
  yield takeLatest(actionTypes.CARD_WITHDRAWAL_SAGA, cardWithdrawalSaga);
  yield takeLatest(actionTypes.DELETE_TEMPLATES_ACTION, deleteTemplatesSaga);
  yield takeLatest('METHOD_NETWORK_RESTRICTION', methodNetworkRestrictionSaga);
  yield takeLatest('MAX_WITHDRAWAL_SAGA', maxWithdrawalSaga);
  yield takeLatest('CLEAR_WITHDRAWAL_INPUTS', clearWithdrawalInputsSaga);
}
