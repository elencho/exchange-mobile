import { actionTypes } from './actions';

const INITIAL_STATE = {
  walletTab: 'Deposit',
  usdBtcSwitch: 'USD',
  network: null,

  // Deposit
  wireDepositInfo: {},
  cryptoAddresses: [],

  //Withdrawal
  withdrawalAmount: null,
  withdrawalNote: '',

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
    wireDepositInfo,
    cryptoAddresses,
    network,
    destinationAddress,
    withdrawalAmount,
    withdrawalNote,
    whitelist,
    hasWhitelist,
    currentWhitelistObj,
    newWhitelist,
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
    case actionTypes.SET_DESTINATION_ADDRESS:
      return {
        ...state,
        destinationAddress,
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
    default:
      return state;
  }
};
