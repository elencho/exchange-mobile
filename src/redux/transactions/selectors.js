export const getParams = (state) => {
  const {
    transactions: {
      typeFilter,
      method,
      code,
      fromDateTime,
      toDateTime,
      offset,
      limit,
    },
  } = state;

  let methods = [];
  method.forEach((m) => {
    switch (m) {
      case 'All':
        methods = null;
        break;
      case 'Credit Card':
        methods.push('ECOMMERCE');
        break;
      case 'Wire':
        methods.push('WIRE');
        break;
      case 'Crypto':
        methods.push('WALLET');
        break;
      default:
        break;
    }
  });

  return {
    type: typeFilter,
    methods,
    currency: code,
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

export const totalLoadedTransactions = (state) =>
  state.transactions.transactions.length;

export const getModalRef = (state) => state.transactions.modalRef;
