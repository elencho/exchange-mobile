import { actionTypes } from './actions';

const INITIAL_STATE = {
  tabRouteName: null,
  tabNavigationRef: {},

  transactions: [],
  currencies: [],
  currenciesConstant: [],
  currentTransaction: {},
  currency: 'Show All Currency',

  loading: false,

  // Query Params
  code: null,
  limit: 25,
  method: ['All'],
  offset: 0,
  fromDateTime: null,
  toDateTime: null,
  typeFilter: null,
};

export default (state = INITIAL_STATE, action) => {
  const {
    currency,
    currencies,
    transactions,
    currentTransaction,
    typeFilter,
    method,
    code,
    toDateTime,
    fromDateTime,
    loading,
    offset,
    tabRouteName,
    currenciesConstant,
    tabNavigationRef,
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
    case actionTypes.TOGGLE_LOADING:
      return {
        ...state,
        loading,
      };
    case actionTypes.SET_TAB_ROUTE_NAME:
      return {
        ...state,
        tabRouteName,
      };
    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        typeFilter: null,
        method: ['All'],
        currency: 'Show All Currency',
        code: null,
        fromDateTime: null,
        toDateTime: null,
      };
    case actionTypes.RESET_TRANSACTIONS_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
