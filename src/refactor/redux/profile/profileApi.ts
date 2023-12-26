import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import {
	ACTIVATE_EMAIL_OTP,
	ACTIVATE_GOOGLE_OTP,
	CODE_TO_TOKEN,
	EMAIL_VERIFICATION,
	LOGOUT,
	NOTIFICATIONS_FIREBASE,
	OTP_CHANGE_TOKEN,
	SEND_OTP,
	SUBSCRIBE_EMAIL_URL,
	UNSUBSCRIBE_EMAIL_URL,
	UPDATE_PASSWORD,
	UPDATE_PHONE_NUMBER,
	UPDATE_USER_DATA,
	USER_INFO_URL,
} from '@app/constants/api'
import SecureKV from '@store/kv/secure'

const refreshTokenService = async (refresh_token: string | null) => {
	const data = await axios({
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		url: CODE_TO_TOKEN,
		data: `grant_type=refresh_token&client_id=mobile-service-public&refresh_token=${refresh_token}`,
	})
	if (data) return data.data
}

export const refreshToken = async (config?: any) => {
	const refresh_token = await SecureKV.get('refreshToken')
	const data = await refreshTokenService(refresh_token)
	if (data) {
		if (data.access_token && data.refresh_token) {
			await SecureStore.setItemAsync('accessToken', data.access_token)
			await SecureStore.setItemAsync('refreshToken', data.refresh_token)
			if (config) return axios.request(config)
			return data.access_token
		}
	}
	// else Promise.reject().then((err) => err);
}

export const fetchUserInfoUtil = async () => {
	const data = await axios.get<UserInfoType>(USER_INFO_URL)
	if (data) return data.data
}

export const updateUserData = async (data: EditProfileParams) => {
	const userInfo = await axios({
		method: 'POST',
		url: UPDATE_USER_DATA,
		data,
		headers: {
			requestName: 'updateUserData',
			toast: false,
			'Content-Type': 'multipart/form-data',
		},
	})
	return userInfo
}

export const updatePasswordUtil = async (
	password: string,
	passwordNew: string,
	passwordConfirm: string
) => {
	const data = await axios({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'updatePassword',
			toast: false,
		},
		url: UPDATE_PASSWORD,
		data: `password=${encodeURIComponent(
			password
		)}&passwordNew=${encodeURIComponent(
			passwordNew
		)}&passwordConfirm=${encodeURIComponent(passwordConfirm)}`,
	})
	return data
}

export const updatePhoneNumber = async (
	phoneNumber: string,
	phoneCountry: string
) => {
	const data = await axios({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'updatePhoneNumber',
			toast: false,
		},
		url: UPDATE_PHONE_NUMBER,
		data: `phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}`,
	})
	return data
}

export const subscribeMail = async () => {
	const data = await axios({
		method: 'POST',
		url: SUBSCRIBE_EMAIL_URL,
		headers: { requestName: 'subscribeMail', toast: false },
	})
	return data
}

export const unsubscribeMail = async () => {
	const data = await axios({
		method: 'POST',
		url: UNSUBSCRIBE_EMAIL_URL,
		headers: { requestName: 'unsubscribeMail', toast: false },
	})
	return data
}

export const sendEmailOtp = async () => {
	await axios({
		method: 'POST',
		url: EMAIL_VERIFICATION,
	})
}

export const getOtpChangeToken = async (OTP: string, newOTPType: string) => {
	const data = await axios<tOTPVerifyParams>({
		method: 'GET',
		headers: { OTP, requestName: 'getOtpChangeToken', toast: false },
		url: OTP_CHANGE_TOKEN,
		params: { newOTPType },
	})
	return data
}

export const activateEmailOtp = async (
	changeOTPToken: string,
	verificationCode: string
) => {
	const data = await axios({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'activateEmailOtp',
			toast: false,
		},
		url: ACTIVATE_EMAIL_OTP,
		data: `changeOTPToken=${changeOTPToken}&verificationCode=${verificationCode}`,
	})
	if (data) return data!
}

export const activateGoogleOtp = async (
	changeOTPToken: string,
	totpCode: string,
	totpSecret: string
) => {
	const data = await axios({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			requestName: 'activateGoogleOtp',
			toast: false,
		},
		url: ACTIVATE_GOOGLE_OTP,
		data: `changeOTPToken=${changeOTPToken}&totpCode=${totpCode}&totpSecret=${totpSecret}`,
	})
	if (data) return data!
}

export const resendEmail = async (url: string) => {
	const data = await axios.get(`${url}&resend=true`)
	return data?.data
}

export const sendOtp = async () => await axios.post(SEND_OTP)

export const logoutUtil = async (refresh_token: string) => {
	const data = await axios({
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		url: LOGOUT,
		data: `refresh_token=${refresh_token}&client_id=mobile-service-public`,
	})
	if (data) return data.status
}
export const notificationSubscribe = async (firebaseToken: string) => {
	let form = new FormData()
	form.append('firebaseToken', firebaseToken)

	const result = await axios({
		method: 'POST',
		url: NOTIFICATIONS_FIREBASE,
		data: form,
		headers: {
			toast: false,
			'Content-Type': 'multipart/form-data',
		},
	})
	return result
}
