export const getParams = (state) => {
  const {
    transactions: {
      type,
      method,
      currency,
      fromDateTime,
      toDateTime,
      offset,
      limit,
    },
  } = state;

  return { type, method, currency, fromDateTime, toDateTime, offset, limit };
};
