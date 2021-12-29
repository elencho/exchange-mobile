import { actionTypes } from './actions';

const INITIAL_STATE = {
  trades: [],
  offers: { USD: [], GEL: [] },
  pairObject: null,
  currentTrade: { price: null, size: null },
  hideOtherPairs: false,

  fiat: 'USD',
  crypto: 'BTC',
  tradeType: 'Buy',
  Balance_Card: 'balance',
  bank: null,
  card: null,
  balance: null,

  tradesLoading: false,
  offersLoading: false,

  // Query Params
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
    crypto,
    fiat,
    hideOtherPairs,
    balance,
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
    case actionTypes.SET_CRYPTO:
      return {
        ...state,
        crypto,
      };
    case actionTypes.SET_FIAT:
      return {
        ...state,
        fiat,
      };
    case actionTypes.SET_BALANCE:
      return {
        ...state,
        balance,
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
    case actionTypes.HIDE_OTHER_PAIRS:
      return {
        ...state,
        hideOtherPairs,
      };
    default:
      return state;
  }
};
