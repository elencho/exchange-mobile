export const getParams = (state) => {
  const {
    transactions: {
      typeFilter,
      method,
      status,
      cryptoFilter,
      fromDateTime,
      toDateTime,
      offset,
      limit,
      txIdOrRecipient,
    },
  } = state;

  const methodsMapping = {
    Ecommerce: ['ECOMMERCE'],
    Wire: ['WIRE'],
    'Crypto Transaction': ['WALLET', 'WALLET_INTERNAL'],
    Staking: ['STAKING'],
    B2C: ['B2C'],
    Transfer: ['TRANSFER'],
  };

  // let methods;
  // switch (method) {
  //   case 'All':
  //     methods = null;
  //     break;
  //   case 'Ecommerce':
  //     methods = 'ECOMMERCE';
  //     break;
  //   case 'Wire':
  //     methods = 'WIRE';
  //     break;
  //   case 'Crypto Transaction':
  //     methods = ['WALLET', 'WALLET_INTERNAL'];
  //     break;
  //   case 'Staking':
  //     methods = 'STAKING';
  //     break;
  //   case 'B2C':
  //     methods = 'B2C';
  //     break;
  //   case 'Transfer':
  //     methods = 'TRANSFER';
  //     break;
  //   default:
  //     break;
  // }

  return {
    type: typeFilter?.length === 1 ? typeFilter[0] : null,
    methods: methodsMapping[method],
    statuses: status,
    currency: cryptoFilter?.length > 0 ? cryptoFilter : null,
    fromTime: fromDateTime,
    toTime: toDateTime,
    offset,
    limit: 10,
    txIdOrRecipient: txIdOrRecipient?.length > 0 ? txIdOrRecipient : null,
  };
};

export const getTransactions = (state) => state.transactions.transactions;

export const getOffset = (state) => state.transactions.offset;

export const getMethod = (state) => state.transactions.method;

export const getType = (state) => state.transactions.typeFilter;

export const getStatus = (state) => state.transactions.status;

export const totalLoadedTransactions = (state) =>
  state.transactions.transactions.length;
