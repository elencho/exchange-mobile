import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import {
	credentialsForChangeOTPThunk,
	fetchUserInfoThunk,
} from '@app/refactor/redux/profile/profileThunks'
import { activateEmailOtp } from '@app/refactor/redux/profile/profileApi'
import { useAppDispatch } from '@app/refactor/redux/store'
import SecureKV from '@store/kv/secure'
import { retryUnauthorizedCall } from '@store/redux/auth/api'

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

	const reset = () => {
		setSeconds(30)
		return
	}

	useEffect(() => {
		if (emailAuthModalVisible || smsAuthModalVisible) {
			if (!seconds) reset()
			if (seconds) {
				setTimeout(() => {
					setSeconds(seconds - 1)
				}, 1000)
			}
		} else {
			reset()
		}
	}, [seconds])

	const handleHide = () => {
		setSeconds(30)
		setValue('')
	}
	const handleFill = () => {
		if (currentSecurityAction === 'TOTP') {
			const getOtp = dispatch(
				credentialsForChangeOTPThunk({
					OTP: value,
					otpType: 'TOTP',
				})
			)
			getOtp.then(() => toggleGoogleAuthModal(true))
		} else if (currentSecurityAction === 'EMAIL') {
			activateEmailOtp(tOTPChangeParams!.changeOTPToken!, value).then(
				async () => {
					const oldRefresh = await SecureKV.get('refreshToken')

					retryUnauthorizedCall({}, oldRefresh)
					hide()
					dispatch(fetchUserInfoThunk())
				}
			)
		}
	}

	const hide = () => {
		toggleSmsAuthModal(false)
		toggleEmailAuthModal(false)
	}

	const resend = () => {
		// TODO: ADD LOGIC
		// dispatch({
		// 	type: 'RESEND_SAGA',
		// 	smsEmailAuth: true,
		// 	setOtpLoading,
		// })
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
	}
}
