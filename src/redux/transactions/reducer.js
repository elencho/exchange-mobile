import { actionTypes } from './actions';
import { currencyList } from '../../constants/filters';

const INITIAL_STATE = {
  transactions: [],
  currencyModal: false,
  transactionModal: false,
  currencies: currencyList,
  currentTransaction: {},
  currency: null,

  datePickerVisible: { to: false, from: false },
  transparentBackground: false,

  // Query Params
  abbr: null,
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
    currencyModal,
    currencies,
    transactionModal,
    transactions,
    currentTransaction,
    typeFilter,
    method,
    abbr,
    toDateTime,
    fromDateTime,
    datePickerVisible,
    transparentBackground,
  } = action;
  // const { drawerRef } = state;
  switch (action.type) {
    case actionTypes.SAVE_TRANSACTIONS:
      return {
        ...state,
        transactions,
      };
    case actionTypes.CHOOSE_CURRENCY:
      return {
        ...state,
        currency,
      };
    case actionTypes.SET_ABBR:
      return {
        ...state,
        abbr,
      };
    case actionTypes.TOGGLE_CURRENCY_MODAL:
      return {
        ...state,
        currencyModal,
      };
    case actionTypes.FILTER_CURRENCIES:
      return {
        ...state,
        currencies,
      };
    case actionTypes.TOGGLE_TRANSACTION_MODAL:
      return {
        ...state,
        transactionModal,
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
    case actionTypes.TOGGLE_DATEPICKER:
      return {
        ...state,
        datePickerVisible,
      };
    case actionTypes.TRANSPRENT_BACKGROUND:
      return {
        ...state,
        transparentBackground,
      };
    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        typeFilter: null,
        method: ['All'],
        currency: null,
        abbrs: null,
        fromDateTime: null,
        toDateTime: null,
      };
    default:
      return state;
  }
};
