export const actionTypes = {
  SET_TRADE_TYPE: 'SET_TRADE_TYPE',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // FOR SAGAS
  FETCH_TRANSACTIONS: 'FETCH_TRANSACTIONS',
};

export const setTradeType = (tradeType) => ({
  type: actionTypes.SET_TRADE_TYPE,
  tradeType,
});

// FOR SAGAS
export const fetchTransactions = () => ({
  type: actionTypes.FETCH_TRANSACTIONS,
});
