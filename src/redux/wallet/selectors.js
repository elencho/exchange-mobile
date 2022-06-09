export const wireDepositParams = (state) => {
  const {
    transactions: { code },
  } = state;

  return { currency: code };
};

export const withdrawalParams = (state) => {
  const {
    transactions: { code },
    wallet: {
      currentWhitelistObj: { address },
      withdrawalAmount,
      withdrawalNote,
      network,
    },
  } = state;

  return {
    currency: code,
    amount: withdrawalAmount,
    address,
    note: withdrawalNote,
    provider: network,
  };
};

export const wireWithdrawalParams = (state) => {
  const {
    transactions: { code },
    wallet: {
      withdrawalBank: { id },
      network,
      withdrawalAmount,
      withdrawalNote,
      saveTemplate,
      newTemplateName,
      iban,
      receiverBank,
      intermediateBank,
      currentTemplate: { templateName, bankId },
    },
    profile: {
      userInfo: { country, city, postalCode, address },
    },
  } = state;

  return {
    bankId: templateName === 'New Template' ? id : bankId,
    wireProvider: network,
    currency: code,
    amount: withdrawalAmount,
    country,
    city,
    postalCode,
    address,
    note: withdrawalNote,
    saveTemplate,
    templateName: newTemplateName,
    iban,
    receiverBank,
    intermediateBank,
  };
};

export const cardWithdrawalParams = (state) => {
  const {
    transactions: { code },
    trade: { card },
    wallet: { withdrawalAmount },
  } = state;

  return {
    currency: code,
    cardId: card.id,
    amount: withdrawalAmount,
    redirectUri: 'https://cryptal.com',
  };
};

export const addWhitelistParams = (state) => {
  const {
    transactions: { code },
    wallet: {
      newWhitelist: { name, address },
      network,
    },
  } = state;

  return {
    currency: code,
    address,
    name,
    provider: network,
  };
};

export const editWhitelistParams = (state) => {
  const {
    wallet: {
      currentWhitelistObj: { name, id },
    },
  } = state;

  return { name, id };
};
