import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
import pkceChallenge from 'react-native-pkce-challenge'
import { delay } from 'redux-saga/effects'
import KVStorage from '@store/kv'
import {
	saveRegistrationStartInfo,
	setRegistrationInputs,
} from '@app/refactor/redux/profile/actions'
import { NavProp, Route, Screens } from '@app/refactor/setup/nav/nav'
import { TokenOtpType } from '@app/refactor/types/auth/splash'
import { Execution } from '@app/refactor/types/enums'
import { RootState } from '../../../redux/rootReducer'
import {
	codeToToken,
	loginOtp,
	loginStart,
	registrationStart,
	resendEmail,
	resetOtp,
	usernameAndPasswordForm,
} from './api'
import { savePkceInfo } from './slice'

export const startLoginThunk = createAsyncThunk(
	'startLogin',
	async (navigation: NativeStackNavigationProp<Screens, any>, { dispatch }) => {
		try {
			const pkceInfo = pkceChallenge()
			dispatch(savePkceInfo(pkceInfo))

			const loginStartInfo = await loginStart(pkceInfo?.codeChallenge)
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
		{
			mail,
			pass,
			navigation,
		}: {
			mail: string
			pass: string
			navigation: NavProp<'Login'>
		},
		{ getState }
	) => {
		const state = (getState() as RootState).auth

		const userAndPassInfo = await usernameAndPasswordForm(
			mail,
			pass,
			state.callbackUrl
		)

		if (userAndPassInfo?.execution === Execution.LOGIN_OTP) {
			navigation.navigate('Login2Fa')
		}
		if (userAndPassInfo?.execution === Execution.EMAIL_VERIFICATION_OTP) {
			navigation.push('EmailVerification', { fromScreen: 'login' })
		}
		return userAndPassInfo
	}
)

export const resetOtpThunk = createAsyncThunk(
	'resetOtp',
	async (navigation: NativeStackNavigationProp<Screens, any>, { getState }) => {
		const state = (getState() as RootState).auth

		const resetOtpInfo = await resetOtp(state.callbackUrl)
		const resetType: ResetOtp | undefined = resetOtpInfo.attributes
			.resetOTPInstructions
			? 'Support'
			: resetOtpInfo.attributes.resetOTP &&
			  resetOtpInfo.attributes.otpType === 'EMAIL'
			? 'Manual'
			: undefined

		navigation.replace('ResetOtpInstructions', {
			resetOtpType: resetType,
		})
		return resetOtpInfo
	}
)

type ResendFrom = 'Login2Fa' | 'EmailVerification' | 'TODO:SMS_EMAIL_MODAL'

export const resendOtpThunk = (from: ResendFrom) =>
	createAsyncThunk('resendOtp', async (_, { dispatch, getState }) => {
		const state = (getState() as RootState).auth
		state.authLoading = true

		//TODO: SmsEmail
		//TODO: Registration
		const resendInfo = await resendEmail(state.callbackUrl)
		state.callbackUrl = resendInfo.callbackUrl

		state.authLoading = false
	})()

export const otpForLoginThunk = (
	otp: string,
	from: Route,
	navigation: NativeStackNavigationProp<Screens, any>
) =>
	createAsyncThunk('otpForLogin', async (_, { dispatch, getState }) => {
		const state = (getState() as RootState).auth
		const { callbackUrl, pkceInfo } = state

		delay(500)
		state.authLoading = true
		const loginInfo = await loginOtp(otp, callbackUrl)

		// TODO: profile->forgotPassMode
		if (loginInfo.errors) {
			// SAVE_FORGOT_PASS_INFO ?
			if (loginInfo.execution === Execution.UPDATE_PASSWORD) {
				navigation.navigate('SetNewPassword')
			}
		} else {
			dispatch(
				codeToTokenThunk(
					loginInfo.code,
					pkceInfo?.codeVerifier,
					from,
					navigation
				)
			)
		}

		delay(2000)
		state.authLoading = false
		return loginInfo
	})()

const codeToTokenThunk = (
	code: string,
	codeVerifier: string | undefined,
	from: Route,
	navigation: NativeStackNavigationProp<Screens, any>
) =>
	createAsyncThunk('codeToToken', async (_, { dispatch }) => {
		const tokenData = await codeToToken(code, codeVerifier || '')

		KVStorage.set('accessToken', tokenData.access_token)
		KVStorage.set('refreshToken', tokenData.refresh_token)

		dispatch(saveOtpThunk(tokenData.access_token))

		// TODO: Go to userProfile sometimes?
		KVStorage.set('isLoggedIn', true)
		navigation.replace('Main')

		// TODO: If from registration
		// TODO: if (fromResetOtp) yield put(switchPersonalSecurity('Security'))
	})()

export const saveOtpThunk = (token: string) =>
	createAsyncThunk('saveOtp', async (_, { getState }) => {
		const otpType = jwt_decode<TokenOtpType>(token)?.otpType
		if (otpType) {
			const state = (getState() as RootState).auth
			state.otpType = otpType
		}
	})()

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
