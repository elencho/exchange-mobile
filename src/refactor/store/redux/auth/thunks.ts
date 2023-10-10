import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createAsyncThunk } from '@reduxjs/toolkit'
import pkceChallenge from 'react-native-pkce-challenge'
import {
	saveRegistrationStartInfo,
	setRegistrationInputs,
} from '@app/refactor/redux/profile/actions'
import { NavProp, Screens } from '@app/refactor/setup/nav/nav'
import { Execution } from '@app/refactor/types/enums'
import { RootState } from '../../../redux/rootReducer'
import { loginStart, registrationStart, usernameAndPasswordForm } from './api'
import { savePkceInfo } from './slice'

export const startLoginThunk = createAsyncThunk(
	'startLogin',
	async (
		navigation: NativeStackNavigationProp<Screens, 'Login'>,
		{ dispatch }
	) => {
		try {
			const pkceInfo = pkceChallenge()
			dispatch(savePkceInfo(pkceInfo))

			const loginStartInfo = await loginStart(pkceInfo?.codeChallenge)
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
		{
			mail,
			pass,
			navigation,
		}: {
			mail: string
			pass: string
			navigation: NativeStackNavigationProp<Screens, 'Login'>
		},
		{ getState }
	) => {
		const { callbackUrlLogin } = (getState() as RootState).auth

		const userAndPassInfo = await usernameAndPasswordForm(
			mail,
			pass,
			callbackUrlLogin
		)
		if (userAndPassInfo?.execution === Execution.LOGIN_OTP) {
			navigation.navigate('Login2Fa')
		}
		if (userAndPassInfo?.execution === Execution.EMAIL_VERIFICATION_OTP) {
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

export const startRegistrationThunk = createAsyncThunk(
	'startRegistration',
	async (navigation: NavProp<'Welcome'>, { dispatch }) => {
		dispatch(setRegistrationInputs({}))
		const pkceInfo = pkceChallenge()

		if (pkceInfo) {
			dispatch(savePkceInfo(pkceInfo))
			const regInfo = await registrationStart()
			dispatch(saveRegistrationStartInfo(regInfo))

			if (regInfo?.execution === Execution.REGISTRATION_START) {
				navigation.navigate('Registration')
			}
			if (regInfo?.execution === Execution.EMAIL_VERIFICATION_OTP) {
				navigation.push('EmailVerification', { fromScreen: 'registration' })
			}
		}
	}
)
