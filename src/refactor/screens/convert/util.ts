export const convertColors = {
	buy: '#0CCBB5',
	sell: '#E0355D',
}

export const hexOpacityPct = (hex: string, pct: number) => {
	if (hex.length !== 7) return hex

	if (pct < 0) pct = 0
	else if (pct > 100) pct = 100

	const opacity = Math.round(pct * 2.55)
	return hex + opacity.toString(16).toUpperCase().padStart(2, '0')
}

export const formatDisplayPair = (
	pair: CoinPair | undefined,
	type: TradeType,
	equalDelim?: string
) => {
	if (!pair) return ''

	const price = type === 'Buy' ? pair.buyPrice : pair.sellPrice
	return (
		'1 ' +
		pair.crypto.displayCcy +
		' ' +
		(equalDelim || '=') +
		' ' +
		price +
		' ' +
		pair.fiat.displayCcy
	)
}

export const formatAmount = (txt: string, coin?: Coin) => {
	// if (txt.startsWith('0') && txt.length > 1 && isCharNumber(txt.charAt(1))) {
	// 	return '0'
	// }

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
	// This line ensures no trailing zeros
	// return Number(txt).toLocaleString().replace(',', '.')
	return txt
}

export const formatScale = (
	amount: string | number | undefined,
	scale: number | undefined
) => {
	if (!amount) return ''
	if (!scale) return amount.toString()

	amount = typeof amount === 'number' ? amount.toString() : amount
	const dotIndex = amount.indexOf('.')
	return dotIndex === -1 ? amount : amount.substring(0, dotIndex + 1 + scale)
}
