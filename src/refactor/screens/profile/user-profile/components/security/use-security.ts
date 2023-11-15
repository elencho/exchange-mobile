import { useState } from 'react'

export const useSecurity = () => {
	const [passwordModalVisible, togglePasswordModal] = useState(false)
	const [googleAuthModalVisible, toggleGoogleAuthModal] = useState(false)
	const [googleOtpModalVisible, toggleGoogleOtpModalVisible] = useState(false)
	const [emailAuthModalVisible, toggleEmailAuthModalVisible] = useState(false)
	return {
		passwordModalVisible,
		togglePasswordModal,
		googleAuthModalVisible,
		toggleGoogleAuthModal,
		emailAuthModalVisible,
		toggleEmailAuthModalVisible,
		toggleGoogleOtpModalVisible,
		googleOtpModalVisible,
	}
}
