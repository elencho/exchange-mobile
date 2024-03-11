type CalculateFeeRequest = {
	currency: string
	method: 'ECOMMERCE'
	type: 'DEPOSIT'
	provider: string
	cardId: string
	amount: number
}

type SubmitTradeRequest = {
	pairCode: string
	action: 'ASK' | 'BID'
	amount: string
	price: string
	cardTransactionRequest?: {
		currency: string
		cardId: string
		amount: string
	}
}
