export const getParams = (state) => {
  const {
    trade: { crypto, fiat, offset, limit, hideOtherPairs },
  } = state;

  return { pairId: hideOtherPairs ? `${crypto}-${fiat}` : null, offset, limit };
};

export const getCardParams = (state) => {
  const {
    trade: { fiat, depositProvider, bank },
  } = state;
  console.log(bank); //////

  return {
    currency: fiat,
    status: 'VERIFIED',
    provider: depositProvider,
    transactionType: 'DEPOSIT',
  };
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
