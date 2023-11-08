interface FetchTradesRequest {
	fiatCodes: string[]
	cryptoCode: string | null
	actions: string[]
	statuses: string[]
	fromTime: number | null
	toTime: number | null
	offset: number
	limit: number
}

interface FetchTradesResponse {
	trades: Trade[]
	total: number
}
