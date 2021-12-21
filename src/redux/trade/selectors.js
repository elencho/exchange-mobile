export const getParams = (state) => {
  const {
    trade: { crypto, fiat, offset, limit },
  } = state;

  return { pairId: `${crypto}-${fiat}`, offset, limit };
};

export const paramsForTrade = (state) => {
  const {
    trade: {
      currentTrade: { price, size },
      crypto,
      fiat,
      tradeType,
    },
  } = state;

  return {
    pairCode: `${crypto}-${fiat}`,
    action: tradeType === 'Buy' ? 'BID' : 'ASK',
    amount: tradeType === 'Buy' ? price : size,
  };
};

export const getTrades = (state) => state.trade.trades;
