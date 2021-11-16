export const actionTypes = {
  SAVE_TRANSACTIONS: 'SAVE_TRANSACTIONS',
  CHOOSE_CURRENCY: 'CHOOSE_CURRENCY',
  TOGGLE_CURRENCY_MODAL: 'TOGGLE_CURRENCY_MODAL',
  FILTER_CURRENCIES: 'FILTER_CURRENCIES',
  TOGGLE_TRANSACTION_MODAL: 'TOGGLE_TRANSACTION_MODAL',
  SET_CURRENT_TRANSACTION: 'SET_CURRENT_TRANSACTION',
  SET_TYPE_FILTER: 'SET_TYPE_FILTER',
  SET_METHOD_FILTER: 'SET_METHOD_FILTER',

  // FOR SAGAS
  FETCH_TRANSACTIONS: 'FETCH_TRANSACTIONS',
  TYPE_SAGA_ACTION: 'TYPE_SAGA_ACTION',
  CURRENCY_SAGA_ACTION: 'CURRENCY_SAGA_ACTION',
  SET_ABBR: 'SET_ABBR',
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
