type TradeType = 'Buy' | 'Sell'

type CoinType = 'Fiat' | 'Crypto'

type Coin = {
	ccy: string
	displayCcy: string
	name: string
	balance: string
	iconPngUrl: string
	scale: number
	type: CoinType
	buyWithCard: boolean
}

type CoinPair = {
	fiat: Coin
	crypto: Coin
	sellPrice: string
	buyPrice: string
	minTradeCost: number
	minTradeSize: number
	maxTradeSize: number
	pair: string
}

type CardData = {
	cards: Card[]
	fees: ProviderFees[]
}

type Card = {
	id: string
	cardNumber: string
	provider: string
	network: string
	iconPngUrl: string
	feePct: number | null
}

type ProviderFees = {
	providerBank: string
	feeData: {
		pct: number | null
		cardType: string
		iconPngUrl: string
	}[]
}
