import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import {
	credentialsForChangeOTPThunk,
	fetchUserInfoThunk,
} from '@app/refactor/redux/profile/profileThunks'
import {
	activateEmailOtp,
	activateSmsOtp,
	sendEmailOtp,
	sendOtp,
	sendSmsOtp,
} from '@app/refactor/redux/profile/profileApi'
import { useAppDispatch } from '@app/refactor/redux/store'
import SecureKV from '@store/kv/secure'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import { handleGeneralError, parseError } from '@app/refactor/utils/errorUtils'
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
		emailAuthModalVisible,
		toggleGoogleAuthModal,
		type,
	} = props
	const dispatch = useAppDispatch()

	const state = useSelector((state: RootState) => state)
	const {
		profile: { currentSecurityAction, tOTPChangeParams, userInfo },
		auth: { otpType },
	} = state

	const visible = emailAuthModalVisible

	const cellCount = 6

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)
	const [otpLoading, setOtpLoading] = useState(false)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [timerVisible, setTimerVisible] = useState(true)
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
		if (emailAuthModalVisible) {
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

	const handleFill = () => {
		switch (currentSecurityAction) {
			case 'TOTP':
				getOtpChangeToken(currentSecurityAction, emailHide)
				break
			case 'EMAIL':
				emailActivation()
				break
			case 'SMS':
				getOtpChangeToken(currentSecurityAction, showSmsFromEmail)
				break
		}
	}

	const emailActivation = () => {
		activateEmailOtp(tOTPChangeParams!.changeOTPToken!, value).then(
			async (res) => {
				if (res?.status! >= 200 && res?.status! <= 300) {
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
		setSeconds(30)
		setValue('')
		setGeneralErrorData(null)
	}

	const showSmsFromEmail = () => {
		toggleEmailAuthModal(false)
		toggleSmsAuthModal(true)
		sendSmsOtp()
	}

	const onShow = () => {
		setTimerVisible(true)
	}

	const resend = () => {
		setValue('')
		setGeneralErrorData(null)
		setTimerVisible(true)
		if (currentSecurityAction === 'EMAIL') {
			sendEmailOtp()
		} else {
			sendOtp()
		}
	}

	return {
		resend,
		hide,
		otpLoading,
		reset,
		cellCount,
		visible,
		emailAuthModalVisible,
		currentSecurityAction,
		seconds,
		setValue: handleValue,
		value,
		handleFill,
		generalErrorData,
		timerVisible,
		onShow,
	}
}
