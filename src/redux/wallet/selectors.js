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
