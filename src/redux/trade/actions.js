export const actionTypes = {
  SET_TRADE_TYPE: 'SET_TRADE_TYPE',
  SWITCH_BALANCE_CARD: 'SWITCH_BALANCE_CARD',
  SET_BANK: 'SET_BANK',
  SET_CARD: 'SET_CARD',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // FOR SAGAS
  FETCH_TRANSACTIONS: 'FETCH_TRANSACTIONS',
};

export const setTradeType = (tradeType) => ({
  type: actionTypes.SET_TRADE_TYPE,
  tradeType,
});
export const switchBalanceCard = (Balance_Card) => ({
  type: actionTypes.SWITCH_BALANCE_CARD,
  Balance_Card,
});
export const setCard = (card) => ({
  type: actionTypes.SET_CARD,
  card,
});
export const setBank = (bank) => ({
  type: actionTypes.SET_BANK,
  bank,
});

// FOR SAGAS
export const fetchTransactions = () => ({
  type: actionTypes.FETCH_TRANSACTIONS,
});
