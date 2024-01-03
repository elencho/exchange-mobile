import { COINS_URL_PNG } from '@app/constants/api'
import {
	fetchBalanceApi,
	fetchOffersApi,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { useEffect, useState } from 'react'

export const useCoins = () => {
	//TODO?: Error
	const [fiats, setFiats] = useState<Coin[]>([])
	const [cryptos, setCryptos] = useState<Coin[]>([])

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchCoins()
	}, [])

	const fetchCoins = async () => {
		setLoading(true)

		Promise.all([fetchOffersApi(), fetchBalanceApi()])
			.then((data) => {
				const offers = data[0]
				const balances = data[1]

				setFiats(balances.balances.slice(0, 3).map(mapToCoin))
				setCryptos(balances.balances.slice(3).map(mapToCoin))
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const mapToCoin = (dto: CoinBalanceResponse) => {
		return {
			type: dto.type === 'FIAT' ? 'Fiat' : 'Crypto',
			ccy: dto.currencyCode,
			displayCcy: dto.displayCurrencyCode,
			balance: Number(dto.total),
			iconPngUrl: `${COINS_URL_PNG}/${dto.currencyCode.toLowerCase()}.png`,
		} as Coin
	}

	return {
		fiats,
		cryptos,
		loading,
	}
}
