import { actionTypes } from './actions';

const INITIAL_STATE = {
  datePickerVisible: { to: false, from: false },
  chooseCurrencyModalVisible: false,
  transactionDetailsVisible: false,
  buySellModalVisible: false,
  infoVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  const {
    datePickerVisible,
    chooseCurrencyModalVisible,
    buySellModalVisible,
    transactionDetailsVisible,
    infoVisible,
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
    case actionTypes.BUY_SELL_MODAL_VISIBLE:
      return {
        ...state,
        buySellModalVisible,
      };
    case actionTypes.INSTANT_TRADE_INFO:
      return {
        ...state,
        infoVisible,
      };
    default:
      return state;
  }
};
