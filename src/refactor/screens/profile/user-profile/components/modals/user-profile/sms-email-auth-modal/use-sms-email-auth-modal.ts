import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import {
	credentialsForChangeOTPThunk,
	fetchUserInfoThunk,
} from '@app/refactor/redux/profile/profileThunks'
import {
	activateEmailOtp,
	sendOtp,
} from '@app/refactor/redux/profile/profileApi'
import { useAppDispatch } from '@app/refactor/redux/store'
import SecureKV from '@store/kv/secure'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import { setTimer } from '@store/redux/auth/slice'

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
		type,
		toggleEmailAuthModal,
		toggleSmsAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
		toggleGoogleAuthModal,
	} = props
	const dispatch = useAppDispatch()

	const state = useSelector((state: RootState) => state)
	const {
		profile: { currentSecurityAction, tOTPChangeParams },
	} = state

	const visible = emailAuthModalVisible
	const cellCount = type === 'SMS' ? 4 : 6

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)
	const [otpLoading, setOtpLoading] = useState(false)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [timerVisible, setTimerVisible] = useState(false)
	const reset = () => {
		setSeconds(30)
		setTimerVisible(false)
		return
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
	}

	const emailHide = () => {
		hide()
		toggleGoogleAuthModal(true)
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
		} else if (currentSecurityAction === 'EMAIL') {
			activateEmailOtp(tOTPChangeParams!.changeOTPToken!, value)
				.then(async (res) => {
					const oldRefresh = await SecureKV.get('refreshToken')

					retryUnauthorizedCall({}, oldRefresh)
					hide()
					dispatch(fetchUserInfoThunk())
				})
				.catch(() => console.log('first catch'))
		}
	}

	const hide = () => {
		toggleSmsAuthModal(false)
		toggleEmailAuthModal(false)
		setGeneralErrorData(null)
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
		setValue,
		value,
		handleFill,
		generalErrorData,
		timerVisible,
	}
}
