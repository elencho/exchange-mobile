export type CoinError = {
	err: string
	type: CoinType[]
}

export const coinError = (
	fiatAmount: string,
	cryptoAmount: string,
	pair: CoinPair | undefined,
	tradeType: TradeType,
	buyWithCard: boolean
): CoinError | null => {
	if (!pair) return { err: 'No pair', type: ['Fiat', 'Crypto'] }

	const f = Number(fiatAmount)
	const c = Number(cryptoAmount)
	const buy = Number(pair.buyPrice)
	const sell = Number(pair.sellPrice)

	console.log(buyWithCard)

	// 5
	if (!fiatAmount.trim().length || !cryptoAmount.trim().length) {
		return { err: 'Both empty', type: ['Fiat', 'Crypto'] }
	}

	if (tradeType === 'Buy') {
		// 1, 2
		if (
			!buyWithCard &&
			(f > Number(pair.fiat.balance) || c > Number(pair.fiat.balance))
		) {
			return {
				err: 'max. available ' + pair.fiat.balance + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		// 6
		if (f < pair.minTradeCost) {
			return {
				err: 'min. amount ' + pair.minTradeCost + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		// 7
		if (f > pair.maxTradeSize) {
			return {
				err: 'max. deposit ' + pair.maxTradeSize + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
	} else {
		// 3, 4
		if (c > Number(pair.crypto.balance) || f > Number(pair.crypto.balance)) {
			return {
				err:
					'max. available ' +
					pair.crypto.balance +
					' ' +
					pair.crypto.displayCcy,
				type: ['Crypto'],
			}
		}
		// 8
		if (!buyWithCard && c * sell < pair.minTradeCost) {
			return {
				err: 'min. amount ' + pair.minTradeCost + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
	}

	return null
}
