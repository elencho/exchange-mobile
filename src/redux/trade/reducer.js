import { actionTypes } from './actions';

const INITIAL_STATE = {
  tradeType: 'Buy',
};

export default (state = INITIAL_STATE, action) => {
  const { tradeType } = action;
  // const { drawerRef } = state;
  switch (action.type) {
    case actionTypes.SET_TRADE_TYPE:
      return {
        ...state,
        tradeType,
      };
    default:
      return state;
  }
};
