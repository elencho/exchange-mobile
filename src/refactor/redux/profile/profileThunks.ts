import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import { Screens } from '@app/refactor/setup/nav/types'
import { OTPTypes } from '@app/refactor/types/enums'
import { updatePhoneNumber } from '@app/utils/userProfileUtils'
import {
	toggleEmailAuthModal,
	toggleGoogleAuthModal,
	toggleGoogleOtpModal,
	togglePhoneNumberModal,
	toggleSmsAuthModal,
} from '../modals/modalsSlice'
import { RootState } from '../rootReducer'
import {
	refreshToken,
	fetchUserInfoUtil,
	updatePasswordUtil,
	subscribeMail,
	unsubscribeMail,
	sendEmailOtp,
	getOtpChangeToken,
	activateEmailOtp,
	activateGoogleOtp,
	resendEmail,
	sendOtp,
	logoutUtil,
} from './profileApi'
import {
	setCurrentSecurityAction,
	setEmailAuth,
	setGoogleAuth,
	setOtpChangeToken,
	setSmsAuth,
	setTotpSecretObj,
	setUserInfo,
	setVerificationInfo,
} from './profileSlice'

// TODO: fix any types
export const fetchUserInfoThunk = createAsyncThunk(
	'profile/fetchUserInfo',
	async (data: UserInfoData, { dispatch }) => {
		try {
			const userInfo = await fetchUserInfoUtil()

			return userInfo
		} catch (error) {
			console.log(error)
		}
	}
)

export const updatePasswordThunk = createAsyncThunk(
	'profile/updatePassword',
	async (data: UpdatePasswordData) => {
		try {
			const { currentPassword, newPassword, repeatPassword, hide } = data
			const response = await updatePasswordUtil(
				newPassword,
				currentPassword,
				repeatPassword
			)
			if (response?.status >= 200 && response?.status < 300) {
				hide()
			}
			return response
		} catch (error) {
			throw error
		}
	}
)

export const updatePhoneNumberThunk = createAsyncThunk(
	'profile/updatePhoneNumber',
	async (data: UpdatePhoneNumberData, { dispatch }) => {
		try {
			const { phoneNumber, phoneCountry, setUserInfoVariable } = data

			// dispatch(setIsProfileUpdating(true));

			const response = await updatePhoneNumber(phoneNumber, phoneCountry)

			if (response?.status >= 200 && response?.status < 300) {
				setUserInfoVariable(null)
				// TODO: add fetchUserInfo
				//   await dispatch(fetchUserInfo());
				dispatch(togglePhoneNumberModal(false))
			}

			return response
		} catch (error) {
			throw error
		}
	}
)

export const toggleSubscriptionThunk = createAsyncThunk(
	'profile/toggleSubscription',
	async (data: ToggleSubscriptionData, { dispatch, getState }) => {
		try {
			const { value } = data
			const userInfo = getState().profile.userInfo

			dispatch(setUserInfo({ ...userInfo, emailUpdates: value }))

			const response = value ? await subscribeMail() : await unsubscribeMail()

			if (!(response?.status >= 200 && response?.status < 300)) {
				dispatch(setUserInfo({ ...userInfo, emailUpdates: !value }))
			}

			return response
		} catch (error) {
			throw error
		}
	}
)

export const credentialsForEmailThunk = createAsyncThunk(
	'profile/credentialsForEmail',
	async (data: CredentialsForEmailData, { dispatch, getState }) => {
		try {
			const { OTP } = data
			const sms = getState().modalState.smsAuthModalVisible
			const google = getState().modalState.googleOtpModalVisible

			const response = await getOtpChangeToken(OTP, 'EMAIL')

			if (response) {
				await sendEmailOtp()
				dispatch(setOtpChangeToken(response.changeOTPToken))

				if (sms) dispatch(toggleSmsAuthModal(false))
				if (google) dispatch(toggleGoogleOtpModal(false))

				dispatch(toggleEmailAuthModal(true))
			}

			return response
		} catch (error) {
			throw error
		}
	}
)

