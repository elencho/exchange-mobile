import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import {
	credentialsForChangeOTPThunk,
	fetchUserInfoThunk,
} from '@app/refactor/redux/profile/profileThunks'
import {
	activateEmailOtp,
	sendEmailOtp,
	sendOtp,
} from '@app/refactor/redux/profile/profileApi'
import { useAppDispatch } from '@app/refactor/redux/store'
import SecureKV from '@store/kv/secure'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import { handleGeneralError, parseError } from '@app/refactor/utils/errorUtils'
import { setTimer } from '@store/redux/auth/slice'
import { setOTPChangeParams } from '@app/refactor/redux/profile/profileSlice'

interface SmsEmailAuthModalProps {
	type: 'SMS' | 'Email'
	toggleSmsAuthModal: (v: boolean) => void
	toggleEmailAuthModal: (v: boolean) => void
	emailAuthModalVisible: boolean
	smsAuthModalVisible: boolean
	toggleGoogleAuthModal: (v: boolean) => void
}

export const useSmsAuthEmailModal = (props: SmsEmailAuthModalProps) => {
	const {
		toggleEmailAuthModal,
		toggleSmsAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
		toggleGoogleAuthModal,
		type,
	} = props
	const dispatch = useAppDispatch()

	const state = useSelector((state: RootState) => state)
	const {
		profile: { currentSecurityAction, tOTPChangeParams },
		auth: { otpType },
	} = state

	const visible = type === 'SMS' ? smsAuthModalVisible : emailAuthModalVisible

	const cellCount = smsAuthModalVisible ? 4 : 6

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)
	const [otpLoading, setOtpLoading] = useState(false)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [activateEmail, setActivateEmail] = useState(false)
	const [timerVisible, setTimerVisible] = useState(false)
	const reset = () => {
		setSeconds(30)
		setTimerVisible(false)
		return
	}

	const handleValue = (text: string) => {
		setValue(text)
		setGeneralErrorData(null)
	}

	useEffect(() => {
		if (emailAuthModalVisible || smsAuthModalVisible) {
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

	const handleHide = () => {
		setSeconds(30)
		setValue('')
		setGeneralErrorData(null)
	}

	const emailHide = async () => {
		await hide()
		toggleGoogleAuthModal(true)
		setGeneralErrorData(null)
	}

	const handleFill = () => {
		if (currentSecurityAction === 'TOTP') {
			handleGeneralError(
				() =>
					dispatch(
						credentialsForChangeOTPThunk({
							OTP: value,
							otpType: 'TOTP',
							onSuccess: emailHide,
						})
					),
				setGeneralErrorData
			)
		} else if (currentSecurityAction === 'EMAIL' && otpType === 'SMS') {
			if (emailAuthModalVisible) {
				emailActivation()
			} else {
				handleGeneralError(
					() =>
						dispatch(
							credentialsForChangeOTPThunk({
								OTP: value,
								otpType: 'EMAIL',
								onSuccess: showEmailFromSMS,
							})
						),
					setGeneralErrorData
				)
			}
		} else if (currentSecurityAction === 'EMAIL' && otpType === 'TOTP') {
			emailActivation()
		}
	}

	const emailActivation = () => {
		activateEmailOtp(tOTPChangeParams!.changeOTPToken!, value).then(
			async (res) => {
				if (res?.status >= 200 && res?.status <= 300) {
					const oldRefresh = await SecureKV.get('refreshToken')
					retryUnauthorizedCall({}, oldRefresh)
					hide()
					dispatch(fetchUserInfoThunk())
					dispatch(setOTPChangeParams(null))
				} else {
					parseError(res, setGeneralErrorData)
				}
			}
		)
	}

	const hide = () => {
		toggleSmsAuthModal(false)
		toggleEmailAuthModal(false)
		setGeneralErrorData(null)
	}

	const showEmailFromSMS = () => {
		toggleSmsAuthModal(false)
		toggleEmailAuthModal(true)
		sendEmailOtp()
		setActivateEmail(true)
	}

	const resend = () => {
		setTimerVisible(true)
		sendOtp()
	}

	return {
		resend,
		hide,
		handleHide,
		otpLoading,
		reset,
		cellCount,
		visible,
		smsAuthModalVisible,
		emailAuthModalVisible,
		currentSecurityAction,
		seconds,
		setValue: handleValue,
		value,
		handleFill,
		generalErrorData,
		timerVisible,
	}
}
