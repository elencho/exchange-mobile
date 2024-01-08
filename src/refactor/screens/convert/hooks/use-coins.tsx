import { COINS_URL_PNG, ICONS_URL_PNG } from '@app/constants/api'
import {
	fetchBalanceApi,
	fetchCards,
	fetchOffersApi,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { useEffect, useRef, useState } from 'react'

type displayCcy = string
type BalanceEntry = {
	available: string
	buyWithCard: boolean
}

export const useCoins = () => {
	const [pair, setPair] = useState<CoinPair>()
	const [loading, setLoading] = useState(false)

	const [fiats, setFiats] = useState<Coin[]>([])
	const [cryptos, setCryptos] = useState<Coin[]>([])
	const [cards, setCards] = useState<Card[]>([])

	const offersCache = useRef<Record<displayCcy, CoinPair[]>>({})
	const balancesCache = useRef<Record<displayCcy, BalanceEntry>>({})

	//TODO: Save in local storage
	const defFiatDisplayCcy = 'TOGEL'
	const defCryptoDisplayCcy = 'BTC'

	useEffect(() => {
		fetchCoins()
		fetchCards().then((data) => {
			setCards(data.map(mapCard))
		})
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
		const cache: Record<string, BalanceEntry> = {}
		dto.balances.forEach((item) => {
			cache[item.displayCurrencyCode] = {
				available: item.available,
				buyWithCard: Object.keys(item.depositMethods).includes('ECOMMERCE'),
			}
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

		const cachedBalance = balancesCache.current[displayCcy]
		const balance = Number(cachedBalance.available).toFixed(scale)
		const buyWithCard = cachedBalance.buyWithCard

		return {
			ccy,
			displayCcy,
			name,
			type,
			iconPngUrl: ccyToIcon(ccy),
			balance,
			scale,
			buyWithCard,
		}
	}

	const mapCard = (dto: CardResponse): Card => {
		return { ...dto, iconPngUrl: cardToIcon(dto.network) }
	}

	const ccyToIcon = (ccy: string) => `${COINS_URL_PNG}/${ccy.toLowerCase()}.png`

	const cardToIcon = (network: string) => `${ICONS_URL_PNG}/${network}.png`

	return {
		pair,
		fiats,
		cryptos,
		cards,
		loading,
		fetchCoins,
		onCoinSelected,
	}
}
