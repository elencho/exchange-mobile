type OffersResponse = Record<
	'TOEUR' | 'TOGEL' | 'TOUSD',
	[
		{
			pair: CoinPairResponse
			buyPrice: string
			sellPrice: string
		},
	]
>

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
}

type BalancesResponse = {
	balances: CoinBalanceResponse[]
	totalValueBTC: string
	totalValueUSD: string
}

type CoinBalanceResponse = {
	currencyCode: string
	displayCurrencyCode: string
	currencyName: string
	type: string
	types: string[]
	available: string
	total: string
	valueBTC: string
	valueUSD: string
	depositMethods: DepositMethodResponse[]
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
