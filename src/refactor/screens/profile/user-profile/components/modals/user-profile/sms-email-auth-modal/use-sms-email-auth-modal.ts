import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	setEmailAuth,
	setGoogleAuth,
	setSmsAuth,
} from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'

interface SmsEmailAuthModalProps {
	type: 'SMS' | 'Email'
	toggleSmsAuthModal: (v: boolean) => void
	toggleEmailAuthModal: (v: boolean) => void
	emailAuthModalVisible: boolean
	smsAuthModalVisible: boolean
}

export const useSmsAuthEmailModal = (props: SmsEmailAuthModalProps) => {
	const {
		type,
		toggleEmailAuthModal,
		toggleSmsAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
	} = props
	const dispatch = useDispatch()

	const state = useSelector((state: RootState) => state)
	const {
		profile: { currentSecurityAction, timerVisible },
	} = state

	// const action =
	// 	type === 'SMS' ? toggleSmsAuthModal(false) : toggleEmailAuthModal(false)
	const visible = emailAuthModalVisible
	const cellCount = type === 'SMS' ? 4 : 6
	// const email = currentSecurityAction === 'email'
	// const google = currentSecurityAction === 'google'

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)
	const [otpLoading, setOtpLoading] = useState(false)

	const reset = () => {
		dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
		setSeconds(30)
		return
	}

	// useEffect(() => {
	// 	if (emailAuthModalVisible || smsAuthModalVisible) {
	// 		dispatch({ type: 'TOGGLE_TIMER', timerVisible: true })
	// 	}
	// }, [emailAuthModalVisible, smsAuthModalVisible])

	useEffect(() => {
		if (emailAuthModalVisible || smsAuthModalVisible) {
			if (!seconds || !timerVisible) reset()
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
		// if (value.length === cellCount && email) {
		// 	dispatch(setSmsAuth(false))
		// 	dispatch(setGoogleAuth(false))
		// }
	}

	const hide = () => {
		if (type === 'SMS') {
			toggleSmsAuthModal(false)
		} else {
			toggleEmailAuthModal(false)
		}
	}

	const resend = () =>
		dispatch({
			type: 'RESEND_SAGA',
			smsEmailAuth: true,
			setOtpLoading,
		})

	return {
		resend,
		hide,
		handleHide,
		otpLoading,
		reset,
		// google,
		// email,
		cellCount,
		visible,
		// action,
		smsAuthModalVisible,
		emailAuthModalVisible,
		currentSecurityAction,
		timerVisible,
		seconds,
		setValue,
		value,
	}
}
