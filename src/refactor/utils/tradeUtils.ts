import axios from 'axios'
import { TRADES_URL_PAGED } from '@app/constants/api'

export const fetchTrades = async (params: FetchTradesRequest) => {
	const data = await axios.post<FetchTradesResponse>(TRADES_URL_PAGED, params)
	return data?.data
}
