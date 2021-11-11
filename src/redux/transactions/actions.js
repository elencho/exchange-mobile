export const actionTypes = {
  CHOOSE_CURRENCY: 'CHOOSE_CURRENCY',
  TOGGLE_CURRENCY_MODAL: 'TOGGLE_CURRENCY_MODAL',
};

export const chooseCurrency = (currency) => ({
  type: actionTypes.CHOOSE_CURRENCY,
  currency,
});
export const toggleCurrencyModal = (currencyModal) => ({
  type: actionTypes.TOGGLE_CURRENCY_MODAL,
  currencyModal,
});
