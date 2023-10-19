interface fetchTradesQuery {
	fiatCodes: string[]
	cryptoCode: string
	actions: string[]
	statuses: string[]
	fromTime: number
	toTime: number
	offset: number
	limit: number
}
