import { OFFERS_NEW_URL } from '@app/constants/api'
import axios from 'axios'

export const fetchOffersApi = async () => {
	const data = await axios.get<OffersResponse>(OFFERS_NEW_URL, {
		headers: { toast: false, requestName: 'fetchOffers' },
	})
	return data?.data
}
