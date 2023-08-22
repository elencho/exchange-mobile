import { actionTypes } from './actions';

const INITIAL_STATE = {
  trades: [],
  offers: { USD: [], GEL: [] },
  pairObject: {},
  currentTrade: { price: '', size: '' },
  hideOtherPairs: false,
  fiat: 'GEL',
  crypto: 'BTC',
  fiatsArray: [],

  tradeType: 'Buy',
  Balance_Card: 'balance',
  balanceLoading: false,
  balance: {},
  currentBalanceObj: {},
  card: null,
  cards: [],
  cardsToDisplayInModal: [],
  cardsLoading: false,
  fee: null,
  depositProvider: null,
  depositProviders: null,
  cryptosArray: [],
  cryptosArrayConstant: [],

  totalTrades: null,
  tradesLoading: false,
  isTradesButtonLoading: false,
  moreTradesLoading: false,
  offersLoading: false,
  previousTradeFilter: {},

  // Query Params
  offset: 0,
  limit: 50,
  fromDateTimeQuery: null,
  toDateTimeQuery: null,
  statusQuery: [],
  actionQuery: [],
  cryptoCodeQuery: '',
  fiatCodesQuery: [],
};

export default (state = INITIAL_STATE, action) => {
  const {
    tradeType,
    Balance_Card,
    card,
    trades,
    currentBalanceObj,
    offers,
    isTradesButtonLoading,
    tradesLoading,
    offersLoading,
    offset,
    pairObject,
    currentTrade,
    crypto,
    fiat,
    hideOtherPairs,
    balance,
    balanceLoading,
    cards,
    cardsToDisplayInModal,
    cardsLoading,
    fee,
    depositProvider,
    depositProviders,
    fiatsArray,
    cryptosArray,
    totalTrades,
    cryptosArrayConstant,
    moreTradesLoading,
    actionQuery,
    statusQuery,
    fromDateTimeQuery,
    toDateTimeQuery,
    fiatCodesQuery,
    cryptoCodeQuery,
    previousTradeFilter,
  } = action;
  switch (action.type) {
    case actionTypes.SAVE_TRADES:
      return {
        ...state,
        trades,
      };
    case actionTypes.SET_TOTAL_TRADES:
      return {
        ...state,
        totalTrades,
      };
    case actionTypes.MORE_TRADES_LOADING:
      return {
        ...state,
        moreTradesLoading,
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
    case 'SET_CARDS_TO_DISPLAY_IN_MODAL':
      return {
        ...state,
        cardsToDisplayInModal,
      };
    case 'TOGGLE_CARDS_LOADING':
      return {
        ...state,
        cardsLoading,
      };
    case 'TOGGLE_BALANCE_LOADING':
      return {
        ...state,
        balanceLoading,
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
    case actionTypes.SET_TRADES_BUTTON_LOADING:
      return {
        ...state,
        isTradesButtonLoading,
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
    case actionTypes.SET_TRADE_ACTION_QUERY:
      return {
        ...state,
        actionQuery,
      };
    case actionTypes.SET_CRYPTO_CODE_QUERY:
      return {
        ...state,
        cryptoCodeQuery,
      };
    case actionTypes.SET_FIAT_CODES_QUERY:
      return {
        ...state,
        fiatCodesQuery,
      };
    case actionTypes.SET_STATUS_QUERY:
      return {
        ...state,
        statusQuery,
      };
    case actionTypes.SET_FROM_DATE_QUERY:
      return {
        ...state,
        fromDateTimeQuery,
      };
    case actionTypes.SET_TO_DATE_QUERY:
      return {
        ...state,
        toDateTimeQuery,
      };
    case actionTypes.SET_PREV_TRADE_FILTER:
      const prevState = JSON.parse(previousTradeFilter);
      return {
        ...state,
        ...prevState,
      };
    case actionTypes.CLEAR_FILTERS_TRADE:
      return {
        ...state,
        fromDateTimeQuery: null,
        toDateTimeQuery: null,
        statusQuery: [],
        actionQuery: [],
        cryptoCodeQuery: '',
        fiatCodesQuery: [],
      };

    default:
      return state;
  }
};
