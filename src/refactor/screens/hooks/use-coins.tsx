import {
	fetchBalanceApi,
	fetchOffersApi,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { useApi } from '@app/refactor/setup/network/useApi'
import { useEffect, useState } from 'react'

export const useCoins = () => {
	//TODO?: Error
	const [data, setData] = useState<CoinPair | null>(null)
	const [loading, setLoading] = useState(false)

	const fetchData = async () => {
		setLoading(true)

		Promise.all([fetchOffersApi(), fetchBalanceApi()])
			.then((data) => {
				const offers = data[0]
				const balances = data[1]

				const def = offers.TOUSD[0].pair.pairDisplayName
				console.log(def)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return {
		data,
		loading,
		fetchData,
	}
}
