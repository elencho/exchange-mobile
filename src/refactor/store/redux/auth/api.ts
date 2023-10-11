import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {
	CODE_TO_TOKEN,
	DICTIONARY,
	LOGIN_START_URL,
	READINESS_URL,
	REGISTRATION_START_URL,
} from '@app/constants/api'
import { AppReadiness, Dictionary } from '@app/refactor/types/auth/splash'

const authRedirectUrl = Constants?.manifest?.extra?.authRedirectUrl

export const fetchTranslations = async () => {
	const data = await axios.get<Dictionary>(DICTIONARY, {
		headers: { requestName: 'fetchTranslations' },
	})
	return data?.data
}

export const checkReadiness = async () => {
	const config = {
		params: {
			version: DeviceInfo.getVersion(),
			os: Platform.OS,
		},
	}
	const uninterceptedAxiosInstance = axios.create()
	const data = await uninterceptedAxiosInstance.get<AppReadiness>(
		READINESS_URL,
		config
	)
	return data?.data
}

export const loginStart = async (code_challenge: string) => {
	const data = await axios.get<LoginStartResponse>(LOGIN_START_URL, {
		params: {
			client_id: 'mobile-service-public',
			redirect_uri: authRedirectUrl,
			response_mode: 'form_post',
			response_type: 'code',
			scope: 'openid',
			display: 'mobile',
			code_challenge,
			code_challenge_method: 'S256',
		},
		headers: { requestName: 'loginStart', toast: false },
	})
	return data?.data
}

export const usernameAndPasswordForm = async (
	username: string,
	password: string,
	url: string
) => {
	const data = await axios<LoginFormResponse>({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'usernameAndPasswordForm',
			toast: false,
		},
		url,
		data: `username=${encodeURIComponent(
			username
		)}&password=${encodeURIComponent(password)}`,
	})
	return data?.data
}

export const resendEmail = async (callbackUrl: string) => {
	const data = await axios.get<ResendOtpResponse>(`${callbackUrl}&resend=true`)
	return data?.data
}

export const resetOtp = async (callbackUrl: string) => {
	const data = await axios<ResetOtpResponse>({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'resetOtp',
			toast: false,
		},
		url: callbackUrl,
		data: `resetOTP=true`,
	})
	return data?.data
}

export const loginOtp = async (otp: string, url: string) => {
	const data = await axios<OtpLoginResponse>({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'loginOtp',
			toast: false,
		},
		url,
		data: `otp=${otp}`,
	})
	return data?.data
}

export const codeToToken = async (code: string, codeVerifier: string) => {
	const data = await axios<CodeToTokenResponse>({
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		url: CODE_TO_TOKEN,
		data: `grant_type=authorization_code&client_id=mobile-service-public&code=${code}&redirect_uri=${authRedirectUrl}&code_verifier=${codeVerifier}&code_challenge_method=S256`,
	})
	return data?.data
}

export const registrationStart = async () => {
	const data = await axios.get<RegistrationStart>(REGISTRATION_START_URL, {
		params: {
			client_id: 'mobile-service-public',
			redirect_uri: authRedirectUrl,
			response_mode: 'form_post',
			response_type: 'code',
			scope: 'openid',
			display: 'mobile',
		},
		headers: { requestName: 'registrationStart', toast: false },
	})
	return data?.data
}
