import axios from 'axios'
import KVStore from '@store/kv'
import store from '@app/refactor/redux/store'
import {
	setAppToast,
	setGeneralError,
	setLastRequestUiErrorType,
} from '@store/redux/common/slice'
import { navigationRef } from '@app/refactor/setup/nav'
import { retryUnauthorizedCall } from '@store/redux/auth/api'

axios.interceptors.request.use((request) => {
	const hasToast: boolean | undefined = request.headers.toast
	const requestName: string | undefined = request.headers.requestName
	const accessToken = store.getState().auth.accessToken

	const needsToken =
		requestName !== 'fetchTranslations' && requestName !== 'fetchCountries'

	if (accessToken && needsToken) {
		request.headers.Authorization = `Bearer ${accessToken}`
	}
	store.dispatch(
		setLastRequestUiErrorType(hasToast ? 'AppToast' : 'GeneralError')
	)

	// TODO?: Save requestName

	delete request.headers.toast
	delete request.headers.requestName
	return request
})

axios.interceptors.response.use(
	// 200-299, we receive logical errors with 200
	(response) => {
		const errors: UiErrorData[] = response.data.errors || []
		if (errors.length > 0) {
			console.log('dispatchin')
			store.dispatch(setAppToast(errors[0])) //general_error
		}
		return response
	},
	// 400-599
	(err) => {
		handleError(err)
		return err
	}
)

const handleError = async (err: any) => {
	if (!err.response) return

	const state = store.getState()

	const status: number = err.response.status
	const uiError: UiErrorData | undefined = err.response.data
	const invalidGrant = err.response.data.error === 'invalid_grant'

	if (status > 401) {
		if (state.common.lastRequestUiError === 'AppToast') {
			store.dispatch(setAppToast(uiError))
		} else {
			store.dispatch(setGeneralError(uiError))
		}
	}

	if (status === 401) {
		const refreshToken = KVStore.get('refreshToken')
		if (refreshToken) {
			const response = await retryUnauthorizedCall(err.config)
			return response
		} else {
			KVStore.del('refreshToken')
			navigationRef.navigate('Welcome')
		}
	}

	if (status === 400 && invalidGrant) {
		// TODO: What?
		// KVStore.del('refreshToken')
		// store.dispatch(setAccessToken(undefined))
		// navigationRef.navigate('Welcome')
		//TODO: store.dispatch({ type: 'LOGOUT' })
	}

	if (status === 503) {
		navigationRef.navigate('Maintenance')
	}
}
