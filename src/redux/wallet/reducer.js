import { actionTypes } from './actions';

const INITIAL_STATE = {
  walletTab: 'Withdrawal',
  usdBtcSwitch: 'USD',
  network: null,

  hasMultipleNetworks: false,
  hasMultipleMethods: false,
  depositRestriction: {},
  withdrawalRestriction: {},

  // Deposit
  wireDepositInfo: {},
  cryptoAddresses: [],

  //Withdrawal
  withdrawalAmount: null,
  withdrawalNote: '',
  memoTag: '',
  templates: [],
  currentTemplate: {},
  banks: [],
  withdrawalBank: {},
  iban: '',
  saveTemplate: false,
  newTemplateName: '',

  receiverBank: {},
  intermediateBank: {},

  // Whitelist
  whitelist: [],
  hasWhitelist: null,
  currentWhitelistObj: {},
  newWhitelist: {},
};

export default (state = INITIAL_STATE, action) => {
  const {
    walletTab,
    usdBtcSwitch,
    depositRestriction,
    withdrawalRestriction,
    hasMultipleNetworks,
    hasMultipleMethods,
    wireDepositInfo,
    memoTag,
    cryptoAddresses,
    network,
    withdrawalAmount,
    withdrawalNote,
    whitelist,
    hasWhitelist,
    currentWhitelistObj,
    newWhitelist,
    templates,
    currentTemplate,
    banks,
    withdrawalBank,
    iban,
    saveTemplate,
    newTemplateName,
    receiverBank,
    intermediateBank,
  } = action;
  switch (action.type) {
    case actionTypes.SET_WALLET_TAB:
      return {
        ...state,
        walletTab,
      };
    case actionTypes.SET_USD_BTC:
      return {
        ...state,
        usdBtcSwitch,
      };
    case actionTypes.SET_HAS_MULTIPLE_NETWORKS:
      return {
        ...state,
        hasMultipleNetworks,
      };
    case actionTypes.SET_DEPOSIT_RESTRICTION:
      return {
        ...state,
        depositRestriction,
      };
    case actionTypes.SET_WITHDRAWAL_RESTRICTION:
      return {
        ...state,
        withdrawalRestriction,
      };
    case actionTypes.SET_HAS_MULTIPLE_METHODS:
      return {
        ...state,
        hasMultipleMethods,
      };
    case actionTypes.SAVE_WIRE_DEPOSIT_INFO:
      return {
        ...state,
        wireDepositInfo,
      };
    case actionTypes.SAVE_CRYPTO_ADDRESSES:
      return {
        ...state,
        cryptoAddresses,
      };
    case actionTypes.SET_NETWORK:
      return {
        ...state,
        network,
      };
    case actionTypes.SET_MEMO_TAG:
      return {
        ...state,
        memoTag,
      };
    case actionTypes.SET_WITHDRAWAL_AMOUNT:
      return {
        ...state,
        withdrawalAmount,
      };
    case actionTypes.SET_WITHDRAWAL_NOTE:
      return {
        ...state,
        withdrawalNote,
      };
    case actionTypes.SAVE_WHITELIST:
      return {
        ...state,
        whitelist,
      };
    case actionTypes.SET_HAS_WHITELIST:
      return {
        ...state,
        hasWhitelist,
      };
    case actionTypes.CHOOSE_WHITELIST:
      return {
        ...state,
        currentWhitelistObj,
      };
    case actionTypes.SET_NEW_WHITELIST:
      return {
        ...state,
        newWhitelist,
      };
    case actionTypes.SAVE_TEMPLATES:
      return {
        ...state,
        templates,
      };
    case actionTypes.SET_CURRENT_TEMPLATE:
      return {
        ...state,
        currentTemplate,
      };
    case actionTypes.SAVE_BANKS:
      return {
        ...state,
        banks,
      };
    case actionTypes.SET_WITHDRAWAL_BANK:
      return {
        ...state,
        withdrawalBank,
      };
    case actionTypes.SET_IBAN:
      return {
        ...state,
        iban,
      };
    case actionTypes.SAVE_TEMPLATE:
      return {
        ...state,
        saveTemplate,
      };
    case actionTypes.NEW_TEMPLATE_NAME:
      return {
        ...state,
        newTemplateName,
      };
    case actionTypes.SET_RECEIVER_BANK:
      return {
        ...state,
        receiverBank,
      };
    case actionTypes.SET_INTERMEDIATE_BANK:
      return {
        ...state,
        intermediateBank,
      };
    default:
      return state;
  }
};
