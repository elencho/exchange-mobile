import { createAsyncThunk } from '@reduxjs/toolkit'
import pkceChallenge from 'react-native-pkce-challenge'
import { loginStart } from '@app/utils/userProfileUtils'
import {
	saveLoginStartInfo,
	savePkceInfo,
	saveVerificationInfo,
} from '../profile/actions'

// function* startLoginSaga(action) {
// 	const pkceInfo = pkceChallenge()
// 	const { navigation } = action
// 	if (pkceInfo) {
// 		yield put(savePkceInfo(pkceInfo))
// 		const loginStartInfo = yield call(loginStart, pkceInfo?.codeChallenge)

// 		yield put(saveLoginStartInfo(loginStartInfo))
// 		if (loginStartInfo?.execution === 'LOGIN_USERNAME_PASSWORD') {
// 			navigation.navigate('Login')
// 		}
// 		if (loginStartInfo?.execution === 'EMAIL_VERIFICATION_OTP') {
// 			navigation.push('EmailVerification', { fromScreen: 'login' })
// 			yield put(saveVerificationInfo(loginStartInfo))
// 		}
// 	}
// }

export const startLogin = createAsyncThunk(
	'auth/startLogin',
	async (_, { dispatch, getState }) => {
		try {
			const pkceInfo = pkceChallenge() // Replace with your pkceChallenge logic
			const loginStartInfo = await loginStart(pkceInfo?.codeChallenge) // Replace with your loginStart logic

			// Dispatch actions and handle navigation based on loginStartInfo
			dispatch(savePkceInfo(pkceInfo))
			dispatch(saveLoginStartInfo(loginStartInfo))

			if (loginStartInfo?.execution === 'LOGIN_USERNAME_PASSWORD') {
				// Navigation logic here
			}

			if (loginStartInfo?.execution === 'EMAIL_VERIFICATION_OTP') {
				// Navigation logic here
				dispatch(saveVerificationInfo(loginStartInfo))
			}

			// Return the result to be used as the action.payload
			return loginStartInfo
		} catch (error) {
			// Handle errors here
			throw error
		}
	}
)
