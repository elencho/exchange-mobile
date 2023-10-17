import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	toggleEmailAuthModal,
	toggleSmsAuthModal,
} from '@app/refactor/redux/modals/actions'
import {
	setEmailAuth,
	setGoogleAuth,
	setSmsAuth,
} from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'

export const useSmsAuthEmailModal = ({ type }) => {
	const dispatch = useDispatch()

	const state = useSelector((state: RootState) => state)
	const {
		modals: { smsAuthModalVisible, emailAuthModalVisible },
		profile: { currentSecurityAction, timerVisible },
	} = state

	const action =
		type === 'SMS' ? toggleSmsAuthModal(false) : toggleEmailAuthModal(false)
	const visible = type === 'SMS' ? smsAuthModalVisible : emailAuthModalVisible
	const cellCount = type === 'SMS' ? 4 : 6
	const email = currentSecurityAction === 'email'
	const google = currentSecurityAction === 'google'

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)
	const [otpLoading, setOtpLoading] = useState(false)

	const reset = () => {
		dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
		setSeconds(30)
		return
	}

	useEffect(() => {
		if (emailAuthModalVisible || smsAuthModalVisible) {
			dispatch({ type: 'TOGGLE_TIMER', timerVisible: true })
		}
	}, [emailAuthModalVisible, smsAuthModalVisible])

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
		if (value.length === cellCount && email) {
			dispatch(setSmsAuth(false))
			dispatch(setGoogleAuth(false))
		}
	}

	const hide = () => {
		dispatch(action)
		if (email) dispatch(setEmailAuth(false))
		if (google) dispatch(setGoogleAuth(false))
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
		google,
		email,
		cellCount,
		visible,
		action,
		smsAuthModalVisible,
		emailAuthModalVisible,
		currentSecurityAction,
		timerVisible,
		seconds,
		setValue,
		value,
	}
}
