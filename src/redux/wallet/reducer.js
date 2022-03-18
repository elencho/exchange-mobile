import { actionTypes } from './actions';

const INITIAL_STATE = {
  walletTab: 'Deposit',
  usdBtcSwitch: 'USD',
  wireDepositInfo: {},
  cryptoAddresses: [],
  network: null,
};

export default (state = INITIAL_STATE, action) => {
  const { walletTab, usdBtcSwitch, wireDepositInfo, cryptoAddresses, network } =
    action;
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
    default:
      return state;
  }
};
