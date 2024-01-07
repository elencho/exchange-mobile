import { COINS_URL_PNG } from '@app/constants/api'
import {
	fetchBalanceApi,
	fetchOffersApi,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { useEffect, useRef, useState } from 'react'

type displayCcy = string

export const useCoins = () => {
	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [pair, setPair] = useState<CoinPair>()
	const [loading, setLoading] = useState(false)

	const [fiats, setFiats] = useState<Coin[]>([])
	const [cryptos, setCryptos] = useState<Coin[]>([])

	const offersCache = useRef<Record<displayCcy, CoinPair[]>>({})
	const balancesCache = useRef<Record<displayCcy, string>>({})

	//TODO: Save in local storage
	const defFiatDisplayCcy = 'TOGEL'
	const defCryptoDisplayCcy = 'BTC'

	useEffect(() => {
		fetchCoins()
	}, [])

	const fetchCoins = async () => {
		setLoading(true)

		Promise.all([fetchOffersApi(), fetchBalanceApi()])
			.then((data) => {
				const offers = data[0]
				const balances = data[1]
				balancesCache.current = saveBalancesCache(balances)
				offersCache.current = saveOffersCache(offers)

				const fiatCoins = Object.values(offers).map((item) =>
					mapCoin(item[0].pair, 'Fiat')
				)
				const cryptosForFiat = offers[defFiatDisplayCcy].map((item) =>
					mapCoin(item.pair, 'Crypto')
				)
				const pairDto = offers[defFiatDisplayCcy].find(
					(item) => item.pair.baseCurrencyDisplayCode === defCryptoDisplayCcy
				)
				const coinPair = pairDto && mapCoinPair(pairDto)

				setFiats(fiatCoins)
				setCryptos(cryptosForFiat)
				setPair(coinPair)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const onCoinSelected = (coin: Coin) => {
		if (coin.type === 'Fiat') {
			const pairs = offersCache.current[coin.displayCcy]
			const cryptosForFiat = pairs.map((item) => item.crypto)
			const newPair =
				pairs.find(
					(item) => item.crypto.displayCcy === pair?.crypto.displayCcy
				) || pairs[0]

			setPair(newPair)
			setCryptos(cryptosForFiat)
		} else {
			const pairs = offersCache.current[pair!.fiat.displayCcy]
			const newPair = pairs.find(
				(item) => item.crypto.displayCcy === coin.displayCcy
			)
			setPair(newPair)
		}
	}

	const saveBalancesCache = (dto: BalancesResponse) => {
		const cache: Record<string, string> = {}
		dto.balances.forEach((item) => {
			cache[item.displayCurrencyCode] = item.available
		})
		return cache
	}

	const saveOffersCache = (dto: OffersResponse) => {
		const cache: Record<string, CoinPair[]> = {}
		Object.entries(dto).forEach((item) => {
			const fiatDisplayCcy = item[0]
			const pairDtoList = item[1]
			cache[fiatDisplayCcy] = pairDtoList.map(mapCoinPair)
		})
		return cache
	}

	const mapCoinPair = (dto: CoinDataResponse): CoinPair => {
		return {
			buyPrice: dto.buyPrice,
			sellPrice: dto.sellPrice,
			fiat: mapCoin(dto.pair, 'Fiat'),
			crypto: mapCoin(dto.pair, 'Crypto'),
		}
	}

	const mapCoin = (dto: CoinPairResponse, type: CoinType): Coin => {
		const base = type === 'Crypto'
		const name = base ? dto.baseCurrencyName : dto.quoteCurrencyName
		const ccy = base ? dto.baseCurrency : dto.quoteCurrency
		const scale = Number(base ? dto.baseScale : dto.quoteScale)
		const displayCcy = base
			? dto.baseCurrencyDisplayCode
			: dto.quoteCurrencyDisplayCode
		const balance = Number(balancesCache.current[displayCcy]).toFixed(scale)

		return {
			ccy,
			displayCcy,
			name,
			type,
			iconPngUrl: ccyToIcon(ccy),
			balance,
			scale,
		}
	}

	const ccyToIcon = (ccy: string) => `${COINS_URL_PNG}/${ccy.toLowerCase()}.png`

	return {
		pair,
		fiats,
		cryptos,
		tradeType,
		setTradeType,
		loading,
		fetchCoins,
		onCoinSelected,
	}
}
