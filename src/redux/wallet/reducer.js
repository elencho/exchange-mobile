import { actionTypes } from './actions';

const INITIAL_STATE = {
  walletTab: 'Deposit',
  usdBtcSwitch: 'USD',
  wireDepositInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  const { walletTab, usdBtcSwitch, wireDepositInfo } = action;
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
    default:
      return state;
  }
};
