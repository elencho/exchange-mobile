import { actionTypes } from './actions';

const INITIAL_STATE = {
  trades: [],
  offers: { USD: [], GEL: [] },
  pairObject: {},
  cardTradeData: {},
  currentTrade: { price: '', size: '' },
  hideOtherPairs: false,

  fiat: 'GEL',
  crypto: 'BTC',
  tradeType: 'Buy',
  Balance_Card: 'balance',
  balance: {},
  currentBalanceObj: {},
  card: null,
  cards: [],
  fee: null,
  depositProvider: null,
  depositProviders: null,
  fiatsArray: [],
  cryptosArray: [],
  cryptosArrayConstant: [],

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
    trades,
    currentBalanceObj,
    offers,
    tradesLoading,
    offersLoading,
    offset,
    pairObject,
    currentTrade,
    crypto,
    fiat,
    hideOtherPairs,
    balance,
    cards,
    fee,
    depositProvider,
    depositProviders,
    cardTradeData,
    fiatsArray,
    cryptosArray,
    cryptosArrayConstant,
  } = action;
  switch (action.type) {
    case actionTypes.SAVE_TRADES:
      return {
        ...state,
        trades,
      };
    case actionTypes.SAVE_CARD_TRADE_DATA:
      return {
        ...state,
        cardTradeData,
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
    case actionTypes.SET_TRADE_OFFSET:
      return {
        ...state,
        offset,
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
    case actionTypes.SAVE_CARDS:
      return {
        ...state,
        cards,
      };
    case actionTypes.SET_DEPOSIT_PROVIDER:
      return {
        ...state,
        depositProvider,
      };
    case actionTypes.SET_DEPOSIT_PROVIDERS:
      return {
        ...state,
        depositProviders,
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
    case actionTypes.SET_FEE:
      return {
        ...state,
        fee,
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
    case actionTypes.SET_CURRENT_BALANCE_OBJ:
      return {
        ...state,
        currentBalanceObj,
      };
    case actionTypes.SET_FIATS_ARRAY:
      return {
        ...state,
        fiatsArray,
      };
    case actionTypes.SET_CRYPTOS_ARRAY:
      return {
        ...state,
        cryptosArray,
      };
    case actionTypes.SET_CRYPTOS_ARRAY_CONSTANT:
      return {
        ...state,
        cryptosArrayConstant,
      };
    case actionTypes.RESET_TRADES_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
