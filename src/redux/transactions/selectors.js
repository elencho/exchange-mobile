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

export const getTransactions = (state) => state.transactions.transactions;

export const modalTopParams = (state) => {
  return {
    currencyModal: state.transactions.currencyModal,
    transactionModal: state.transactions.transactionModal,
  };
};

export const getOffset = (state) => state.transactions.offset;

export const getMethod = (state) => state.transactions.method;
