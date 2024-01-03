type TradeType = 'Buy' | 'Sell'

type CoinType = 'Fiat' | 'Crypto'

type Coin = {
	type: CoinType
	ccy: string
	displayCcy: string
	balance: number
	iconPngUrl: string
}

type DefaultCoinPair = {
	fiatCcy: string
	cryptoCcy: string
}
