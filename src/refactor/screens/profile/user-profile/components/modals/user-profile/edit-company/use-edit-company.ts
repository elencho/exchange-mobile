import React from 'react'
import { View, Text, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import * as SecureStore from 'expo-secure-store'
import { webProfileUtil } from '@app/utils/userProfileUtils'

export const useEditCompany = () => {
	const dispatch = useDispatch()
	// const companyInfoModalVisible = useSelector(
	//   (state) => state.modals.companyInfoModalVisible
	// );

	const {
		companyInfoModalVisible,
		companyInfoModalHeader,
		companyInfoModalDescription,
		companyInfoModalLink,
		companyInfoModalButton,
	} = useSelector((state: RootState) => state.modals)

	const hide = () => dispatch({ type: 'CLOSE_COMPANY_INFO_MODAL' })

	const goToWeb = async () => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
        // TODO: fix utils
		const data = await webProfileUtil(refresh_token)
		Linking.openURL(data?.redirectUri)
		hide()
	}
	return {
		companyInfoModalVisible,
		companyInfoModalHeader,
		companyInfoModalDescription,
		companyInfoModalLink,
		companyInfoModalButton,
		hide,
		goToWeb,
	}
}
