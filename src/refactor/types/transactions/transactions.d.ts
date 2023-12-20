interface FetchTransactionsRequest {
	type: string | null
	statuses: Status[]
	txIdOrRecipient: string | null
	methods: Methods[]
	currency: string | null
	fromTime: number | null
	toTime: number | null
	offset: number
	limit: number
}

interface FetchTransactionsResponse {
	paging: {
		page: number
		pageSize: number
		pageCount: number
	}
	data: [Transaction]
}

interface Transaction {
	id: number
	baseCurrency: string
	baseCurrencyDisplayCode: string
	quoteCurrency: string
	quoteCurrencyDisplayCode: string
	action: 'ASK' | 'BID' | ''
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

interface TransactionDetails {
	method?: any
	action?: any
	currency?: string
	quoteCurrencyDisplayCode?: string
	baseCurrencyDisplayCode?: string
	totalAmount?: number
	status?: string
	fee?: number
	time?: number
	date?: number
	amount?: number
	providerDisplayName?: string
	type?: string
	cumulativeCost?: string
	size?: string
	price?: string
	note?: string
	year?: number
	creationTime?: number
	timestamp?: number
	transactionInfo?: string
	recipient?: string
	tag?: string
	provider?: string
}

type TabName = 'Transfer' | 'Instant trade'

type Status = 'Pending' | 'Completed' | 'Failed'

type Method =
	| 'ECOMMERCE'
	| 'WIRE'
	| 'WALLET'
	| 'WALLET_INTERNAL'
	| 'B2C'
	| 'SWAP'
	| 'STAKING'
	| 'TRANSFER'
