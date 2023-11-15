import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import {
	credentialsForGoogleThunk,
	fetchUserInfoThunk,
} from '@app/refactor/redux/profile/profileThunks'
import { activateEmailOtp } from '@app/refactor/redux/profile/profileApi'

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
	const dispatch = useDispatch()

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
			dispatch(
				credentialsForGoogleThunk({
					OTP: value,
					openModal: toggleGoogleAuthModal,
					otpType: 'TOTP',
				})
			)
		} else if (currentSecurityAction === 'EMAIL') {
			activateEmailOtp(tOTPChangeParams.changeOTPToken!, value)
			hide()
			dispatch(fetchUserInfoThunk())
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
