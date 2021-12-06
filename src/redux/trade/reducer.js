import { actionTypes } from './actions';

const INITIAL_STATE = {
  tradeType: 'Buy',
  Balance_Card: 'balance',
};

export default (state = INITIAL_STATE, action) => {
  const { tradeType, Balance_Card } = action;
  // const { drawerRef } = state;
  switch (action.type) {
    case actionTypes.SET_TRADE_TYPE:
      return {
        ...state,
        tradeType,
      };
    case actionTypes.SWITCH_BALANCE_CARD:
      return {
        ...state,
        Balance_Card,
      };
    default:
      return state;
  }
};
