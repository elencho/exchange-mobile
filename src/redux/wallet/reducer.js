import { actionTypes } from './actions';

const INITIAL_STATE = {
  walletTab: 'Whitelist',
  usdBtcSwitch: 'USD',
};

export default (state = INITIAL_STATE, action) => {
  const { walletTab, usdBtcSwitch } = action;
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
    default:
      return state;
  }
};
