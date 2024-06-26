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
import { setTabRouteName } from '@app/redux/transactions/actions'
import { setUserInfo } from '@app/refactor/redux/profile/profileSlice'
import { resetTradesState } from '@app/redux/trade/actions'
import { saveUserInfo, setCredentials } from '@app/redux/profile/actions'
import { resetTransactionsState } from '@app/redux/transactions/actions'
import { resetWalletState } from '@app/redux/wallet/actions'
import { resetModalsState } from '@app/redux/modals/actions'

axios.interceptors.request.use((request) => {
	const hasToast: boolean = request.headers.toast === false ? false : true
	const requestName: string | undefined = request.headers.requestName
	const isFromRetry = request.headers.isFromRetry
	const accessToken = store.getState().auth.accessToken

	const needsToken =
		requestName !== 'fetchTranslations' &&
		requestName !== 'fetchCountries' &&
		requestName !== 'refreshToken'

	if (accessToken && needsToken) {
		request.headers.Authorization = `Bearer ${accessToken}`
	}
	store.dispatch(
		setLastRequestUiErrorType(
			hasToast && !isFromRetry ? 'AppToast' : 'GeneralError'
		)
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
		if (state.common.lastRequestUiError === 'AppToast') {
			store.dispatch(setAppToast(uiError))
		} else {
			//TODO: Remove this when wallets are refactored
			if (uiError) store.dispatch(saveGeneralError(uiError))
		}
	}

	const clearReduxStates = () => {
		store.dispatch(resetAuth())
		store.dispatch(setUserInfo(null))
		store.dispatch(setTabRouteName('Trade'))

		// saga
		store.dispatch(resetTradesState())
		store.dispatch(saveUserInfo({}))
		store.dispatch(setCredentials({}))
		store.dispatch(resetTransactionsState())
		store.dispatch(resetWalletState())
		store.dispatch(resetModalsState())
	}

	const oldRefresh = await SecureKV.get('refreshToken')
	if (status === 401) {
		const response = await retryUnauthorizedCall(err.config, oldRefresh)
		if (response) {
			return response
		} else {
			navigationRef.reset({
				index: 0,
				routes: [{ name: 'Welcome' }],
			})

			clearReduxStates()
		}
	}

	if (status === 400 && invalidGrant) {
		navigationRef.reset({
			index: 0,
			routes: [{ name: 'Welcome' }],
		})

		clearReduxStates()
	}

	if (status === 503) {
		navigationRef.navigate('Maintenance')
	}

	return err
}
