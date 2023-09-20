import * as SecureStore from 'expo-secure-store'
import SplashScreen from 'react-native-splash-screen'
import { navigationRef } from '../navigation'
import { setAppToast } from '../redux/modals/actions'
import store from '../redux/store'
import { refreshToken } from './userProfileUtils'

export default async (err) => {
	const state = store.getState()
	if (err.response) {
		const {
			response: { status, data },
		} = err
		const generalError = data
		const params = data?.transParams && Object.keys(data?.transParams)
		const header = data.errorKey
		const body = !data?.transParams
			? data?.errorMessage
			: `${data?.errorMessage} params{${params?.join()}}`

		if (status > 401) {
			if (!state.modals.isToast) {
				store.dispatch({ type: 'SAVE_GENERAL_ERROR', generalError })
			} else {
				store.dispatch(
					setAppToast({ header, body, transParams: data?.transParams })
				)
			}
		}
		if (status === 401) {
			const token = await SecureStore.getItemAsync('refreshToken')
			if (token) {
				const response = await refreshToken(err.config)
				return response
			}
		}

		if (status === 400 && data.error === 'invalid_grant') {
			await SecureStore.deleteItemAsync('accessToken')
			await SecureStore.deleteItemAsync('refreshToken')
			navigationRef.navigate('Welcome')
			store.dispatch({ type: 'LOGOUT' })
		}

		if (status === 503) {
			navigationRef.navigate('Maintanance')
		}
	}
}
