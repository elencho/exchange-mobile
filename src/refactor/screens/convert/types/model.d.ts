type TradeType = 'Buy' | 'Sell'

type CoinType = 'Fiat' | 'Crypto'

// Add market price
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
}

type CardData = {
	cards: Card[]
	fees: CardFee[]
}

type Card = {
	id: string
	cardNumber: string
	provider: string
	network: string
	iconPngUrl: string
	feePct: number | null
}

type CardFee = {
	providerBank: string
	feeData: {
		pct: number | null
		cardType: string
	}[]
}
