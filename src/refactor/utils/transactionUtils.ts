import axios from 'axios'
import { CURRENCIES_URL, TRANSACTIONS_URL } from '@app/constants/api'

export const fetchTransactions = async (params: FetchTransactionsRequest) => {
	const data = await axios.post<FetchTransactionsResponse>(
		TRANSACTIONS_URL,
		params
	)
	if (data) return data.data
}

export const fetchCurrencies = async () => {
	const data = await axios.get<FetchCurrenciesResponse>(CURRENCIES_URL)
	if (data) return data.data
}
