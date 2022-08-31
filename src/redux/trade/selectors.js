export const getParams = (state) => {
  const {
    trade: { crypto, fiat, offset, limit, hideOtherPairs },
  } = state;

  return {
    pairId: hideOtherPairs ? `${crypto}-${fiat}` : null,
    offset: 0,
    limit: offset ? limit * (offset + 1) : limit,
  };
};

export const paramsForFee = (state) => {
  const {
    trade: {
      fiat,
      currentTrade: { price },
      depositProvider,
      card,
    },
  } = state;

  return {
    currency: fiat,
    method: 'ECOMMERCE',
    type: 'DEPOSIT',
    provider: depositProvider,
    cardId: card.id,
    amount: price,
  };
};

export const withdrawalFeeParams = (state) => {
  const {
    transactions: { code },
    wallet: { network, withdrawalAmount },
  } = state;

  return {
    currency: code,
    method: 'WIRE',
    type: 'WITHDRAWAL',
    provider: network,
    amount: withdrawalAmount,
  };
};

export const getCardParams = (state) => {
  const {
    trade: { fiat },
    transactions: { code, tabRouteName },
  } = state;

  return {
    currency: tabRouteName === 'Trade' ? fiat : code,
    // provider: depositProvider,
    // status: 'VERIFIED',
    // transactionType: 'DEPOSIT',
  };
};

export const paramsForTrade = (state) => {
  const {
    trade: {
      currentTrade: { price, size },
      crypto,
      fiat,
      tradeType,
      card,
      Balance_Card,
    },
  } = state;

  return Balance_Card === 'card'
    ? {
        pairCode: `${crypto}-${fiat}`,
        action: tradeType === 'Buy' ? 'BID' : 'ASK',
        amount: tradeType === 'Buy' ? price : size,
        cardTransactionRequest: {
          currency: fiat,
          cardId: card.id,
          amount: price,
          redirectUri: `https://ge.cryptal.com/ex/instant-trade/${crypto}-${fiat}`,
        },
      }
    : {
        pairCode: `${crypto}-${fiat}`,
        action: tradeType === 'Buy' ? 'BID' : 'ASK',
        amount: tradeType === 'Buy' ? price : size,
      };
};
