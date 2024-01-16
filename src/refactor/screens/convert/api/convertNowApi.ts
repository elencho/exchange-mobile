import {
	BALANCE_URL,
	CARDS_URL,
	OFFERS_NEW_URL,
	TRADES_URL,
} from '@app/constants/api'
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

export const fetchCards = async () => {
	const data = await axios.get<CardsResponse>(CARDS_URL, {
		headers: { toast: false, requestName: 'fetchCards' },
		params: {
			currency: 'GEL',
			status: 'VERIFIED',
			transactionType: 'DEPOSIT',
		},
	})
	return data?.data
}

export const submitTrade = async () => {
	const data = await axios.post<SubmitTradeResponse>(TRADES_URL, {
		headers: { toast: false, requestName: 'submitTrade' },
		data: {}, //TODO
	})
	return data?.data
}
