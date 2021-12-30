export const actionTypes = {
  SAVE_TRADES: 'SAVE_TRADES',
  SAVE_OFFERS: 'SAVE_OFFERS',
  HIDE_OTHER_PAIRS: 'HIDE_OTHER_PAIRS',
  SET_PAIR_OBJECT: 'SET_PAIR_OBJECT',
  SET_CURRENT_TRADE: 'SET_CURRENT_TRADE',
  SET_TRADE_TYPE: 'SET_TRADE_TYPE',
  SWITCH_BALANCE_CARD: 'SWITCH_BALANCE_CARD',
  SET_CARD: 'SET_CARD',
  SET_CRYPTO: 'SET_CRYPTO',
  SET_FIAT: 'SET_FIAT',
  SET_BALANCE: 'SET_BALANCE',
  SAVE_CARDS: 'SAVE_CARDS',
  SET_DEPOSIT_PROVIDER: 'SET_DEPOSIT_PROVIDER',
  SET_DEPOSIT_PROVIDERS: 'SET_DEPOSIT_PROVIDERS',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',
  SET_TRADES_LOADING: 'SET_TRADES_LOADING',
  SET_OFFERS_LOADING: 'SET_OFFERS_LOADING',

  // FOR SAGAS
  FETCH_TRADES: 'FETCH_TRADES',
  FETCH_OFFERS: 'FETCH_OFFERS',
  SUBMIT_TRADE: 'SUBMIT_TRADE',
};

export const saveTrades = (trades) => ({
  type: actionTypes.SAVE_TRADES,
  trades,
});
export const saveOffers = (offers) => ({
  type: actionTypes.SAVE_OFFERS,
  offers,
});
export const setTradeType = (tradeType) => ({
  type: actionTypes.SET_TRADE_TYPE,
  tradeType,
});
export const setCrypto = (crypto) => ({
  type: actionTypes.SET_CRYPTO,
  crypto,
});
export const setFiat = (fiat) => ({
  type: actionTypes.SET_FIAT,
  fiat,
});
export const setBalance = (balance) => ({
  type: actionTypes.SET_BALANCE,
  balance,
});
export const saveCards = (cards) => ({
  type: actionTypes.SAVE_CARDS,
  cards,
});
export const setDepositProvider = (depositProvider) => ({
  type: actionTypes.SET_DEPOSIT_PROVIDER,
  depositProvider,
});
export const setDepositProviders = (depositProviders) => ({
  type: actionTypes.SET_DEPOSIT_PROVIDERS,
  depositProviders,
});
export const setPairObject = (pairObject) => ({
  type: actionTypes.SET_PAIR_OBJECT,
  pairObject,
});
export const setCurrentTrade = (currentTrade) => ({
  type: actionTypes.SET_CURRENT_TRADE,
  currentTrade,
});
export const switchBalanceCard = (Balance_Card) => ({
  type: actionTypes.SWITCH_BALANCE_CARD,
  Balance_Card,
});
export const setCard = (card) => ({
  type: actionTypes.SET_CARD,
  card,
});
export const hideOtherPairsAction = (hideOtherPairs) => ({
  type: actionTypes.HIDE_OTHER_PAIRS,
  hideOtherPairs,
});
export const setTradesLoading = (tradesLoading) => ({
  type: actionTypes.SET_TRADES_LOADING,
  tradesLoading,
});
export const setOffersLoading = (offersLoading) => ({
  type: actionTypes.SET_OFFERS_LOADING,
  offersLoading,
});

// FOR SAGAS
export const fetchTrades = () => ({
  type: actionTypes.FETCH_TRADES,
});
export const fetchOffers = () => ({
  type: actionTypes.FETCH_OFFERS,
});
export const submitTrade = () => ({
  type: actionTypes.SUBMIT_TRADE,
});
