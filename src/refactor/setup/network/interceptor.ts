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
import { clearTokens } from '@store/redux/auth/slice'

axios.interceptors.request.use((request) => {
	const hasToast: boolean | undefined = request.headers.toast
	const requestName: string | undefined = request.headers.requestName
	const accessToken = store.getState().auth.accessToken

	const needsToken =
		requestName !== 'fetchTranslations' &&
		requestName !== 'fetchCountries' &&
		requestName !== 'refreshToken'

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
			store.dispatch(setGeneralError(errors[0]))
		}
		return response
	},
	// 400-599
	(err) => {
		return handleError(err)
	}
)

const handleError = async (err: any) => {
	// if (!err.response) return

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
		const response = await retryUnauthorizedCall(
			err.config,
			KVStore.get('refreshToken')
		)
		if (response) {
			return response
		} else {
			store.dispatch(clearTokens())
			navigationRef.navigate('Welcome')
		}
	}

	if (status === 400 && invalidGrant) {
		store.dispatch(clearTokens())
		navigationRef.navigate('Welcome')
	}

	if (status === 503) {
		navigationRef.navigate('Maintenance')
	}

	return err
}
