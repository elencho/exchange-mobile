import axios from 'axios'
import KVStore from '@store/kv'
import store from '@app/refactor/redux/store'
import {
	setAccessToken,
	setGeneralError,
	setIsToast as setLastRequestToast,
} from '@store/redux/common/slice'
import { navigationRef } from '@app/refactor/setup/nav'
import { refreshTokenAndRetryCall } from '@store/redux/auth/api'

axios.interceptors.request.use((request) => {
	const hasToast: boolean | undefined = request.headers.toast
	const requestName: string | undefined = request.headers.requestName
	const accessToken = store.getState().common.accessToken

	const needsToken =
		requestName !== 'fetchTranslations' && requestName !== 'fetchCountries'

	if (accessToken && needsToken) {
		request.headers.Authorization = `Bearer ${accessToken}`
	}
	store.dispatch(setLastRequestToast(hasToast === true))
	// TODO?: Save requestName

	delete request.headers.toast
	delete request.headers.requestName
	return request
})

axios.interceptors.response.use(
	// 200-299, we receive logical errors with 200
	(response) => {
		const errors: GeneralErrorData[] = response.data.errors || []
		if (errors.length > 0) {
			store.dispatch(setGeneralError(errors[0]))
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

	const invalidGrant = err.response.data.error === 'invalid_grant'
	const status: number = err.response.status
	const generalError: GeneralErrorData | undefined = err.response.data

	const params =
		generalError?.transParams && Object.keys(generalError?.transParams)
	const header = generalError?.errorKey
	const body = !generalError?.transParams
		? generalError?.errorMessage
		: `${generalError?.errorMessage} params{${params?.join()}}`

	if (status > 401) {
		if (state.common.lastRequestErrorToast) {
			// TODO: AppToast
		} else {
			store.dispatch(setGeneralError(generalError))
		}
	}

	if (status === 401) {
		const refreshToken = KVStore.get('refreshToken')
		if (refreshToken) {
			const response = await refreshTokenAndRetryCall(err.config)
			return response
		}
	}

	if (status === 400 && invalidGrant) {
		KVStore.del('refreshToken')
		store.dispatch(setAccessToken(undefined))
		navigationRef.navigate('Welcome')
		//TODO: store.dispatch({ type: 'LOGOUT' })
	}

	if (status === 503) {
		navigationRef.navigate('Maintenance')
	}
}
