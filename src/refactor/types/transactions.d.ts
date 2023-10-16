interface FetchTransactionsQuery {
	type: string
	statuses: string[]
	txIdOrRecipient: string
	methods: string[]
	currency: string
	fromTime: number
	toTime: number
	offset: number
	limit: number
}
