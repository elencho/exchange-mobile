import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import KVStore from '@store/kv'
import store from '../redux/store'
import handleError from './errorHandling'

axios.interceptors.request.use(async (config) => {
	const {
		headers: { toast, requestName },
	} = config

	const dictionaryReq = requestName === 'fetchTranslations'
	const token = KVStore.get('accessToken')
	if (token && !dictionaryReq) config.headers.Authorization = `Bearer ${token}`
	const isToast = toast === false ? false : true

	store.dispatch({ type: 'SET_IS_TOAST', isToast })

	requestName && store.dispatch({ type: 'SET_REQUEST_NAME', requestName })

	delete config.headers.toast
	delete config.headers.requestName

	return config
})

axios.interceptors.response.use(
	(response) => {
		const state = store.getState()
		state.errors.generalError &&
			store.dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })

		setTimeout(() => {
			response?.data?.errors?.length &&
				store.dispatch({
					type: 'SAVE_GENERAL_ERROR',
					generalError: response?.data?.errors[0],
				})
		}, 500)

		return response
	},
	async (err) => {
		const response = await handleError(err)
		return response
	}
)
