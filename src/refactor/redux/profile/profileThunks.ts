import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	fetchUserInfoUtil,
	updatePasswordUtil,
	subscribeMail,
	unsubscribeMail,
	updateUserData,
	updatePhoneNumber,
	getOtpChangeToken,
} from './profileApi'
import { setUserInfo, setUserProfileLoading } from './profileSlice'

export const updatePhoneNumberThunk = createAsyncThunk(
	'profile/updatePhoneNumber',
	async (
		{
			phoneNumber,
			phoneCountry,
			verificationCode,
			changeOTPToken,
			onSuccess,
		}: {
			phoneNumber: string
			phoneCountry: string
			verificationCode?: string
			changeOTPToken?: string
			onSuccess: () => void
		},
		{ dispatch }
	) => {
		try {
			const response = await updatePhoneNumber(
				phoneNumber,
				phoneCountry,
				verificationCode,
				changeOTPToken
			)
			if (response?.status >= 200 && response?.status < 300) {
				onSuccess()
				dispatch(fetchUserInfoThunk())
			}
			const userInfo = await fetchUserInfoUtil()
			dispatch(setUserInfo(userInfo!))
			return response
		} catch (error) {
			console.log(error)
		}
	}
)

export const fetchUserInfoThunk = createAsyncThunk(
	'profile/fetchUserInfo',
	async () => {
		try {
			const userInfo = await fetchUserInfoUtil()
			return userInfo
		} catch (error) {
			console.log(error)
		}
	}
)

export const updateUserThunk = createAsyncThunk(
	'profile/updateUser',
	async (
		{
			localUserInfo,
			hide,
		}: {
			localUserInfo: EditProfileParams
			hide: () => void
		},
		{ dispatch }
	) => {
		try {
			const response = await updateUserData(localUserInfo)
			if (response?.status >= 200 && response?.status < 300) {
				hide()
				dispatch(fetchUserInfoThunk())
			}
			return response
		} catch (error) {
			console.log(error)
		}
	}
)

export const updatePasswordThunk = createAsyncThunk(
	'profile/updatePassword',
	async (
		{
			currentPassword,
			newPassword,
			repeatPassword,
			onSuccess,
		}: UpdatePasswordData,
		{ dispatch }
	) => {
		try {
			const response = await updatePasswordUtil(
				currentPassword,
				newPassword,
				repeatPassword
			)
			if (response?.status >= 200 && response?.status < 300) {
				onSuccess()
				dispatch(fetchUserInfoThunk())
			}
			return response
		} catch (error) {
			console.log(error)
		}
	}
)

export const toggleSubscriptionThunk = createAsyncThunk(
	'profile/toggleSubscription',
	async ({ value }: ToggleSubscriptionData) => {
		try {
			if (value === false) {
				unsubscribeMail()
			} else {
				subscribeMail()
			}

			const userInfo = await fetchUserInfoUtil()

			return userInfo
		} catch (error) {
			console.log('first error', error)
		}
	}
)

export const credentialsForChangeOTPThunk = createAsyncThunk(
	'profile/credentialsForChangeOTP',
	async (
		{ OTP, otpType, onSuccess }: CredentialsForEmailData,
		{ dispatch }
	) => {
		try {
			const response = await getOtpChangeToken(OTP, otpType)
			if (
				(response?.status! >= 200 && response?.status! <= 300) ||
				(response.response?.status! >= 200 && response.response?.status! <= 300)
			) {
				dispatch(setUserProfileLoading(true))
				onSuccess()
				dispatch(setUserProfileLoading(false))
			}
			return response
		} catch (error) {
			console.log(error)
		}
	}
)
