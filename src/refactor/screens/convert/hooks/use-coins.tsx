import { COINS_URL_PNG, ICONS_URL_PNG } from '@app/constants/api'
import {
	fetchBalanceApi,
	fetchCardsApi,
	fetchOffersApi,
	fetchFees,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { COUNTDOWN_SECONDS } from '@app/refactor/screens/convert/components/Timer'
import { setConvertPair } from '@store/redux/common/slice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import store from '@app/refactor/redux/store'

type DisplayCcy = string
type Provider = string
type CardType = string
type Pct = number
type BalanceEntry = {
	available: string
	buyWithCard: boolean
}

export const useCoins = () => {
	const dispatch = useDispatch()

	const [pair, setPair] = useState<CoinPair>()
	const [refreshing, setRefresh] = useState(false)
	const [loading, setLoading] = useState(false)
	const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS)

	const [fiats, setFiats] = useState<Coin[]>([])
	const [cryptos, setCryptos] = useState<Coin[]>([])
	const [cards, setCards] = useState<Card[]>([])
	const [fees, setFees] = useState<ProviderFees[]>([])
	const [totalFee, setTotalFee] = useState<TotalFee>()

	const cardLimits = useRef<CardLimits>()
	const offersCache = useRef<Record<DisplayCcy, CoinPair[]>>({})
	const balancesCache = useRef<Record<DisplayCcy, BalanceEntry>>({})
	const feesCache = useRef<Record<Provider, Record<CardType, Pct | null>>>({})

	useEffect(() => {
		const call = async () => {
			await fetchCoins(true, false)
		}
		call()
	}, [])

	const extractDisplayCcys = () => {
		const convertPair = store.getState().common.convertPair
		if (convertPair) {
			const split = convertPair.split('-')
			return { fiat: split[1], crypto: split[0] }
		} else {
			return { fiat: 'TOUSD', crypto: 'USDT' }
		}
	}

	const fetchCoins = async (skeleton: boolean, refresh: boolean) => {
		skeleton && setLoading(true)
		refresh && setRefresh(true)

		Promise.all([fetchOffersApi(), fetchBalanceApi(), fetchCardsApi()])
			.then((data) => {
				const offers = data[0]
				const balances = data[1]
				const cardsResponse = data[2]

				balancesCache.current = saveBalancesCache(balances)
				offersCache.current = saveOffersCache(offers)
				saveMaxLimitCard(balances)

				const defCcy = extractDisplayCcys()

				const fiatCoins = Object.values(offers).map((item) =>
					mapCoin(item[0], 'Fiat')
				)
				const cryptosForFiat = offers[defCcy.fiat].map((item) =>
					mapCoin(item, 'Crypto')
				)
				const pairDto = offers[defCcy.fiat].find(
					(item) => item.pair.baseCurrencyDisplayCode === defCcy.crypto
				)
				const coinPair = pairDto && mapCoinPair(pairDto)

				setFiats(fiatCoins)
				setCryptos(cryptosForFiat)
				setPair(coinPair)
				setFees(extractFeesFromBalances(balances))

				const cardsData = cardsResponse.map(mapCard)
				setCards(cardsData)
				setSeconds(COUNTDOWN_SECONDS)
			})
			.finally(() => {
				setLoading(false)
				setRefresh(false)
			})
	}

	const fetchTotalFee = (chosenCard: Card, amount: number) => {
		fetchFees({
			currency: pair?.fiat.ccy || 'GEL',
			method: 'ECOMMERCE',
			type: 'DEPOSIT',
			provider: chosenCard.provider,
			cardId: chosenCard.id,
			amount,
		}).then((data) => {
			setTotalFee({ total: data.totalAmount, fee: data.totalFee })
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
			dispatch(setConvertPair(newPair.displayCode))
		} else {
			const pairs = offersCache.current[pair!.fiat.displayCcy]
			const newPair = pairs.find(
				(item) => item.crypto.displayCcy === coin.displayCcy
			)
			setPair(newPair)
			newPair && dispatch(setConvertPair(newPair.displayCode))
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

	const extractFeesFromBalances = (dto: BalancesResponse) => {
		const cache = feesCache.current
		const fees =
			dto.balances
				.find((coin) => coin.displayCurrencyCode === 'TOGEL')
				?.fees.filter(
					(fee) => fee.method === 'ECOMMERCE' && fee.type === 'DEPOSIT'
				) || []

		fees.forEach((fee) => {
			fee.feeRange[0].feeData.forEach((feeData) => {
				if (!(fee.provider in cache)) cache[fee.provider] = {}
				cache[fee.provider][feeData.subMethod] = feeData.percentageValue * 100
			})
		})

		const uniqueProviders = Object.keys(cache)
		const uniqueCardTypes = [
			...new Set(
				Object.values(cache).flatMap((cacheEntry) => Object.keys(cacheEntry))
			),
		]
		uniqueProviders.forEach((provider) => {
			uniqueCardTypes.forEach((cardType) => {
				if (!(cardType in cache[provider])) cache[provider][cardType] = null
			})
		})

		const res = Object.entries(cache).map(mapFee)
		return res.sort((a, b) => a.providerBank.localeCompare(b.providerBank))
	}

	const saveMaxLimitCard = (dto: BalancesResponse) => {
		const toGelEntry = dto.balances.find(
			(v) => v.displayCurrencyCode === 'TOGEL'
		)
		const limits = toGelEntry?.limits.find(
			(l) => l.method === 'ECOMMERCE' && l.transactionType === 'DEPOSIT'
		)
		if (limits) {
			cardLimits.current = {
				min: Number(limits.minValue),
				max: Number(limits.maxValue),
			}
		}
		// TODO: MinValue for card
	}

	/***
	 *
	 * Mappers
	 *
	 **/

	const mapCoinPair = (dto: CoinDataResponse): CoinPair => {
		return {
			buyPrice: dto.buyPrice,
			sellPrice: dto.sellPrice,
			fiat: mapCoin(dto, 'Fiat'),
			crypto: mapCoin(dto, 'Crypto'),
			code: dto.pair.pair,
			displayCode: dto.pair.pairDisplayName,
			minSimpleTradeSize: Number(dto.pair.minSimpleTradeSize),
			minSimpleTradeCost: Number(dto.pair.minSimpleTradeCost),
			maxSimpleTradeSize: Number(dto.pair.maxSize),
		}
	}

	const mapCoin = (data: CoinDataResponse, type: CoinType): Coin => {
		const base = type === 'Crypto'
		const dto = data.pair

		const name = base ? dto.baseCurrencyName : dto.quoteCurrencyName
		const ccy = base ? dto.baseCurrency : dto.quoteCurrency
		const scale = Number(base ? dto.baseScale : dto.quoteScale)
		const displayCcy = base
			? dto.baseCurrencyDisplayCode
			: dto.quoteCurrencyDisplayCode

		const cachedBalance = balancesCache.current[displayCcy]
		const buyWithCard = cachedBalance.buyWithCard
		const marketPrice = base
			? { buy: Number(data.buyPrice), sell: Number(data.sellPrice) }
			: undefined

		return {
			ccy,
			displayCcy,
			name,
			type,
			iconPngUrl: ccyToIcon(displayCcy),
			balance: cachedBalance.available,
			scale,
			buyWithCard,
			marketPrice,
		}
	}

	const mapCard = (dto: CardResponse): Card => {
		const cache = feesCache.current
		return {
			...dto,
			iconPngUrl: cardToIcon(dto.network),
			feePct: cache[dto.provider][dto.network],
		}
	}

	const mapFee = (
		entry: [string, Record<string, number | null>]
	): ProviderFees => {
		const providerBank = entry[0]
		const data = entry[1]
		return {
			providerBank,
			feeData: Object.entries(data).map((fee) => {
				return { cardType: fee[0], pct: fee[1], iconPngUrl: cardToIcon(fee[0]) }
			}),
		}
	}

	const ccyToIcon = (ccy: string) => `${COINS_URL_PNG}/${ccy.toLowerCase()}.png`

	const cardToIcon = (network: string) => `${ICONS_URL_PNG}/${network}.png`

	return {
		pair,
		fiats,
		cryptos,
		cards,
		fees,
		loading,
		refreshing,
		fetchCoins,
		fetchTotalFee,
		onCoinSelected,
		seconds,
		setSeconds,
		cardLimits: cardLimits.current,
		totalFee,
		setTotalFee,
	}
}
