export const actionTypes = {
  SAVE_TRADES: 'SAVE_TRADES',
  SET_TRADE_TYPE: 'SET_TRADE_TYPE',
  SWITCH_BALANCE_CARD: 'SWITCH_BALANCE_CARD',
  SET_BANK: 'SET_BANK',
  SET_CARD: 'SET_CARD',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // FOR SAGAS
  FETCH_TRADES: 'FETCH_TRADES',
};

export const saveTrades = (trades) => ({
  type: actionTypes.SAVE_TRADES,
  trades,
});
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
export const fetchTrades = () => ({
  type: actionTypes.FETCH_TRADES,
});
