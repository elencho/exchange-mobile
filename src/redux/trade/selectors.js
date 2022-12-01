export const getParams = (state) => {
  const {
    trade: { crypto, fiat, offset, limit, hideOtherPairs },
  } = state;

  return {
    pairId: hideOtherPairs ? `${crypto}-${fiat}` : null,
    offset,
    limit,
  };
};

export const depositFeeParams = (state) => {
  const {
    trade: {
      fiat,
      currentTrade: { price },
      depositProvider,
      card,
      currentBalanceObj,
    },
    transactions: { code, tabRoute },
    wallet: { depositAmount, network },
  } = state;

  const instantTrade = tabRoute === 'Trade';
  const eCommerce = network === 'ECOMMERCE';
  const crypto = currentBalanceObj?.type === 'CRYPTO';

  const method = () => {
    if (!instantTrade) {
      if (crypto) return 'WALLET';
      if (!crypto && !eCommerce) return 'WIRE';
    }
    return 'ECOMMERCE';
  };

  return {
    currency: instantTrade ? fiat : code,
    method: method(),
    type: 'DEPOSIT',
    provider: instantTrade || eCommerce ? depositProvider : network,
    cardId: instantTrade || eCommerce ? card?.id : null,
    amount: instantTrade ? price : depositAmount,
  };
};

export const withdrawalFeeParams = (state) => {
  const {
    transactions: { code, tabRoute },
    trade: {
      currentBalanceObj,
      depositProvider,
      card,
      fiat,
      currentTrade: { price },
    },
    wallet: { network, withdrawalAmount },
  } = state;

  const instantTrade = tabRoute === 'Trade';
  const eCommerce = network === 'ECOMMERCE';
  const crypto = currentBalanceObj?.type === 'CRYPTO';

  const method = () => {
    if (!instantTrade) {
      if (crypto) return 'WALLET';
      if (!crypto && !eCommerce) return 'WIRE';
    }
    return 'ECOMMERCE';
  };

  return {
    currency: instantTrade ? fiat : code,
    method: method(),
    type: 'WITHDRAWAL',
    provider: instantTrade || eCommerce ? depositProvider : network,
    cardId: instantTrade || eCommerce ? card?.id : null,
    amount: instantTrade ? price : withdrawalAmount,
  };
};

export const getCardParams = (state) => {
  const {
    trade: { fiat },
    transactions: { code, tabRoute },
    wallet: { walletTab },
  } = state;

  const currency = code ?? 'GEL';
  const status = walletTab !== 'Manage Cards' ? 'VERIFIED' : null;
  const transactionType =
    walletTab === 'Manage Cards' ? null : walletTab.toUpperCase();

  return {
    currency: tabRoute === 'Trade' ? fiat : currency,
    // provider: depositProvider,
    status,
    transactionType,
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
