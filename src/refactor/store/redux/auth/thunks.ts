import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
import pkceChallenge from 'react-native-pkce-challenge'
import { delay } from 'redux-saga/effects'
import KVStore from '@store/kv'
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
	forgotPassword,
	resetPassword,
	resetPasswordOtp,
	setNewPassword,
	fetchCountries,
	registrationForm,
	verifyAccount,
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
				navigation.push('EmailVerification', { from: 'Login' })
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

export const resendOtpThunk = createAsyncThunk(
	'resendOtp',
	async ({ from }: { from: ResendFrom }, { dispatch, getState }) => {
		const state = (getState() as RootState).auth

		//TODO: SmsEmail Modal
		//TODO: Registration
		const resendInfo = await resendEmail(state.callbackUrl)
		return { callbackUrl: resendInfo.callbackUrl }
	}
)

export const otpForLoginThunk = createAsyncThunk(
	'otpForLogin',
	async (
		{
			otp,
			from,
			navigation,
		}: {
			otp: string
			from: Route
			navigation: NativeStackNavigationProp<Screens, any>
		},
		{ dispatch, getState }
	) => {
		const state = (getState() as RootState).auth
		const { callbackUrl, pkceInfo } = state

		state.authLoading = true
		const loginInfo = await loginOtp(otp, callbackUrl)

		// TODO: profile->forgotPassMode
		if (loginInfo.execution === Execution.UPDATE_PASSWORD) {
			navigation.navigate('SetNewPassword')
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

		return loginInfo
	}
)

const codeToTokenThunk = (
	code: string,
	codeVerifier: string | undefined,
	from: Route,
	navigation: NativeStackNavigationProp<Screens, any>
) =>
	createAsyncThunk('codeToToken', async (_, {}) => {
		const tokenData = await codeToToken(code, codeVerifier || '')
		KVStore.set('accessToken', tokenData.access_token)
		KVStore.set('refreshToken', tokenData.refresh_token)

		const otpType = jwt_decode<TokenOtpType>(tokenData.access_token)?.otpType

		if (navigation) {
			KVStore.set('isLoggedIn', true)
			if (from === 'Login2Fa') {
				navigation.navigate('UserProfile')
			} else {
				navigation.navigate('Main')
			}
		}

		// TODO: If from registration
		// TODO: if (from === 'Login2Fa') yield put(switchPersonalSecurity('Security'))

		return { otpType }
	})()

export const forgotPasswordStartThunk = createAsyncThunk(
	'forgotPasswordStart',
	async (
		{ navigation }: { navigation: NativeStackNavigationProp<Screens, any> },
		{ getState }
	) => {
		const state = (getState() as RootState).auth
		const data = await forgotPassword()

		if (data.execution === Execution.RESET_PASSWORD_WITH_CODE) {
			navigation.navigate('ForgotPassword')
		} else if (data.execution === Execution.LOGIN_OTP) {
			navigation.navigate('Login2Fa')
		}

		return { callbackUrl: data.callbackUrl }
	}
)

export const resetPasswordThunk = createAsyncThunk(
	'resetPassword',
	async ({ mail }: { mail: string }, { getState }) => {
		const { callbackUrl } = (getState() as RootState).auth

		const data = await resetPassword(callbackUrl, mail)
		const timerVisible =
			data.execution == Execution.RESET_PASSWORD_WITH_CODE &&
			data.errors.length == 0

		return { timerVisible, callbackUrl: data.callbackUrl }
	}
)

export const resetPasswordOtpThunk = createAsyncThunk(
	'resetPasswordOtp',
	async (
		{
			mail,
			otp,
			navigation,
		}: {
			mail: string
			otp: string
			navigation: NativeStackNavigationProp<Screens, any>
		},
		{ getState }
	) => {
		const state = (getState() as RootState).auth
		const data = await resetPasswordOtp(state.callbackUrl, mail, otp)

		if (data.execution === Execution.LOGIN_OTP) {
			navigation.navigate('Login2Fa')
		}
		return { callbackUrl: data.callbackUrl }
	}
)

export const setNewPasswordOtpThunk = createAsyncThunk(
	'setNewPassword',
	async (
		{
			newPass,
			confirmPass,
			navigation,
		}: {
			newPass: string
			confirmPass: string
			navigation: NativeStackNavigationProp<Screens, any>
		},
		{ dispatch, getState }
	) => {
		const { callbackUrl, pkceInfo } = (getState() as RootState).auth
		const data = await setNewPassword(callbackUrl, newPass, confirmPass)

		dispatch(
			codeToTokenThunk(
				data.code,
				pkceInfo?.codeVerifier,
				'SetNewPassword',
				navigation
			)
		)
	}
)

export const startRegistrationThunk = createAsyncThunk(
	'startRegistration',
	async (_, {}) => {
		return await registrationStart()
	}
)

export const verifyRegistrationThunk = createAsyncThunk(
	'verifyRegistration',
	async ({ otp }: { otp: string }, { getState }) => {
		const { callbackUrl, pkceInfo } = (getState() as RootState).auth

		const data = await verifyAccount(callbackUrl, otp)

		//const verified = yield call(verifyAccount, verificationInfo?.callbackUrl, otp)
		// if (verified?.code) {
		// 	yield put({
		// 		type: 'CODE_TO_TOKEN_SAGA',
		// 		code: verified.code,
		// 		codeVerifier,
		// 		fromRegistration: true,
		// 		navigation,
		// 	})
		// } else {
		// 	yield put(saveVerificationInfo(verified))
		// }
		return data
	}
)

type RegistrationFormProps = {
	navigation: NavProp<'Register'>
	clientType: UserType
	email: string
	passwordNew: string
	passwordConfirm: string
	phoneCountry: string
	phoneNumber: string
	referralCode: string
	// TODO promo: string
}
export const registrationFormThunk = createAsyncThunk(
	'registrationForm',
	async (props: RegistrationFormProps, { getState }) => {
		const { callbackUrl } = (getState() as RootState).auth

		const data = await registrationForm(
			callbackUrl,
			props.clientType,
			props.email,
			props.passwordNew,
			props.passwordConfirm,
			props.phoneCountry,
			props.phoneNumber,
			props.referralCode
		)
		if (data?.execution === Execution.EMAIL_VERIFICATION_OTP) {
			props.navigation.push('EmailVerification', { fromScreen: 'registration' })
		}
		return data
	}
)

export const fetchCountriesThunk = createAsyncThunk(
	'fetchCountries',
	async (_, { getState }) => {
		const { countries } = (getState() as RootState).auth
		if (countries.length > 0) {
			return []
		} else {
			const data = await fetchCountries()
			return data
		}
	}
)
