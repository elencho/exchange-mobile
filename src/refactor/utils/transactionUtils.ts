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
	const data = await axios.get(CURRENCIES_URL)
	if (data) return data.data
}

export const totalAmount = async (params) => {
	const data = await axios.post(TRANSACTIONS_URL, params)
	if (data) return data.data.paging.pageCount
}
