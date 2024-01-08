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

type Card = {
	id: string
	cardNumber: string
	provider: string
	network: string
	iconPngUrl: string
}
