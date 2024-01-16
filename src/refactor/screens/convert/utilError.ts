export type CoinError = {
	err: string
	type: CoinType[]
}

export const coinError = (
	fiatAmount: string,
	cryptoAmount: string,
	pair: CoinPair,
	tradeType: TradeType
): CoinError | null => {
	const f = Number(fiatAmount)
	const c = Number(cryptoAmount)
	const buy = Number(pair.buyPrice)
	const sell = Number(pair.sellPrice)

	// 5
	if (!fiatAmount.trim().length || !cryptoAmount.trim().length) {
		return { err: 'Both empty', type: ['Fiat', 'Crypto'] }
	}

	if (tradeType === 'Buy') {
		if (f > Number(pair.fiat.balance)) {
			// 1, 2
			return {
				err: 'max. available ' + pair.fiat.balance + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		// 6
		if (f * buy < pair.minTradeCost) {
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
		if (f > Number(pair.fiat.balance)) {
			// 3, 4
			const maxAvailableCrypto = pair.crypto.balance
			return {
				err:
					'max. available ' + maxAvailableCrypto + ' ' + pair.crypto.displayCcy,
				type: ['Crypto'],
			}
		}
		// 8
		if (f * sell < pair.minTradeCost) {
			return {
				err: 'min. amount ' + pair.minTradeCost + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
	}

	return null
}
