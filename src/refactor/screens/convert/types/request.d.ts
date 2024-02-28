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
