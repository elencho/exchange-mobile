import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'

export const useGoogleOtp = () => {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const state = useSelector((state: RootState) => state)
	const {
		modalState: { googleOtpModalVisible },
		profile: { currentSecurityAction },
	} = state

	const [value, setValue] = useState('')

	const email = currentSecurityAction === 'email'

	const hide = () => {
		dispatch(toggleGoogleOtpModal(false))
		if (email) dispatch(setEmailAuth(false))
		setValue('')
	}
	return { hide, value, email, googleOtpModalVisible, navigation, setValue }
}
