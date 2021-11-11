export const actionTypes = {
  CHOOSE_CURRENCY: 'CHOOSE_CURRENCY',
  TOGGLE_CURRENCY_MODAL: 'TOGGLE_CURRENCY_MODAL',
  FILTER_CURRENCIES: 'FILTER_CURRENCIES',
  TOGGLE_TRANSACTION_MODAL: 'TOGGLE_TRANSACTION_MODAL',
};

export const chooseCurrency = (currency) => ({
  type: actionTypes.CHOOSE_CURRENCY,
  currency,
});
export const toggleCurrencyModal = (currencyModal) => ({
  type: actionTypes.TOGGLE_CURRENCY_MODAL,
  currencyModal,
});
export const filterCurrencies = (currencies) => ({
  type: actionTypes.FILTER_CURRENCIES,
  currencies,
});
export const toggleTransactionModal = (transactionModal) => ({
  type: actionTypes.TOGGLE_TRANSACTION_MODAL,
  transactionModal,
});
