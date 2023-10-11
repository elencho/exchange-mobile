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
import {
	loginStart,
	registrationStart,
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

		state.otpType = userAndPassInfo.attributes.otpType

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
		state.callbackUrl = resetOtpInfo.callbackUrl

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
	}
)

export const resendOtpThunk = createAsyncThunk(
	'resendOtp',
	async (
		{
			mail,
			callbackUrl,
			navigation,
		}: {
			mail: string
			callbackUrl: string
			navigation: NativeStackNavigationProp<Screens, any>
		},
		{ dispatch, getState }
	) => {
		// TODO
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
