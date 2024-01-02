type OffersResponse = Record<
	'TOEUR' | 'TOGEL' | 'TOUSD',
	[
		{
			pair: CoinPair
			buyPrice: string
			sellPrice: string
		},
	]
>

type CoinPair = {
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
}

type BalancesResponse = {
	balances: CoinBalance[]
	totalValueBTC: string
	totalValueUSD: string
}

type CoinBalance = {
	currencyCode: string
	displayCurrencyCode: string
	currencyName: string
	type: string
	types: string[]
	available: string
	total: string
	valueBTC: string
	valueUSD: string
	depositMethods: DepositMethod[]
}

type DepositMethod = Record<
	string, // wire/eccomerce/wallet
	{
		displayName: string
		displayNameInternational: string
		iconName: string
		lightModeIconName: string
		provider: string
	}
>
