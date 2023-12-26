type OffersResponse = Record<
	string, // fiat
	[
		{
			pair: {
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
			buyPrice: string
			sellPrice: string
		},
	]
>
