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
	if (!pair || (!fiatAmount.length && !cryptoAmount.length))
		return { err: '', type: ['Fiat', 'Crypto'] }

	const fiat = Number(fiatAmount)
	const crypto = Number(cryptoAmount)

	const maxSize = (): CoinError | null => {
		if (crypto > pair.maxSimpleTradeSize) {
			return {
				err:
					t('cn_err_max_size') +
					' ' +
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
					t('cn_err_min_simple_trade_size') +
					' ' +
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
					t('cn_err_min_simple_trade_cost') +
					' ' +
					pair.minSimpleTradeCost +
					' ' +
					pair.crypto.displayCcy,
				type: ['Crypto'],
			}
		}
		return null
	}

	const maxValueCard = (): CoinError | null => {
		if (cardLimits && fiat > cardLimits.max) {
			return {
				err:
					t('cn_err_max_limit') +
					' ' +
					cardLimits.max +
					' ' +
					pair.fiat.displayCcy,
				type: ['Fiat'],
			}
		}
		return null
	}

	const minValueCard = (): CoinError | null => {
		if (cardLimits && fiat < cardLimits.min) {
			return {
				err:
					t('cn_err_min_limit') +
					' ' +
					+cardLimits.min +
					' ' +
					pair.fiat.displayCcy,
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
						t('cn_err_max_available') +
						' ' +
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
						t('cn_err_max_available') +
						' ' +
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
