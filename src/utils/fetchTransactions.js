import axios from 'axios'
import { CURRENCIES_URL, TRANSACTIONS_URL } from '../constants/api'

export const fetchTransactions = async (params) => {
	const data = await axios.post(TRANSACTIONS_URL, params)
	if (data) return data.data.data
}

export const fetchCurrencies = async () => {
	const data = await axios.get(CURRENCIES_URL)
	if (data) return data.data
}

export const totalAmount = async (params) => {
	const data = await axios.post(TRANSACTIONS_URL, params)
	if (data) return data.data.paging.pageCount
}
