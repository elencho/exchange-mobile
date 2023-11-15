import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { sendEmailOtp } from '@app/refactor/redux/profile/profileApi'
import { credentialsForGoogleThunk } from '@app/refactor/redux/profile/profileThunks'

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

	const email = otpType === 'EMAIL'

	const hide = () => {
		toggleEmailAuthModalVisible(false)
		toggleGoogleOtpModalVisible(false)
		setValue('')
	}

	const onFill = async () => {
		try {
			dispatch(
				credentialsForGoogleThunk({
					OTP: value,
					openModal: toggleEmailAuthModalVisible,
					otpType: 'EMAIL',
				})
			)
			await sendEmailOtp()
			hide()
		} catch (e) {
			console.log(e)
		}
	}

	return {
		hide,
		value,
		email,
		googleOtpModalVisible,
		navigation,
		setValue,
		onFill,
	}
}
