export const getParams = (state) => {
  const {
    transactions: {
      typeFilter,
      method,
      abbr,
      fromDateTime,
      toDateTime,
      offset,
      limit,
    },
  } = state;

  return {
    type: typeFilter,
    method,
    currency: abbr,
    fromDateTime,
    toDateTime,
    offset,
    limit,
  };
};
