export const convertColors = {
	buy: '#0CCBB5',
	sell: '#E0355D',
}

type CoinError = {
	err: string
	type: CoinType
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

	if (tradeType === 'Buy') {
		if (f > Number(pair.fiat.balance)) {
			const maxAvailableFiat = pair.fiat.balance
			return {
				err: 'max. available ' + maxAvailableFiat + ' ' + pair.fiat.displayCcy,
				type: 'Fiat',
			}
		}
	} else {
		if (f > Number(pair.fiat.balance)) {
			const maxAvailableCrypto = pair.crypto.balance
			return {
				err:
					'max. available ' + maxAvailableCrypto + ' ' + pair.crypto.displayCcy,
				type: 'Crypto',
			}
		}
	}

	return null
}

export const hexOpacityPct = (hex: string, pct: number) => {
	if (hex.length !== 7) return hex

	if (pct < 0) pct = 0
	else if (pct > 100) pct = 100

	const opacity = Math.round(pct * 2.55)
	return hex + opacity.toString(16).toUpperCase().padStart(2, '0')
}

export const formatAmount = (txt: string, coin?: Coin) => {
	txt = txt.replace(',', '.')

	const dotIndexes = Array.from(txt).reduce((res, ch, i) => {
		ch === '.' && res.push(i)
		return res
	}, [] as number[])

	txt = dotIndexes.length == 2 ? txt.slice(0, txt.length - 1) : txt
	txt = txt.startsWith('.') ? '0' + txt : txt

	if (dotIndexes.length) {
		const lastDoxIndex = dotIndexes[dotIndexes.length - 1]
		txt = txt.slice(0, lastDoxIndex + (coin?.scale || 0) + 1)
	}
	return txt
}
