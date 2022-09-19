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

export const depositFeeParams = (state) => {
  const {
    trade: {
      fiat,
      currentTrade: { price },
      depositProvider,
      card,
      currentBalanceObj,
    },
    transactions: { code },
    wallet: { walletTab, depositAmount, network },
  } = state;

  const instantTrade = walletTab === 'Trade';
  const eCommerce = network === 'ECOMMERCE';

  const method = () => {
    if (!instantTrade) {
      if (currentBalanceObj?.type === 'CRYPTO') {
        return 'WALLET';
      } else if (eCommerce) {
        return 'ECOMMERCE';
      } else {
        return 'WIRE';
      }
    } else {
      return 'ECOMMERCE';
    }
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
    transactions: { code },
    trade: { currentBalanceObj },
    wallet: { network, withdrawalAmount },
  } = state;

  const method = () => {
    if (currentBalanceObj?.type === 'CRYPTO') {
      return 'WALLET';
    } else {
      return 'WIRE';
    }
  };

  return {
    currency: code,
    method: method(),
    type: 'WITHDRAWAL',
    provider: network,
    amount: withdrawalAmount,
  };
};

export const getCardParams = (state) => {
  const {
    trade: { fiat },
    transactions: { code, tabRouteName },
    wallet: { walletTab },
  } = state;

  const currency = code ?? 'GEL';
  const status = walletTab !== 'Manage Cards' ? 'VERIFIED' : null;
  const transactionType = walletTab === 'Withdrawal' ? 'WITHDRAWAL' : 'DEPOSIT';

  return {
    currency: tabRouteName === 'Trade' ? fiat : currency,
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
