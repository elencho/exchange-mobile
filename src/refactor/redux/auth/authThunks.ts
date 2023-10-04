import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createAsyncThunk } from '@reduxjs/toolkit'
import pkceChallenge from 'react-native-pkce-challenge'
import { Execution } from '@app/refactor/types/enums'
import { RootState } from '../rootReducer'
import { loginOtp, loginStart, usernameAndPasswordForm } from './authApi'
import { savePkceInfo } from './authSlice'

export const startLogin = createAsyncThunk(
	'startLogin',
	async (navigation: NativeStackNavigationProp<any>, { dispatch }) => {
		try {
			const pkceInfo = pkceChallenge()
			const loginStartInfo = await loginStart(pkceInfo?.codeChallenge)

			dispatch(savePkceInfo(pkceInfo))

			if (loginStartInfo?.execution === Execution.LOGIN_USERNAME_PASSWORD) {
				navigation.navigate('Login')
			}
			if (loginStartInfo?.execution === Execution.EMAIL_VERIFICATION_OTP) {
				navigation.push('EmailVerification', { fromScreen: 'login' })
			}

			return loginStartInfo
		} catch (error) {
			throw error
		}
	}
)

export const usernameAndPaswordThunk = createAsyncThunk(
	'usernameAndPaswordThunk',
	async (
		navigation: NativeStackNavigationProp<any>,
		{ dispatch, getState }
	) => {
		const state = getState() as RootState
		const { credentials, loginStartInfo } = state.authReducer
		const { login, password } = credentials
		console.log({ login, password }, 'new', state)
		const userAndPassInfo = await usernameAndPasswordForm(
			login,
			password,
			loginStartInfo.callbackUrl
		)
		if (userAndPassInfo?.execution === 'LOGIN_OTP') {
			navigation.navigate('Login2Fa')
		}
		if (userAndPassInfo?.execution === 'EMAIL_VERIFICATION_OTP') {
			navigation.push('EmailVerification', { fromScreen: 'login' })
		}
		if (userAndPassInfo?.code) {
			// const code = userAndPassInfo?.code
			// const codeVerifier = yield select(
			// 	(state) => state.profile.pkceInfo.codeVerifier
			// )
			// yield put({ type: 'CODE_TO_TOKEN_SAGA', code, codeVerifier, navigation })
		}
		return userAndPassInfo
	}
)
