import { actionTypes } from './actions';
import { currencyList } from '../../constants/filters';

const INITIAL_STATE = {
  transactions: [],
  currencyModal: false,
  transactionModal: false,
  currencies: currencyList,
  currentTransaction: {},

  // Query Params
  currency: null,
  fromDateTime: null,
  limit: 3,
  method: [],
  offset: 0,
  toDateTime: null,
  type: null,
};

export default (state = INITIAL_STATE, action) => {
  const {
    currency,
    currencyModal,
    currencies,
    transactionModal,
    transactions,
    currentTransaction,
    type,
    method,
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
        type,
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
