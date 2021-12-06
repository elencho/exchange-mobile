import { actionTypes } from './actions';

const INITIAL_STATE = {
  datePickerVisible: { to: false, from: false },
  chooseCurrencyModalVisible: false,
  transactionDetailsVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  const {
    datePickerVisible,
    chooseCurrencyModalVisible,
    transactionDetailsVisible,
  } = action;
  switch (action.type) {
    case actionTypes.TOGGLE_DATEPICKER:
      return {
        ...state,
        datePickerVisible,
      };
    case actionTypes.CHOOSE_CURRENCY_MODAL_VISIBLE:
      return {
        ...state,
        chooseCurrencyModalVisible,
      };
    case actionTypes.TRANSACTION_DETAILS_MODAL:
      return {
        ...state,
        transactionDetailsVisible,
      };
    default:
      return state;
  }
};
