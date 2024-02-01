import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import {
	sendEmailOtp,
	sendSmsOtp,
} from '@app/refactor/redux/profile/profileApi'
import { credentialsForChangeOTPThunk } from '@app/refactor/redux/profile/profileThunks'
import { useAppDispatch } from '@app/refactor/redux/store'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

interface GoogleOtpProps {
	googleOtpModalVisible: boolean
	toggleGoogleOtpModalVisible: (visible: boolean) => void
	toggleEmailAuthModalVisible: (visible: boolean) => void
	toggleSmsAuthModalVisible: (visible: boolean) => void
}

export const useGoogleOtp = (props: GoogleOtpProps) => {
	const {
		toggleGoogleOtpModalVisible,
		googleOtpModalVisible,
		toggleEmailAuthModalVisible,
		toggleSmsAuthModalVisible,
	} = props
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		auth: { otpType },
		profile: { currentSecurityAction },
	} = state
	const [value, setValue] = useState('')
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const email = otpType === 'EMAIL'

	const hide = () => {
		toggleEmailAuthModalVisible(false)
		toggleGoogleOtpModalVisible(false)
		setValue('')
		setGeneralErrorData(null)
	}

	const handleChange = (text: string) => {
		setGeneralErrorData(null)
		setValue(text)
	}

	const showEmail = () => {
		sendEmailOtp()
		hide()
		toggleEmailAuthModalVisible(true)
		setGeneralErrorData(null)
	}

	const showSms = () => {
		sendSmsOtp()
		hide()
		toggleSmsAuthModalVisible(true)
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

	const onFill = () => {
		switch (currentSecurityAction) {
			case 'EMAIL':
				getOtpChangeToken(currentSecurityAction, showEmail)
				break
			case 'SMS':
				getOtpChangeToken(currentSecurityAction, showSms)
				break
		}
	}
	return {
		hide,
		value,
		email,
		googleOtpModalVisible,
		navigation,
		setValue: handleChange,
		onFill,
		generalErrorData,
	}
}
