import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '@app/refactor/redux/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	credentialsForChangeOTPThunk,
	fetchUserInfoThunk,
} from '@app/refactor/redux/profile/profileThunks'
import { handleGeneralError, parseError } from '@app/refactor/utils/errorUtils'
import {
	activateEmailOtp,
	activateSmsOtp,
	sendOtp,
} from '@app/refactor/redux/profile/profileApi'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import { setOTPChangeParams } from '@app/refactor/redux/profile/profileSlice'
import SecureKV from '@store/kv/secure'
import { OTPTypes } from '@app/refactor/types/enums'

export const useSmsOtpModal = ({
	toggleSmsAuthModal,
	toggleEmailAuthModal,
	toggleGoogleAuthModal,
	smsAuthModalVisible,
	togglePhoneNumberModal,
}) => {
	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)
	const [otpLoading, setOtpLoading] = useState(false)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [timerVisible, setTimerVisible] = useState(true)
	const { currentSecurityAction, tOTPChangeParams, userInfo } = useSelector(
		(state: RootState) => state.profile
	)
	const dispatch = useDispatch()
	const hide = () => {
		toggleSmsAuthModal(false)
		setGeneralErrorData(null)
		setSeconds(30)
		setValue('')
		setGeneralErrorData(null)
	}

	const resend = () => {
		setValue('')
		setGeneralErrorData(null)
		setTimerVisible(true)
		sendOtp()
	}
	const reset = () => {
		setSeconds(30)
		setTimerVisible(false)
		return
	}

	useEffect(() => {
		if (smsAuthModalVisible) {
			if (!seconds) reset()
			if (seconds && timerVisible) {
				setTimeout(() => {
					setSeconds(seconds - 1)
				}, 1000)
			}
		} else {
			reset()
		}
	}, [seconds, timerVisible])

	const onShow = () => {
		setTimerVisible(true)
	}
	const emailHide = async () => {
		await hide()
		toggleGoogleAuthModal(true)
		setGeneralErrorData(null)
	}

	const getOtpChangeToken = async (otpType: OTP, onSuccess: () => void) => {
		handleGeneralError(
			() =>
				dispatch(
					credentialsForChangeOTPThunk({
						OTP: value,
						otpType: otpType,
						onSuccess: onSuccess,
					})
				),
			setGeneralErrorData
		)
	}

	const smsActivation = () => {
		activateSmsOtp(
			tOTPChangeParams!.changeOTPToken!,
			value,
			userInfo?.phoneNumber!,
			value,
			userInfo?.phoneCountry!
		).then(async (res) => {
			if (res?.status! >= 200 && res?.status! <= 300) {
				const oldRefresh = await SecureKV.get('refreshToken')
				retryUnauthorizedCall({}, oldRefresh)
				hide()
				dispatch(fetchUserInfoThunk())
				dispatch(setOTPChangeParams(null))
			} else {
				parseError(res, setGeneralErrorData)
			}
		})
	}
	const showSmsFromEmail = () => {
		toggleSmsAuthModal(false)
		toggleEmailAuthModal(true)
		toggleGoogleAuthModal(false)
	}

	const changePhoneNumber = () => {
		togglePhoneNumberModal(true)
		toggleSmsAuthModal(false)
	}

	const handleFill = () => {
		switch (currentSecurityAction) {
			case OTPTypes.TOTP:
				getOtpChangeToken(currentSecurityAction, emailHide)
				break
			case OTPTypes.EMAIL:
				getOtpChangeToken(currentSecurityAction, showSmsFromEmail)
				break
			case OTPTypes.SMS:
				smsActivation()
				break
			case null:
				getOtpChangeToken(OTPTypes.SMS, changePhoneNumber)
				break
		}
	}
	return {
		value,
		setValue,
		seconds,
		setSeconds,
		otpLoading,
		setOtpLoading,
		generalErrorData,
		setGeneralErrorData,
		timerVisible,
		setTimerVisible,
		hide,
		resend,
		onShow,
		handleFill,
		userInfo,
	}
}
