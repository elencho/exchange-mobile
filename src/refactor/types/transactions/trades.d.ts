interface FetchTradesRequest {
	fiatCodes: string[]
	cryptoCode: string | null
	actions: Actions[]
	statuses: StatusTrades[]
	fromTime: number | null
	toTime: number | null
	offset: number
	limit: number
}

interface FetchTradesResponse {
	paging: {
		page: number
		pageSize: number
		pageCount: number
	}
	data: [Trade]
}

interface Trade {
	id: number
	baseCurrency: string
	baseCurrencyDisplayCode: string
	quoteCurrency: string
	quoteCurrencyDisplayCode: string
	action: Actions[]
	type: string
	size: string
	price: string
	cumulativeCost: string
	status: string
	sendAddress: string
	userId: number
	creationTime: number
	creatorUserId: number
	lastChangeTime: number
}

type StatusTrades =
	| 'PENDING'
	| 'WAITING_DEPOSIT'
	| 'FAILED'
	| 'EXPIRED'
	| 'COMPLETED'

type Actions = 'ASK' | 'BID' | ''
