import {
	BALANCE_URL,
	CALCULATE_FEE_URL,
	CARDS_URL,
	OFFERS_NEW_URL,
	TRADES_URL,
} from '@app/constants/api'
import { extractApiError } from '@app/refactor/utils/errorUtils'
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

export const fetchCardsApi = async () => {
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

export const submitTrade = async (params: SubmitTradeRequest) => {
	const data = await axios.post<SubmitTradeResponse>(TRADES_URL, params, {
		headers: { toast: false, requestName: 'submitTrade' },
	})
	const err = extractApiError(data)
	return err || data?.data
}

export const fetchFees = async (params: CalculateFeeRequest) => {
	const data = await axios.get<CalculateFeeResponse>(CALCULATE_FEE_URL, {
		params,
		headers: { toast: false, requestName: 'calculateFee' },
	})
	return data?.data
}
