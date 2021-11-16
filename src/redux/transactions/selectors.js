export const getParams = (state) => {
  const {
    transactions: {
      typeFilter,
      method,
      currency,
      fromDateTime,
      toDateTime,
      offset,
      limit,
    },
  } = state;

  return {
    type: typeFilter,
    method,
    currency,
    fromDateTime,
    toDateTime,
    offset,
    limit,
  };
};
