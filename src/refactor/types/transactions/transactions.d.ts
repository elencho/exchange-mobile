interface FetchTransactionsRequest {
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

interface FetchTransactionsResponse {
	transactions: Transaction[]
	total: number
}

type TabName = 'Transfer' | 'Instant trade'
