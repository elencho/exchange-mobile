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
	} = state

	const methodsMapping = {
		Ecommerce: ['ECOMMERCE'],
		Wire: ['WIRE'],
		'Crypto Transaction': ['WALLET', 'WALLET_INTERNAL'],
		Staking: ['STAKING'],
		B2C: ['B2C'],
		Transfer: ['TRANSFER'],
	}

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
	}
}

export const getTransactions = (state) => state.transactionsOld.transactions

export const getOffset = (state) => state.transactionsOld.offset

export const getMethod = (state) => state.transactionsOld.method

export const getType = (state) => state.transactionsOld.typeFilter

export const getStatus = (state) => state.transactionsOld.status

export const totalLoadedTransactions = (state) =>
	state.transactionsOld.transactions.length
