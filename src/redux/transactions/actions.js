export const actionTypes = {
  SAVE_TRANSACTIONS: 'SAVE_TRANSACTIONS',
  CHOOSE_CURRENCY: 'CHOOSE_CURRENCY',
  FILTER_CURRENCIES: 'FILTER_CURRENCIES',
  SET_CURRENT_TRANSACTION: 'SET_CURRENT_TRANSACTION',
  SET_TYPE_FILTER: 'SET_TYPE_FILTER',
  SET_METHOD_FILTER: 'SET_METHOD_FILTER',
  SET_FROM_TIME: 'SET_FROM_TIME',
  SET_TO_TIME: 'SET_TO_TIME',
  CLEAR_FILTERS: 'CLEAR_FILTERS',

  // PURE VISUALS
  TOGGLE_TRANSACTION_MODAL: 'TOGGLE_TRANSACTION_MODAL',
  TOGGLE_CURRENCY_MODAL: 'TOGGLE_CURRENCY_MODAL',
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',
  TRANSPRENT_BACKGROUND: 'TRANSPRENT_BACKGROUND',
  TOGGLE_LOADING: 'TOGGLE_LOADING',

  // FOR SAGAS
  FETCH_TRANSACTIONS: 'FETCH_TRANSACTIONS',
  TYPE_SAGA_ACTION: 'TYPE_SAGA_ACTION',
  CURRENCY_SAGA_ACTION: 'CURRENCY_SAGA_ACTION',
  SET_ABBR: 'SET_ABBR',
  MODAL_TOP_SAGA: 'MODAL_TOP_SAGA',
  SHOW_RESULTS: 'SHOW_RESULTS',
};

export const saveTransactions = (transactions) => ({
  type: actionTypes.SAVE_TRANSACTIONS,
  transactions,
});
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
export const setCurrentTransaction = (currentTransaction) => ({
  type: actionTypes.SET_CURRENT_TRANSACTION,
  currentTransaction,
});
export const setTypeFilter = (typeFilter) => ({
  type: actionTypes.SET_TYPE_FILTER,
  typeFilter,
});
export const setMethodFilter = (method) => ({
  type: actionTypes.SET_METHOD_FILTER,
  method,
});
export const setFromTime = (fromDateTime) => ({
  type: actionTypes.SET_FROM_TIME,
  fromDateTime,
});
export const setToTime = (toDateTime) => ({
  type: actionTypes.SET_TO_TIME,
  toDateTime,
});
export const toggleDatePicker = (datePickerVisible) => ({
  type: actionTypes.TOGGLE_DATEPICKER,
  datePickerVisible,
});
export const toggleLoading = (loading) => ({
  type: actionTypes.TOGGLE_LOADING,
  loading,
});
export const setTransparentBackground = (transparentBackground) => ({
  type: actionTypes.TRANSPRENT_BACKGROUND,
  transparentBackground,
});

// FOR SAGAS
export const fetchTransactions = () => ({
  type: actionTypes.FETCH_TRANSACTIONS,
});
export const typeAction = (filter) => ({
  type: actionTypes.TYPE_SAGA_ACTION,
  filter,
});
export const currencyAction = (name, currencyList, abbr) => ({
  type: actionTypes.CURRENCY_SAGA_ACTION,
  name,
  currencyList,
  abbr,
});
export const setAbbr = (abbr) => ({
  type: actionTypes.SET_ABBR,
  abbr,
});
export const modalTopAction = () => ({
  type: actionTypes.MODAL_TOP_SAGA,
});
export const showResultsAction = (navigation) => ({
  type: actionTypes.SHOW_RESULTS,
  navigation,
});
