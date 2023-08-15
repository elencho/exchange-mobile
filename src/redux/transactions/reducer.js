import { actionTypes } from './actions';

const INITIAL_STATE = {
  tabRoute: null,
  stackRoute: null,
  tabNavigationRef: {},
  totalTransactions: null,
  transactions: [],
  currencies: [],
  currenciesConstant: [],
  currentTransaction: {},
  currency: 'Show All Currency',
  activeTab: 'Transfer',

  loading: false,

  // Query Params
  code: null,
  limit: 25,
  method: null,
  status: null,
  offset: 0,
  fromDateTime: null,
  toDateTime: null,
  typeFilter: null,
  txIdOrRecipient: null,
};

export default (state = INITIAL_STATE, action) => {
  const {
    currency,
    currencies,
    transactions,
    currentTransaction,
    typeFilter,
    status,
    method,
    code,
    toDateTime,
    fromDateTime,
    loading,
    offset,
    tabRoute,
    stackRoute,
    currenciesConstant,
    tabNavigationRef,
    totalTransactions,
    activeTab,
    txIdOrRecipient,
  } = action;
  switch (action.type) {
    case 'SET_TAB_NAVIGATION_REF':
      return {
        ...state,
        tabNavigationRef,
      };
    case actionTypes.SAVE_TRANSACTIONS:
      return {
        ...state,
        transactions,
      };
    case actionTypes.SAVE_CURRENCIES:
      return {
        ...state,
        currencies,
      };
    case actionTypes.SAVE_CURRENCIES_CONSTANT:
      return {
        ...state,
        currenciesConstant,
      };
    case actionTypes.CHOOSE_CURRENCY:
      return {
        ...state,
        currency,
      };
    case actionTypes.SET_ABBR:
      return {
        ...state,
        code,
      };
    case actionTypes.FILTER_CURRENCIES:
      return {
        ...state,
        currencies,
      };
    case actionTypes.SET_CURRENT_TRANSACTION:
      return {
        ...state,
        currentTransaction,
      };
    case actionTypes.SET_TYPE_FILTER:
      return {
        ...state,
        typeFilter,
      };
    case actionTypes.SET_METHOD_FILTER:
      return {
        ...state,
        method,
      };
    case actionTypes.SET_STATUS_FILTER:
      return {
        ...state,
        status,
      };
    case actionTypes.SET_FROM_TIME:
      return {
        ...state,
        fromDateTime,
      };
    case actionTypes.SET_TO_TIME:
      return {
        ...state,
        toDateTime,
      };
    case actionTypes.INCREASE_OFFSET:
      return {
        ...state,
        offset,
      };
    case actionTypes.SET_TOTAL_TRANSACTIONS:
      return {
        ...state,
        totalTransactions,
      };
    case actionTypes.TOGGLE_LOADING:
      return {
        ...state,
        loading,
      };
    case actionTypes.SET_TAB_ROUTE_NAME:
      return {
        ...state,
        tabRoute,
      };
    case actionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab,
      };
    case actionTypes.SET_TX_ID_OR_RECIPIENT:
      return {
        ...state,
        txIdOrRecipient,
      };
    case 'SET_STACK_NAVIGATION_ROUTE':
      return {
        ...state,
        stackRoute,
      };
    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        typeFilter: null,
        method: null,
        status: null,
        currency: 'Show All Currency',
        code: null,
        fromDateTime: null,
        toDateTime: null,
        txIdOrRecipient: null,
      };
    case actionTypes.RESET_TRANSACTIONS_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
