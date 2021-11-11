import { actionTypes } from './actions';

const INITIAL_STATE = {
  currency: 'Show All Currency',
  currencyModal: false,
};

export default (state = INITIAL_STATE, action) => {
  const { currency, currencyModal } = action;
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
    default:
      return state;
  }
};
