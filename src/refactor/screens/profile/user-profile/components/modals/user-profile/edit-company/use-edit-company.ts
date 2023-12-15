import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Linking } from 'react-native'
import { webProfileUtil } from '@app/utils/userProfileUtils'

interface Props {
	setCompanyInfoModalVisible: (visible: boolean) => void
}

export const useEditCompany = ({ setCompanyInfoModalVisible }: Props) => {
	const hide = () => setCompanyInfoModalVisible(false)

	const goToWeb = async () => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
		const data = await webProfileUtil(refresh_token)
		Linking.openURL(data?.redirectUri)
		hide()
	}
	return {
		hide,
		goToWeb,
	}
}
