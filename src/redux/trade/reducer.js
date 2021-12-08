import { actionTypes } from './actions';

const INITIAL_STATE = {
  tradeType: 'Buy',
  Balance_Card: 'balance',
  bank: null,
  card: null,
};

export default (state = INITIAL_STATE, action) => {
  const { tradeType, Balance_Card, card, bank } = action;
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
    case actionTypes.SET_CARD:
      return {
        ...state,
        card,
      };
    case actionTypes.SET_BANK:
      return {
        ...state,
        bank,
      };
    default:
      return state;
  }
};
