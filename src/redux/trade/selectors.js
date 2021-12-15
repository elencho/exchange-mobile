export const getParams = (state) => {
  const {
    trade: { pairId, offset, limit },
  } = state;

  return { pairId, offset, limit };
};

export const getTrades = (state) => state.trade.trades;
