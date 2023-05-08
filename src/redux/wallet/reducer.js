import { actionTypes } from './actions';

const INITIAL_STATE = {
  cardBeingVerified: false,
  walletTab: 'Deposit',
  usdBtcSwitch: 'USD',
  network: null,

  hasMultipleNetworks: false,
  hasMultipleMethods: false,
  depositRestriction: {},
  withdrawalRestriction: {},

  // Deposit
  wireDepositInfo: {},
  cryptoAddress: {},
  methodsToDisplay: [],
  wireDepositProviders: [],
  wireDepositProvider: null,
  depositAmount: null,
  isAddressGenerating: false,

  //Withdrawal
  templates: [],
  banks: [],
  withdrawalAmount: null,
  withdrawalNote: '',
  currentTemplate: {},
  withdrawalBank: {},
  iban: '',
  memoTag: '',
  saveTemplate: false,
  newTemplateName: '',

  receiverBank: {},
  intermediateBank: {},

  // Whitelist
  whitelist: [],
  hasWhitelist: null,
  currentWhitelistObj: {},
  newWhitelist: {},
  whitelistLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  const {
    cardBeingVerified,
    walletTab,
    usdBtcSwitch,
    depositRestriction,
    withdrawalRestriction,
    methodsToDisplay,
    hasMultipleNetworks,
    hasMultipleMethods,
    wireDepositInfo,
    memoTag,
    cryptoAddress,
    network,
    withdrawalAmount,
    withdrawalNote,
    whitelist,
    hasWhitelist,
    currentWhitelistObj,
    newWhitelist,
    whitelistLoading,
    templates,
    currentTemplate,
    banks,
    withdrawalBank,
    iban,
    saveTemplate,
    newTemplateName,
    receiverBank,
    intermediateBank,
    depositAmount,
    wireDepositProviders,
    wireDepositProvider,
    isAddressGenerating,
  } = action;
  switch (action.type) {
    case 'SET_CARD_VERIFICATION_STATUS':
      return {
        ...state,
        cardBeingVerified,
      };
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
    case 'SET_METHODS_TO_DISPLAY':
      return {
        ...state,
        methodsToDisplay,
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
    case actionTypes.SAVE_CRYPTO_ADDRESS:
      return {
        ...state,
        cryptoAddress,
      };
    case actionTypes.SET_IS_ADDRESS_GENERATING:
      return {
        ...state,
        isAddressGenerating,
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
    case 'TOGGLE_WHITELIST_LOADING':
      return {
        ...state,
        whitelistLoading,
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
    case 'SAVE_WIRE_DEPOSIT_PROVIDERS':
      return {
        ...state,
        wireDepositProviders,
      };
    case 'SET_WIRE_DEPOSIT_PROVIDER':
      return {
        ...state,
        wireDepositProvider,
      };
    case 'SET_DEPOSIT_AMOUNT':
      return {
        ...state,
        depositAmount,
      };
    case 'CLEAN_WALLET_INPUTS':
      return {
        ...state,
        withdrawalAmount: null,
        withdrawalNote: '',
        currentTemplate: {},
        withdrawalBank: {},
        iban: '',
        memoTag: '',
        saveTemplate: false,
        newTemplateName: '',
        depositAmount: null,
        currentWhitelistObj: {},
      };
    case actionTypes.RESET_WALLET_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
