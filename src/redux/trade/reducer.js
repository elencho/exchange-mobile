import { actionTypes } from './actions';

const INITIAL_STATE = {
  trades: [],
  offers: { USD: [], GEL: [] },
  pairObject: null,
  currentTrade: { price: null, size: null },

  fiat: 'USD',
  crypto: 'BTC',
  tradeType: 'Buy',
  Balance_Card: 'balance',
  bank: null,
  card: null,

  tradesLoading: false,
  offersLoading: false,

  // Query Params
  pairId: 'BTC-USD',
  offset: 0,
  limit: 5,
};

export default (state = INITIAL_STATE, action) => {
  const {
    tradeType,
    Balance_Card,
    card,
    bank,
    trades,
    offers,
    tradesLoading,
    offersLoading,
    pairObject,
    currentTrade,
  } = action;
  switch (action.type) {
    case actionTypes.SAVE_TRADES:
      return {
        ...state,
        trades,
      };
    case actionTypes.SAVE_OFFERS:
      return {
        ...state,
        offers,
      };
    case actionTypes.SET_PAIR_OBJECT:
      return {
        ...state,
        pairObject,
      };
    case actionTypes.SET_CURRENT_TRADE:
      return {
        ...state,
        currentTrade,
      };
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
    case actionTypes.SET_TRADES_LOADING:
      return {
        ...state,
        tradesLoading,
      };
    case actionTypes.SET_OFFERS_LOADING:
      return {
        ...state,
        offersLoading,
      };
    default:
      return state;
  }
};
