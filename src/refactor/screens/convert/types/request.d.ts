type SubmitTradeRequest = {
	pairCode: string
	action: 'ASK' | 'BID'
	amount: string
	cardTransactionRequest?: {
		currency: string
		cardId: string
		amount: string
	}
}
