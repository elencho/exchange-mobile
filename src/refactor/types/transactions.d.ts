interface FetchTransactionsQuery {
	type: string | null
	statuses: string[]
	txIdOrRecipient: string | null
	methods: string[]
	currency: string | null
	fromTime: number | null
	toTime: number | null
	offset: number
	limit: number
}

type TabName = 'Transfer' | 'Instant trade'
