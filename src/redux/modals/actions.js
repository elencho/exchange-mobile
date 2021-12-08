export const actionTypes = {
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',
  CHOOSE_CURRENCY_MODAL_VISIBLE: 'CHOOSE_CURRENCY_MODAL_VISIBLE',
  TRANSACTION_DETAILS_MODAL: 'TRANSACTION_DETAILS_MODAL',
  BUY_SELL_MODAL_VISIBLE: 'BUY_SELL_MODAL_VISIBLE',
  INSTANT_TRADE_INFO: 'INSTANT_TRADE_INFO',
  CHOOSE_CARD_MODAL: 'CHOOSE_CARD_MODAL',
  CHOOSE_BANK_MODAL: 'CHOOSE_BANK_MODAL',
  BANK_FEES_MODAL: 'BANK_FEES_MODAL',
};

export const toggleDatePicker = (datePickerVisible) => ({
  type: actionTypes.TOGGLE_DATEPICKER,
  datePickerVisible,
});
export const toggleCurrencyModal = (chooseCurrencyModalVisible) => ({
  type: actionTypes.CHOOSE_CURRENCY_MODAL_VISIBLE,
  chooseCurrencyModalVisible,
});
export const toggleTransactionDetails = (transactionDetailsVisible) => ({
  type: actionTypes.TRANSACTION_DETAILS_MODAL,
  transactionDetailsVisible,
});
export const toggleBuySellModal = (buySellModalVisible) => ({
  type: actionTypes.BUY_SELL_MODAL_VISIBLE,
  buySellModalVisible,
});
export const toggleInfoModal = (infoVisible) => ({
  type: actionTypes.INSTANT_TRADE_INFO,
  infoVisible,
});
export const toggleChooseCardModal = (chooseCardModalVisible) => ({
  type: actionTypes.CHOOSE_CARD_MODAL,
  chooseCardModalVisible,
});
export const toggleChooseBankModal = (chooseBankModalVisible) => ({
  type: actionTypes.CHOOSE_BANK_MODAL,
  chooseBankModalVisible,
});
export const toggleBankFeesModal = (bankFeesModalVisible) => ({
  type: actionTypes.BANK_FEES_MODAL,
  bankFeesModalVisible,
});