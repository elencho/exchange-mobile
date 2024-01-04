type TradeType = 'Buy' | 'Sell'

type CoinType = 'Fiat' | 'Crypto'

// Add market price
type Coin = {
	ccy: string
	displayCcy: string
	name: string
	balance: string
	iconPngUrl: string
}

type CoinPair = {
	fiat: Coin
	crypto: Coin
	sellPrice: string
	buyPrice: string
}
