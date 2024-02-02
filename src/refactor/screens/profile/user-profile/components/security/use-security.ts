import { sendOtp } from '@app/refactor/redux/profile/profileApi'
import { setCurrentSecurityAction } from '@app/refactor/redux/profile/profileSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { OTPTypes } from '@app/refactor/types/enums'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useSecurity = () => {
	const {
		auth: { otpType },
		profile: { userInfo },
	} = useSelector((state: RootState) => state)
	const dispatch = useDispatch()

	const [passwordModalVisible, togglePasswordModal] = useState(false)
	const [googleAuthModalVisible, toggleGoogleAuthModal] = useState(false)
	const [googleOtpModalVisible, toggleGoogleOtpModalVisible] = useState(false)
	const [emailAuthModalVisible, toggleEmailAuthModalVisible] = useState(false)
	const [smsAuthModalVisible, toggleSmsAuthModalVisible] = useState(false)
	const [phoneNumberModalVisible, togglePhoneNumberModal] = useState(false)

	const handleOtpPress = (newType: OTPTypes) => {
		dispatch(setCurrentSecurityAction(newType))

		switch (otpType) {
			case OTPTypes.TOTP:
				toggleGoogleOtpModalVisible(true)
				break
			case OTPTypes.EMAIL:
				toggleEmailAuthModalVisible(true)
				sendOtp()

				break
			case OTPTypes.SMS:
				toggleSmsAuthModalVisible(true)
				sendOtp()

				break
		}
	}

	const handleChangePhoneNumber = () => {
		if (otpType === OTPTypes.SMS) {
			toggleSmsAuthModalVisible(true)
			dispatch(setCurrentSecurityAction('changingNumber'))
			sendOtp()
		} else {
			togglePhoneNumberModal(true)
		}
	}

	return {
		passwordModalVisible,
		togglePasswordModal,
		googleAuthModalVisible,
		toggleGoogleAuthModal,
		emailAuthModalVisible,
		toggleEmailAuthModalVisible,
		toggleGoogleOtpModalVisible,
		googleOtpModalVisible,
		toggleSmsAuthModalVisible,
		smsAuthModalVisible,
		handleOtpPress,
		otpType,
		userInfo,
		phoneNumberModalVisible,
		togglePhoneNumberModal,
		handleChangePhoneNumber,
	}
}
