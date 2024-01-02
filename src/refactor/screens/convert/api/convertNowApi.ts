import { BALANCE_URL, OFFERS_NEW_URL } from '@app/constants/api'
import axios from 'axios'

export const fetchOffersApi = async () => {
	const data = await axios.get<OffersResponse>(OFFERS_NEW_URL, {
		headers: { toast: false, requestName: 'fetchOffers' },
	})
	return data?.data
}

export const fetchBalanceApi = async () => {
	const data = await axios.get<BalancesResponse>(BALANCE_URL, {
		headers: { toast: false, requestName: 'fetchBalance' },
	})
	return data?.data
}
