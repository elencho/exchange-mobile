export const wireDepositParams = (state) => {
  const {
    transactions: { code },
  } = state;

  return { currency: code };
};
