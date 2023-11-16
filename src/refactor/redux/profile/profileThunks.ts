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
import {
	toggleGoogleAuthModal,
	toggleGoogleOtpModal,
} from '../modals/modalsSlice'

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
	async ({ OTP, openModal }: CredentialsForEmailData, { dispatch }) => {
		try {
			const response = await getOtpChangeToken(OTP, 'TOTP')

			if (response) {
				// dispatch(setOtpChangeToken(response.changeOTPToken))
				// dispatch(setTotpSecretObj(response.totp))
				// Replace 'delay' with your actual delay function
				// await new Promise((resolve) => setTimeout(resolve, 1000))
				dispatch(toggleGoogleOtpModal(true))
			}

			return response
		} catch (error) {
			throw error
		}
	}
)

export const activateGoogleThunk = createAsyncThunk(
	'profile/activateGoogle',
	async (data: ActivateGoogleData, { dispatch, getState }) => {
		try {
			const { OTP } = data

			const otpChangeToken = getState().profile.tOTPChangeParams.changeOTPToken
			const totpSecret = getState().profile.tOTPChangeParams.totp.totpSecret

			const status = await activateGoogleOtp(otpChangeToken, OTP, totpSecret)

			if (status && status >= 200 && status < 300) {
				await fetchUserInfoUtil()

				// if (typeof token === 'string') {
				// 	await dispatch({ type: 'OTP_SAGA', token })
				// }
			}
			// TODO: this loading
			// setGoogleAuthLoading(false)

			return status
		} catch (error) {
			throw error
		}
	}
)
