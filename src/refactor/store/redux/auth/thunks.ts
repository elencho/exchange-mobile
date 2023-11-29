import { setAuthLoading } from '@store/redux/auth/slice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createAsyncThunk } from '@reduxjs/toolkit'
import pkceChallenge from 'react-native-pkce-challenge'
import { Route, Screens } from '@app/refactor/setup/nav/nav'
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
	registrationForm,
	verifyAccount,
	logout,
} from './api'
import { resetAuth, savePkceInfo, setTimer, setTokens } from './slice'
import { navigationRef } from '@app/refactor/setup/nav'
import { setUserInfo } from '@app/refactor/redux/profile/profileSlice'

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
				navigation.navigate('EmailVerification', { from: 'Login' })
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
			navigation: NativeStackNavigationProp<Screens, any>
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
			navigation.navigate('EmailVerification', { from: 'Login', mail })
		}
		return userAndPassInfo
	}
)

export const forgotPasswordStartThunk = createAsyncThunk(
	'forgotPasswordStart',
	async (
		{ navigation }: { navigation: NativeStackNavigationProp<Screens, any> },
		{}
	) => {
		const data = await forgotPassword()

		if (data.execution === Execution.RESET_PASSWORD_WITH_CODE) {
			navigation.navigate('ForgotPassword')
		} else if (data.execution === Execution.LOGIN_OTP) {
			navigation.navigate('Login2Fa')
		}

		return { callbackUrl: data.callbackUrl }
	}
)

export const resendPasswordCodeThunk = createAsyncThunk(
	'resetPassword',
	async ({ mail }: { mail: string }, { getState }) => {
		const { callbackUrl } = (getState() as RootState).auth

		const data = await resetPassword(callbackUrl, mail)
		const timerVisible =
			data.execution === Execution.RESET_PASSWORD_WITH_CODE &&
			data.errors.length === 0

		return {
			timerVisible,
			callbackUrl: data.callbackUrl,
		}
	}
)

export const resetPasswordConfirmCodeThunk = createAsyncThunk(
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
		{ getState, dispatch }
	) => {
		const state = (getState() as RootState).auth
		const data = await resetPasswordOtp(state.callbackUrl, mail, otp)

		if (data.execution === Execution.LOGIN_OTP) {
			navigation.replace('Login2Fa')
		} else if (data.execution === Execution.EMAIL_VERIFICATION_OTP) {
			navigation.navigate('EmailVerification', {
				from: 'ForgotPassword',
				mail,
			})
		}

		return data
	}
)

export const resetOtpThunk = createAsyncThunk(
	'resetOtp',
	async (navigation: NativeStackNavigationProp<Screens, any>, { getState }) => {
		const state = (getState() as RootState).auth

		const data = await resetOtp(state.callbackUrl)
		const resetType: ResetOtp | undefined = data.attributes.resetOTPInstructions
			? 'Support'
			: data.attributes.resetOTP && data.attributes.otpType === 'EMAIL'
			? 'Manual'
			: undefined

		navigation.replace('ResetOtpInstructions', {
			resetOtpType: resetType,
		})
		return { callbackUrl: data.callbackUrl }
	}
)

export const resendOtpThunk = createAsyncThunk(
	'resendOtp',
	async (_, { getState }) => {
		const { callbackUrl } = (getState() as RootState).auth
		const resendInfo = await resendEmail(callbackUrl)
		return { callbackUrl: resendInfo.callbackUrl }
	}
)

export const otpForLoginThunk = createAsyncThunk(
	'otpForLogin',
	async (
		{
			otp,
			navigation,
		}: {
			otp: string
			navigation: NativeStackNavigationProp<Screens, any>
		},
		{ dispatch, getState }
	) => {
		const { callbackUrl } = (getState() as RootState).auth

		const loginInfo = await loginOtp(otp, callbackUrl)

		try {
			if (loginInfo?.errors && loginInfo.errors.length !== 0) {
				dispatch(setAuthLoading(false))
				return loginInfo
			}

			if (loginInfo.execution === Execution.UPDATE_PASSWORD) {
				navigation.navigate('SetNewPassword')
			} else if (loginInfo.execution === Execution.LOGIN_USERNAME_PASSWORD) {
				navigation.navigate('Login')
			} else {
				dispatch(
					codeToTokenThunk({ code: loginInfo.code, from: 'Login', navigation })
				)
			}
			return loginInfo
		} catch (e) {
			console.log(e)
		}
	}
)

export const codeToTokenThunk = createAsyncThunk(
	'codeToToken',
	async (
		{
			code,
			from,
			navigation,
		}: {
			code: string
			from: 'Login' | 'Registration' | 'SetNewPassword'
			navigation: NativeStackNavigationProp<Screens, any>
		},
		{ dispatch, getState }
	) => {
		const { pkceInfo } = (getState() as RootState).auth

		const tokenData = await codeToToken(code, pkceInfo?.codeVerifier || '')
		if (tokenData) {
			dispatch(
				setTokens({
					refreshToken: tokenData.refresh_token,
					accessToken: tokenData.access_token,
				})
			)
			navigation.navigate('Main')
		}

		setTimeout(() => {
			dispatch(setAuthLoading(false))
		}, 2000)
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
		const { callbackUrl } = (getState() as RootState).auth
		const data = await setNewPassword(callbackUrl, newPass, confirmPass)

		dispatch(
			codeToTokenThunk({ code: data.code, from: 'SetNewPassword', navigation })
		)
	}
)

export const startRegistrationThunk = createAsyncThunk(
	'startRegistration',
	async (
		{ navigation }: { navigation: NativeStackNavigationProp<Screens, any> },
		{ dispatch }
	) => {
		try {
			const pkceInfo = pkceChallenge()
			dispatch(savePkceInfo(pkceInfo))

			const data = await registrationStart()
			if (data?.execution === Execution.EMAIL_VERIFICATION_OTP) {
				navigation.navigate('EmailVerification', { from: 'Registration' })
			}
			return data
		} catch (error) {
			throw error
		}
	}
)

export const verifyRegistrationThunk = createAsyncThunk(
	'verifyRegistration',
	async (
		{
			otp,
			navigation,
		}: { otp: string; navigation: NativeStackNavigationProp<Screens, any> },
		{ dispatch, getState }
	) => {
		const { callbackUrl } = (getState() as RootState).auth

		const data = await verifyAccount(callbackUrl, otp)
		if (data?.errors && data.errors.length !== 0) return data

		if (data.execution === Execution.UPDATE_PASSWORD) {
			navigation.navigate('SetNewPassword')
		} else {
			dispatch(
				codeToTokenThunk({ code: data.code, from: 'Registration', navigation })
			)
		}
		return data
	}
)

type RegistrationFormProps = {
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
			navigationRef.navigate('EmailVerification', {
				from: 'Registration',
				mail: props.email,
			})
		}
		return data
	}
)

export const logoutThunk = createAsyncThunk(
	'logout',
	async (_, { dispatch }) => {
		const httpStatus = await logout()
		if (httpStatus === 204) {
			dispatch(resetAuth())
			dispatch(setUserInfo(null))
			navigationRef.reset({
				index: 0,
				routes: [{ name: 'Welcome' }],
			})
		}
	}
)
