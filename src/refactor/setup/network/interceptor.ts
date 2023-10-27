// import axios from 'axios'
// import KVStore from '@store/kv'
// import store from '@app/refactor/redux/store'

// interface RequestHeaders {
// 	toast?: boolean
// 	requestName?: string
// }

// axios.interceptors.request.use((request) => {
// 	const hasToast: boolean | undefined = request.headers.toast
// 	const requestName: string | undefined = request.headers.requestName

// 	const token = KVStore.get('accessToken') //TODO: Redux
// 	const needsToken =
// 		requestName !== 'fetchTranslations' && requestName !== 'fetchCountries'

// 	if (token && needsToken) {
// 		request.headers.Authorization = `Bearer ${token}`
// 	}
// 	// TODO: Save isToast, requestName

// 	delete request.headers.toast
// 	delete request.headers.requestName
// 	return request
// })

// axios.interceptors.response.use(
// 	(response) => {
// 		const state = store.getState()
// 		return response
// 	},
// 	(err) => {
// 		return err
// 	}
// )

// const handleError = (err: any) => {}
