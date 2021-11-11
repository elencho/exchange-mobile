import { actionTypes } from './actions';
import { currencyList } from '../../constants/filters';

const INITIAL_STATE = {
  currency: 'Show All Currency',
  currencyModal: false,
  transactionModal: false,
  currencies: currencyList,
};

export default (state = INITIAL_STATE, action) => {
  const { currency, currencyModal, currencies, transactionModal } = action;
  // const { drawerRef } = state;
  switch (action.type) {
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
    default:
      return state;
  }
};
