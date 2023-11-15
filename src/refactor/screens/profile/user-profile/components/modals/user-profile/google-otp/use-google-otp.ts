import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { toggleGoogleOtpModal } from '@app/refactor/redux/modals/modalsSlice'
import { setEmailAuth } from '@app/refactor/redux/profile/actions'

export const useGoogleOtp = (props) => {
	const { toggleGoogleOtpModalVisible, googleOtpModalVisible } = props
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const state = useSelector((state: RootState) => state)
	const {
		auth: { otpType },
	} = state
	const [value, setValue] = useState('')

	const email = otpType === 'EMAIL'

	const hide = () => {
		toggleGoogleOtpModalVisible(false)
		if (email) dispatch(setEmailAuth(false))
		setValue('')
	}
	return {
		hide,
		value,
		email,
		googleOtpModalVisible,
		navigation,
		setValue,
	}
}
