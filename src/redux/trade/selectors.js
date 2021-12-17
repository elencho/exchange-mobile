export const getParams = (state) => {
  const {
    trade: { pairId, offset, limit },
  } = state;

  return { pairId, offset, limit };
};

export const paramsForTrade = (state) => {
  const {
    trade: {
      currentTrade: { price, size },
      pairId,
      tradeType,
    },
  } = state;

  return {
    pairCode: pairId,
    action: tradeType === 'Buy' ? 'BID' : 'ASK',
    amount: tradeType === 'Buy' ? price : size,
  };
};

export const getTrades = (state) => state.trade.trades;