export const credentialsForGoogleThunk = createAsyncThunk(
	'profile/credentialsForGoogle',
	async (data: CredentialsForEmailData, { dispatch }) => {
		try {
			const { OTP } = data

			const response = await getOtpChangeToken(OTP, 'TOTP')

			if (response) {
				dispatch(toggleEmailAuthModal(false))
				dispatch(setOtpChangeToken(response.changeOTPToken))
				dispatch(setTotpSecretObj(response.totp))

				// Replace 'delay' with your actual delay function
				await new Promise((resolve) => setTimeout(resolve, 1000))

				dispatch(toggleGoogleAuthModal(true))
			}

			return response
		} catch (error) {
			throw error
		}
	}
)

export const activateEmailThunk = createAsyncThunk(
	'profile/activateEmail',
	async (data: CredentialsForEmailData, { dispatch, getState }) => {
		try {
			const { OTP } = data
			const otpChangeToken = getState().profile.otpChangeToken

			const status = await activateEmailOtp(otpChangeToken, OTP)

			if (status === 200) {
				dispatch(setOtpChangeToken(null))
				dispatch(setCurrentSecurityAction(null))
				dispatch(toggleEmailAuthModal(false))

				const token = await refreshToken()

				if (typeof token === 'string') {
					// Assuming 'OTP_SAGA' is the action handled by the corresponding saga or thunk
					await dispatch({ type: 'OTP_SAGA', token })
				}
			}

			return status
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

			const otpChangeToken = getState().profile.otpChangeToken
			const totpSecret = getState().profile.totpSecretObj.totpSecret

			const status = await activateGoogleOtp(otpChangeToken, OTP, totpSecret)

			if (status && status >= 200 && status < 300) {
				dispatch(setOtpChangeToken(null))
				dispatch(setCurrentSecurityAction(null))
				dispatch(toggleGoogleAuthModal(false))

				const token = await refreshToken()

				if (typeof token === 'string') {
					await dispatch({ type: 'OTP_SAGA', token })
				}
			}
			// TODO: this loading
			// setGoogleAuthLoading(false)

			return status
		} catch (error) {
			throw error
		}
	}
)

export const otpThunk = createAsyncThunk(
	'profile/otp',
	async (data: OtpSagaData, { dispatch }) => {
		try {
			const { token } = data

			if (token) {
				const otpType = jwt_decode(token)?.otpType
				dispatch(setEmailAuth(otpType === OTPTypes.EMAIL))
				dispatch(setGoogleAuth(otpType === OTPTypes.TOTP))
				dispatch(setSmsAuth(otpType === OTPTypes.SMS))
			}
		} catch (error) {
			throw error
		}
	}
)

export const resendThunk = createAsyncThunk(
	'profile/resend',
	async (data: ResendThunkData, { getState, dispatch }) => {
		try {
			const state: RootState = getState() as RootState
			const { url, emailVerification, smsEmailAuth, login2Fa, setOtpLoading } =
				data
			const { googleAuth } = state.profile

			// TODO: make sure loading data is correct
			//   setOtpLoading(true);

			// Email Verification After Registration
			if (emailVerification) {
				const responseData = await resendEmail(url)
				if (responseData) {
					dispatch(setVerificationInfo(responseData))
				}
			}

			// Little bottomsheet for sms/email otp
			if (smsEmailAuth) {
				if (googleAuth) {
					sendEmailOtp()
				} else {
					sendOtp()
				}
			}

			// Login 2FA
			// TODO: check if needed
			// if (login2Fa) {
			// 	const responseData = await resendEmail(url)
			// 	if (responseData) {
			// 		saveUserAndPassInfo(responseData)
			// 	}
			// }
		} catch (error) {
			throw error
		}
	}
)
export const logoutThunk = createAsyncThunk(
	'profile/logout',
	async (navigation: NativeStackNavigationProp<Screens>, {}) => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
		const status = await logoutUtil(refresh_token)
		if (status === 204) {
			await SecureStore.deleteItemAsync('accessToken')
			await SecureStore.deleteItemAsync('refreshToken')
			navigation.navigate('Welcome')
		}
	}
)
