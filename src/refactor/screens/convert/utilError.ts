import { t } from 'i18next'

export type CoinError = {
	err?: string
	type: CoinType[]
}

export const coinError = (
	fiatAmount: string,
	cryptoAmount: string,
	pair: CoinPair | undefined,
	tradeType: TradeType,
	buyWithCard: boolean,
	cardLimits: CardLimits | undefined
): CoinError | null => {
	if (!pair) return { err: '', type: ['Fiat', 'Crypto'] }

	const fiat = Number(fiatAmount)
	const crypto = Number(cryptoAmount)

	const maxSize = (): CoinError | null => {
		if (crypto > pair.maxSimpleTradeSize) {
			return {
				err:
					'max. amount ' +
					pair.maxSimpleTradeSize +
					' ' +
					pair.crypto.displayCcy,
				type: ['Crypto'],
			}
		}
		return null
	}

	const minSimpleTradeSize = (): CoinError | null => {
		if (crypto < pair.minSimpleTradeSize) {
			return {
				err:
					'min. amount ' +
					pair.minSimpleTradeSize +
					' ' +
					pair.crypto.displayCcy,
				type: ['Crypto'],
			}
		}
		return null
	}

	const minSimpleTradeCost = (): CoinError | null => {
		if (fiat < pair.minSimpleTradeCost) {
			return {
				err:
					'Order value is below the min limit: ' +
					pair.minSimpleTradeCost +
					' ' +
					pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		return null
	}

	const maxValueCard = (): CoinError | null => {
		if (cardLimits && fiat > cardLimits.max) {
			return {
				err: 'max. top up ' + cardLimits.max + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		return null
	}

	const minValueCard = (): CoinError | null => {
		if (cardLimits && fiat < cardLimits.min) {
			return {
				err: 'min. top up ' + cardLimits.min + ' ' + pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		return null
	}

	const maxBalance = (): CoinError | null => {
		if (tradeType === 'Buy') {
			if (fiat > Number(pair.fiat.balance)) {
				return {
					err:
						t('max. available') +
						pair.fiat.balance +
						' ' +
						pair.fiat.displayCcy,
					type: ['Fiat'],
				}
			}
		} else {
			if (crypto > Number(pair.crypto.balance)) {
				return {
					err:
						t('max. available') +
						pair.crypto.balance +
						' ' +
						pair.crypto.displayCcy,
					type: ['Crypto'],
				}
			}
		}
		return null
	}

	if (tradeType === 'Buy') {
		if (buyWithCard) {
			return (
				minSimpleTradeCost() ||
				minSimpleTradeSize() ||
				maxValueCard() ||
				minValueCard()
			)
		} else {
			return (
				minSimpleTradeCost() ||
				minSimpleTradeSize() ||
				maxSize() ||
				maxBalance()
			)
		}
	} else {
		return (
			minSimpleTradeSize() || minSimpleTradeCost() || maxSize() || maxBalance()
		)
	}
}
