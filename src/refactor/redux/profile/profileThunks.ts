import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	fetchUserInfoUtil,
	updatePasswordUtil,
	subscribeMail,
	unsubscribeMail,
	updateUserData,
	updatePhoneNumber,
} from './profileApi'
import { getOtpChangeToken } from '@app/utils/userProfileUtils'

export const updatePhoneNumberThunk = createAsyncThunk(
	'profile/updatePhoneNumber',
	async ({
		phoneNumber,
		phoneCountry,
		hideModal,
	}: {
		phoneNumber: string
		phoneCountry: string
		hideModal: () => void
	}) => {
		try {
			const response = await updatePhoneNumber(phoneNumber, phoneCountry)
			if (response?.status >= 200 && response?.status < 300) {
				hideModal()
			}
			return response
		} catch (error) {
			return error
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
	async ({
		localUserInfo,
		hide,
	}: {
		localUserInfo: EditProfileParams
		hide: () => void
	}) => {
		try {
			const response = await updateUserData(localUserInfo)
			if (response?.status >= 200 && response?.status < 300) {
				hide()
				const userInfo = await fetchUserInfoUtil()
				return userInfo
			}
		} catch (error) {
			console.log(error)
		}
	}
)

export const updatePasswordThunk = createAsyncThunk(
	'profile/updatePassword',
	async ({
		currentPassword,
		newPassword,
		repeatPassword,
		hide,
	}: UpdatePasswordData) => {
		try {
			const response = await updatePasswordUtil(
				currentPassword,
				newPassword,
				repeatPassword
			)
			if (response?.status >= 200 && response?.status < 300) {
				hide()
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
			throw error
		}
	}
)

export const credentialsForGoogleThunk = createAsyncThunk(
	'profile/credentialsForGoogle',
	async ({ OTP, openModal, otpType }: CredentialsForEmailData) => {
		try {
			const response = await getOtpChangeToken(OTP, otpType)

			if (response) {
				openModal(true)
			}

			return response
		} catch (error) {
			throw error
		}
	}
)
