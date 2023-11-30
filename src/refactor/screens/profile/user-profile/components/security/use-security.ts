import { useState } from 'react'

export const useSecurity = () => {
	const [passwordModalVisible, togglePasswordModal] = useState(false)
	const [googleAuthModalVisible, toggleGoogleAuthModal] = useState(false)
	const [googleOtpModalVisible, toggleGoogleOtpModalVisible] = useState(false)
	const [emailAuthModalVisible, toggleEmailAuthModalVisible] = useState(false)
	const [smsAuthModalVisible, toggleSmsAuthModalVisible] = useState(false)
	const [chosenOtpType, setChosenOtpType] = useState<OTP>()
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
		setChosenOtpType,
		chosenOtpType,
	}
}
