import { actionTypes } from './actions';
import { currencyList } from '../../constants/filters';

const INITIAL_STATE = {
  transactions: [],
  currencyModal: false,
  transactionModal: false,
  currencies: currencyList,
  currentTransaction: {},
  currency: null,

  // Query Params
  abbr: null,
  fromDateTime: null,
  limit: 25,
  method: ['All'],
  offset: 0,
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
    default:
      return state;
  }
};
