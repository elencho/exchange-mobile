export const wireDepositParams = (state) => {
  const {
    transactions: { code },
  } = state;

  return { currency: code };
};

export const withdrawalParams = (state) => {
  const {
    transactions: { code },
    wallet: { destinationAddress, withdrawalAmount, withdrawalNote, network },
  } = state;

  return {
    currency: code,
    amount: withdrawalAmount,
    address: destinationAddress,
    note: withdrawalNote,
    provider: network,
  };
};
