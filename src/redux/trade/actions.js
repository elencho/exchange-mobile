export const actionTypes = {
  SAVE_TRADES: 'SAVE_TRADES',
  SAVE_OFFERS: 'SAVE_OFFERS',
  HIDE_OTHER_PAIRS: 'HIDE_OTHER_PAIRS',
  SET_PAIR_OBJECT: 'SET_PAIR_OBJECT',
  SET_TRADE_OFFSET: 'SET_TRADE_OFFSET',
  SET_CURRENT_TRADE: 'SET_CURRENT_TRADE',
  SET_TRADE_TYPE: 'SET_TRADE_TYPE',
  SWITCH_BALANCE_CARD: 'SWITCH_BALANCE_CARD',
  SET_CARD: 'SET_CARD',
  SET_CRYPTO: 'SET_CRYPTO',
  SET_FIAT: 'SET_FIAT',
  SET_BALANCE: 'SET_BALANCE',
  SET_FEE: 'SET_FEE',
  SAVE_CARDS: 'SAVE_CARDS',
  SET_DEPOSIT_PROVIDER: 'SET_DEPOSIT_PROVIDER',
  SET_DEPOSIT_PROVIDERS: 'SET_DEPOSIT_PROVIDERS',
  SET_CURRENT_BALANCE_OBJ: 'SET_CURRENT_BALANCE_OBJ',
  SET_FIATS_ARRAY: 'SET_FIATS_ARRAY',
  SET_CRYPTOS_ARRAY: 'SET_CRYPTOS_ARRAY',
  SET_CRYPTOS_ARRAY_CONSTANT: 'SET_CRYPTOS_ARRAY_CONSTANT',
  MORE_TRADES_LOADING: 'MORE_TRADES_LOADING',
  SET_TOTAL_TRADES: 'SET_TOTAL_TRADES',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',
  SET_TRADES_LOADING: 'SET_TRADES_LOADING',
  SET_OFFERS_LOADING: 'SET_OFFERS_LOADING',

  // FOR SAGAS
  FETCH_TRADES: 'FETCH_TRADES',
  INSTANT_TRADE_TAB_SAGA: 'INSTANT_TRADE_TAB_SAGA',
  PAIR_OBJECT_SAGA: 'PAIR_OBJECT_SAGA',
  DEPOSIT_PROVIDERS_SAGA: 'DEPOSIT_PROVIDERS_SAGA',
  CARDS_SAGA: 'CARDS_SAGA',
  FETCH_FEE: 'FETCH_FEE',
  SUBMIT_TRADE: 'SUBMIT_TRADE',

  RESET_TRADES_STATE: 'RESET_TRADES_STATE',
};

export const saveTrades = (trades) => ({
  type: actionTypes.SAVE_TRADES,
  trades,
});
export const setTotalTrades = (totalTrades) => ({
  type: actionTypes.SET_TOTAL_TRADES,
  totalTrades,
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
export const setTradeOffset = (offset) => ({
  type: actionTypes.SET_TRADE_OFFSET,
  offset,
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
export const setFee = (fee) => ({
  type: actionTypes.SET_FEE,
  fee,
});
export const hideOtherPairsAction = (hideOtherPairs) => ({
  type: actionTypes.HIDE_OTHER_PAIRS,
  hideOtherPairs,
});
export const setTradesLoading = (tradesLoading) => ({
  type: actionTypes.SET_TRADES_LOADING,
  tradesLoading,
});
export const setMoreTradesLoading = (moreTradesLoading) => ({
  type: actionTypes.MORE_TRADES_LOADING,
  moreTradesLoading,
});
export const setOffersLoading = (offersLoading) => ({
  type: actionTypes.SET_OFFERS_LOADING,
  offersLoading,
});
export const setCurrentBalanceObj = (currentBalanceObj) => ({
  type: actionTypes.SET_CURRENT_BALANCE_OBJ,
  currentBalanceObj,
});
export const setFiatsArray = (fiatsArray) => ({
  type: actionTypes.SET_FIATS_ARRAY,
  fiatsArray,
});
export const setCryptosArray = (cryptosArray) => ({
  type: actionTypes.SET_CRYPTOS_ARRAY,
  cryptosArray,
});
export const setCryptosArrayConstant = (cryptosArrayConstant) => ({
  type: actionTypes.SET_CRYPTOS_ARRAY_CONSTANT,
  cryptosArrayConstant,
});

// FOR SAGAS
export const fetchTrades = (isMoreLoading) => ({
  type: actionTypes.FETCH_TRADES,
  isMoreLoading,
});
export const instantTradeTabAction = () => ({
  type: actionTypes.INSTANT_TRADE_TAB_SAGA,
});
export const pairObjectSagaAction = (offers) => ({
  type: actionTypes.PAIR_OBJECT_SAGA,
  offers,
});
export const depositProvidersSagaAction = () => ({
  type: actionTypes.DEPOSIT_PROVIDERS_SAGA,
});
export const cardsSagaAction = () => ({
  type: actionTypes.CARDS_SAGA,
});
export const fetchFee = (feeType) => ({
  type: actionTypes.FETCH_FEE,
  feeType,
});
export const submitTrade = () => ({
  type: actionTypes.SUBMIT_TRADE,
});

export const resetTradesState = () => ({
  type: actionTypes.RESET_TRADES_STATE,
});
