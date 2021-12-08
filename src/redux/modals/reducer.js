import { actionTypes } from './actions';

const INITIAL_STATE = {
  datePickerVisible: { to: false, from: false },
  chooseCurrencyModalVisible: false,
  transactionDetailsVisible: false,
  buySellModalVisible: false,
  infoVisible: false,
  chooseCardModalVisible: false,
  chooseBankModalVisible: false,
  bankFeesModalVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  const {
    datePickerVisible,
    chooseCurrencyModalVisible,
    buySellModalVisible,
    transactionDetailsVisible,
    infoVisible,
    chooseCardModalVisible,
    chooseBankModalVisible,
    bankFeesModalVisible,
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
    case actionTypes.CHOOSE_CARD_MODAL:
      return {
        ...state,
        chooseCardModalVisible,
      };
    case actionTypes.CHOOSE_BANK_MODAL:
      return {
        ...state,
        chooseBankModalVisible,
      };
    case actionTypes.BANK_FEES_MODAL:
      return {
        ...state,
        bankFeesModalVisible,
      };
    default:
      return state;
  }
};
