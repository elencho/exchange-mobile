type OffersResponse = Record<string, CoinDataResponse[]>

type CoinDataResponse = {
	pair: CoinPairResponse
	buyPrice: string
	sellPrice: string
}

type CoinPairResponse = {
	pair: string
	pairDisplayName: string
	baseCurrency: string
	baseCurrencyName: string
	baseCurrencyDisplayCode: string
	baseScale: string
	quoteCurrency: string
	quoteCurrencyName: string
	quoteCurrencyDisplayCode: string
	quoteScale: string
	minSimpleTradeSize: string
	minSimpleTradeCost: string
	maxSize: string
}

type BalancesResponse = {
	balances: CoinBalanceResponse[]
	totalValueBTC: string
	totalValueUSD: string
}

type CoinBalanceResponse = {
	fees: FeeResponse[]
	currencyCode: string
	displayCurrencyCode: string
	currencyName: string
	type: string
	types: string[]
	available: string
	total: string
	valueBTC: string
	valueUSD: string
	depositMethods: DepositMethodResponse
	limits: [
		{
			maxValue: string
			minValue: string
			method: string
			transactionType: string
		},
	]
}

type FeeResponse = {
	feeRange: {
		feeData: {
			percentageValue: number
			subMethod: string
		}[]
	}[]
	method: string
	type: string
	provider: string
}

type DepositMethodResponse = Record<
	string, // wire/eccomerce/wallet
	{
		displayName: string
		displayNameInternational: string
		iconName: string
		lightModeIconName: string
		provider: string
	}
>

type CardsResponse = CardResponse[]

type CardResponse = {
	id: string
	cardNumber: string
	provider: string
	network: string
}

type SubmitTradeResponse = null | CardRedirectResponse | UiErrorData

type CardRedirectResponse = {
	actionMethod: 'GET' | 'POST'
	actionUrl: string
}
