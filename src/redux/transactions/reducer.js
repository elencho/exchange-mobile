import { actionTypes } from './actions';
import { currencyList } from '../../constants/filters';

const INITIAL_STATE = {
  currency: 'Show All Currency',
  currencyModal: false,
  currencies: currencyList,
};

export default (state = INITIAL_STATE, action) => {
  const { currency, currencyModal, currencies } = action;
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
    default:
      return state;
  }
};
