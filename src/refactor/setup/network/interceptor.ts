import axios from 'axios'
import store from '@app/refactor/redux/store'
import {
	setAppToast,
	setLastRequestUiErrorType,
} from '@store/redux/common/slice'
import { navigationRef } from '@app/refactor/setup/nav'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import { resetAuth } from '@store/redux/auth/slice'
import {
	saveGeneralError,
	setRequestName,
} from '@app/refactor/redux/errors/errorsSlice'
import SecureKV from '@store/kv/secure'

axios.interceptors.request.use((request) => {
	const hasToast: boolean = request.headers.toast === false ? false : true
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

	//TODO: Remove this when wallets are refactored
	requestName && store.dispatch(setRequestName(requestName))

	delete request.headers.toast
	delete request.headers.requestName
	return request
})

axios.interceptors.response.use(
	// 200-299, we receive logical errors with 200
	(response) => {
		const errors: UiErrorData[] = response.data.errors || []
		if (errors.length > 0) {
			//TODO: Remove this when wallets are refactored
			store.dispatch(saveGeneralError(errors[0]))
		}
		return response
	},
	// 400-599
	(err) => {
		return handleError(err)
	}
)

const handleError = async (err: any) => {
	const state = store.getState()

	const status: number = err.response.status
	const uiError: UiErrorData | undefined = err.response.data
	const invalidGrant = err.response.data.error === 'invalid_grant'

	if (status > 401) {
		console.log(err.response.data)
		if (state.common.lastRequestUiError === 'AppToast') {
			console.log('toast', uiError)
			store.dispatch(setAppToast(uiError))
		} else {
			console.log('general', uiError)
			//TODO: Remove this when wallets are refactored
			if (uiError) store.dispatch(saveGeneralError(uiError))
		}
	}

	const oldRefresh = await SecureKV.get('refreshToken')
	if (status === 401) {
		const response = await retryUnauthorizedCall(err.config, oldRefresh)
		if (response) {
			return response
		} else {
			store.dispatch(resetAuth())
			navigationRef.navigate('Welcome')
		}
	}

	if (status === 400 && invalidGrant) {
		store.dispatch(resetAuth())
		navigationRef.navigate('Welcome')
	}

	if (status === 503) {
		navigationRef.navigate('Maintenance')
	}

	return err
}
