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
	sendEmailOtp,
	sendOtp,
	sendSmsOtp,
} from '@app/refactor/redux/profile/profileApi'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import { setOTPChangeParams } from '@app/refactor/redux/profile/profileSlice'
import SecureKV from '@store/kv/secure'
import { OTPTypes } from '@app/refactor/types/enums'

interface SmsOtpModalProps {
	toggleSmsAuthModal: (v: boolean) => void
	toggleEmailAuthModal: (v: boolean) => void
	toggleGoogleAuthModal: (v: boolean) => void
	smsAuthModalVisible: boolean
	togglePhoneNumberModal: (v: boolean | string) => void
}

export const useSmsOtpModal = ({
	toggleSmsAuthModal,
	toggleEmailAuthModal,
	toggleGoogleAuthModal,
	smsAuthModalVisible,
	togglePhoneNumberModal,
}: SmsOtpModalProps) => {
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
	const { otpType } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()
	const hide = () => {
		toggleSmsAuthModal(false)
		setGeneralErrorData(null)
		setSeconds(30)
		setValue('')
		setGeneralErrorData(null)
	}

	const handleValue = (text: string) => {
		setValue(text)
		setGeneralErrorData(null)
	}

	const resend = () => {
		setValue('')
		setGeneralErrorData(null)
		setTimerVisible(true)
		if (currentSecurityAction === OTPTypes.SMS) {
			sendSmsOtp()
		} else {
			sendOtp()
		}
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
	const smsHide = async () => {
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
	const showEmailFromSms = () => {
		toggleSmsAuthModal(false)
		toggleEmailAuthModal(true)
		toggleGoogleAuthModal(false)
		sendEmailOtp()
	}

	const changePhoneNumber = () => {
		togglePhoneNumberModal(true)
		toggleSmsAuthModal(false)
	}

	const handleFill = () => {
		switch (currentSecurityAction) {
			case OTPTypes.TOTP:
				getOtpChangeToken(currentSecurityAction, smsHide)
				break
			case OTPTypes.EMAIL:
				getOtpChangeToken(currentSecurityAction, showEmailFromSms)
				break
			case OTPTypes.SMS:
				smsActivation()
				break
			case null || 'changingNumber':
				getOtpChangeToken(OTPTypes.SMS, changePhoneNumber)
				break
		}
	}
	return {
		value,
		setValue: handleValue,
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
		otpType,
	}
}
