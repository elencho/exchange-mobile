import axios from 'axios'
import Constants from 'expo-constants'
import { LOGIN_START_URL } from '@app/constants/api'

const authRedirectUrl = Constants?.manifest?.extra?.authRedirectUrl

export const loginStart = async (code_challenge: string) => {
	const data = await axios.get<LoginStart>(LOGIN_START_URL, {
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
	const data = await axios({
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
	if (data) return data.data
}

export const loginOtp = async (otp: string, url: string) => {
	const data = await axios({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'loginOtp',
			toast: false,
		},
		url,
		data: `otp=${otp}`,
	})
	if (data) return data.data
}
