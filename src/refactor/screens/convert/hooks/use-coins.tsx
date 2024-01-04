import { COINS_URL_PNG } from '@app/constants/api'
import {
	fetchBalanceApi,
	fetchOffersApi,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { useEffect, useMemo, useRef, useState } from 'react'

export const useCoins = () => {
	const [tradeType, setTradeType] = useState<TradeType>('Buy')
	const [pair, setPair] = useState<CoinPair>()
	const [loading, setLoading] = useState(false)

	const [fiats, setFiats] = useState<Coin[]>([])
	const [cryptos, setCryptos] = useState<Coin[]>([])

	const offersDto = useRef<OffersResponse>()
	const balancesDto = useRef<BalancesResponse>()

	//TODO: Save in local storage
	const defFiatDisplayCcy = 'TOGEL'
	const defCryptoDisplayCcy = 'BTC'

	useEffect(() => {
		fetchCoins()
	}, [])

	const balancesCache: Record<string, string> = useMemo(() => {
		if (!balancesDto.current) return {}

		const cache: Record<string, string> = {}
		balancesDto.current.balances.forEach((item) => {
			cache[item.displayCurrencyCode] = item.available
		})
		return cache
	}, [balancesDto.current])

	const fetchCoins = async () => {
		setLoading(true)

		Promise.all([fetchOffersApi(), fetchBalanceApi()])
			.then((data) => {
				const offers = data[0]
				const balances = data[1]
				offersDto.current = offers
				balancesDto.current = balances

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
		const ccy = base ? dto.baseCurrency : dto.quoteCurrency
		const displayCcy = base
			? dto.baseCurrencyDisplayCode
			: dto.quoteCurrencyDisplayCode
		const name = base ? dto.baseCurrencyName : dto.quoteCurrencyName

		console.log({ displayCcy: balancesCache[displayCcy] })
		return {
			ccy,
			displayCcy,
			name,
			type,
			iconPngUrl: ccyToIcon(ccy),
			balance: balancesCache[displayCcy],
		}
	}

	const ccyToIcon = (ccy: string) => `${COINS_URL_PNG}/${ccy.toLowerCase()}.png`

	const onCoinSelected = (coin: Coin) => {
		// if fiat, same
		// if crypto, refresh cryptos
	}

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
