import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { sendEmailOtp } from '@app/refactor/redux/profile/profileApi'
import { credentialsForChangeOTPThunk } from '@app/refactor/redux/profile/profileThunks'
import { useAppDispatch } from '@app/refactor/redux/store'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

interface GoogleOtpProps {
	googleOtpModalVisible: boolean
	toggleGoogleOtpModalVisible: (visible: boolean) => void
	toggleEmailAuthModalVisible: (visible: boolean) => void
}

export const useGoogleOtp = (props: GoogleOtpProps) => {
	const {
		toggleGoogleOtpModalVisible,
		googleOtpModalVisible,
		toggleEmailAuthModalVisible,
	} = props
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		auth: { otpType },
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
	}

	const emailHide = () => {
		sendEmailOtp()
		hide()
		toggleEmailAuthModalVisible(true)
	}

	const onFill = () =>
		handleGeneralError(
			() =>
				dispatch(
					credentialsForChangeOTPThunk({
						OTP: value,
						otpType: 'EMAIL',
						onSuccess: emailHide,
					})
				),
			setGeneralErrorData
		)
	console.log(generalErrorData, 'generalErrorData')
	return {
		hide,
		value,
		email,
		googleOtpModalVisible,
		navigation,
		setValue,
		onFill,
		generalErrorData,
	}
}
