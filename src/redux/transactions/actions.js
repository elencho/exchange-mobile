export const actionTypes = {
  SAVE_TRANSACTIONS: 'SAVE_TRANSACTIONS',
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  SAVE_CURRENCIES_CONSTANT: 'SAVE_CURRENCIES_CONSTANT',
  CHOOSE_CURRENCY: 'CHOOSE_CURRENCY',
  FILTER_CURRENCIES: 'FILTER_CURRENCIES',
  SET_CURRENT_TRANSACTION: 'SET_CURRENT_TRANSACTION',
  SET_TYPE_FILTER: 'SET_TYPE_FILTER',
  SET_METHOD_FILTER: 'SET_METHOD_FILTER',
  SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  SET_FROM_TIME: 'SET_FROM_TIME',
  SET_TO_TIME: 'SET_TO_TIME',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  INCREASE_OFFSET: 'INCREASE_OFFSET',
  SET_TAB_ROUTE_NAME: 'SET_TAB_ROUTE_NAME',
  SET_TOTAL_TRANSACTIONS: 'SET_TOTAL_TRANSACTIONS',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  // PURE VISUALS
  TOGGLE_LOADING: 'TOGGLE_LOADING',

  // FOR SAGAS
  FETCH_TRANSACTIONS: 'FETCH_TRANSACTIONS',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  TYPE_SAGA_ACTION: 'TYPE_SAGA_ACTION',
  STATUS_SAGA_ACTION: 'STATUS_SAGA_ACTION',
  CURRENCY_SAGA_ACTION: 'CURRENCY_SAGA_ACTION',
  SET_ABBR: 'SET_ABBR',
  SHOW_RESULTS: 'SHOW_RESULTS',
  REACH_SCROLL_END: 'REACH_SCROLL_END',
  FILTER_SAGA_ACTION: 'FILTER_SAGA_ACTION',
  TRANSACTION_DETAILS_SAGA: 'TRANSACTION_DETAILS_SAGA',

  RESET_TRANSACTIONS_STATE: 'RESET_TRANSACTIONS_STATE',
};

export const saveTransactions = (transactions) => ({
  type: actionTypes.SAVE_TRANSACTIONS,
  transactions,
});
export const saveCurrencies = (currencies) => ({
  type: actionTypes.SAVE_CURRENCIES,
  currencies,
});
export const saveCurrenciesConstant = (currenciesConstant) => ({
  type: actionTypes.SAVE_CURRENCIES_CONSTANT,
  currenciesConstant,
});
export const chooseCurrency = (currency) => ({
  type: actionTypes.CHOOSE_CURRENCY,
  currency,
});
export const filterCurrencies = (currencies) => ({
  type: actionTypes.FILTER_CURRENCIES,
  currencies,
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
export const setStatusFilter = (status) => ({
  type: actionTypes.SET_STATUS_FILTER,
  status,
});
export const setFromTime = (fromDateTime) => ({
  type: actionTypes.SET_FROM_TIME,
  fromDateTime,
});
export const setToTime = (toDateTime) => ({
  type: actionTypes.SET_TO_TIME,
  toDateTime,
});
export const clearFilters = () => ({
  type: actionTypes.CLEAR_FILTERS,
});
export const toggleLoading = (loading) => ({
  type: actionTypes.TOGGLE_LOADING,
  loading,
});
export const setTransactionsOffset = (offset) => ({
  type: actionTypes.INCREASE_OFFSET,
  offset,
});
export const setTotalTransactions = (totalTransactions) => ({
  type: actionTypes.SET_TOTAL_TRANSACTIONS,
  totalTransactions,
});
export const setTabRouteName = (tabRoute) => ({
  type: actionTypes.SET_TAB_ROUTE_NAME,
  tabRoute,
});
export const setActiveTab = (activeTab) => ({
  type: actionTypes.SET_ACTIVE_TAB,
  activeTab,
});

// FOR SAGAS
export const fetchTransactions = (isMoreLoading) => ({
  type: actionTypes.FETCH_TRANSACTIONS,
  isMoreLoading,
});
export const fetchCurrencies = () => ({
  type: actionTypes.FETCH_CURRENCIES,
});
export const typeAction = (filter) => ({
  type: actionTypes.TYPE_SAGA_ACTION,
  filter,
});
export const statusAction = (status) => ({
  type: actionTypes.STATUS_SAGA_ACTION,
  status,
});
export const currencyAction = (name, currencyList, code) => ({
  type: actionTypes.CURRENCY_SAGA_ACTION,
  name,
  currencyList,
  code,
});
export const setAbbr = (code) => ({
  type: actionTypes.SET_ABBR,
  code,
});
export const transactionDetailsSaga = (currentTransaction) => ({
  type: actionTypes.TRANSACTION_DETAILS_SAGA,
  currentTransaction,
});
export const showResultsAction = (navigation) => ({
  type: actionTypes.SHOW_RESULTS,
  navigation,
});
export const reachScrollEnd = (transactionType) => ({
  type: actionTypes.REACH_SCROLL_END,
  transactionType,
});
export const filterAction = (filter, filterType) => ({
  type: actionTypes.FILTER_SAGA_ACTION,
  filter,
  filterType,
});

export const resetTransactionsState = () => ({
  type: actionTypes.RESET_TRANSACTIONS_STATE,
});
