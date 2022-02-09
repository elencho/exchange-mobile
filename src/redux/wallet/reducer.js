import { actionTypes } from './actions';

const INITIAL_STATE = {
  walletTab: 'Whitelist',
};

export default (state = INITIAL_STATE, action) => {
  const { walletTab } = action;
  switch (action.type) {
    case actionTypes.SET_WALLET_TAB:
      return {
        ...state,
        walletTab,
      };
    default:
      return state;
  }
};
