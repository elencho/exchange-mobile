type TradeType = 'Buy' | 'Sell'

type CoinType = 'Fiat' | 'Crypto'

type Position = 'up' | 'low'

type Coin = {
	ccy: string
	displayCcy: string
	name: string
	balance: string
	iconPngUrl: string
	scale: number
	type: CoinType
	buyWithCard: boolean
	marketPrice?: MarketPrice
}

type MarketPrice = {
	buy: number
	sell: number
}

type CoinPair = {
	fiat: Coin
	crypto: Coin
	sellPrice: string
	buyPrice: string
	maxSimpleTradeSize: number
	minSimpleTradeSize: number
	minSimpleTradeCost: number
	code: string
	displayCode: string
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

type CardLimits = {
	min: number
	max: number
}

type TotalFee = {
	total: string
	fee: string
}

type ProviderFees = {
	providerBank: string
	feeData: {
		pct: number | null
		cardType: string
		iconPngUrl: string
	}[]
}

type ConfirmModalStatus = 'success' | 'pending' | 'error'
