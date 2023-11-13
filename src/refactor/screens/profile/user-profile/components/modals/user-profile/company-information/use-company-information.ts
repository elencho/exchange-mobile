import { RootState } from '@app/refactor/redux/rootReducer'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const useCompanyInformation = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector((state: RootState) => state.profile.userInfo)
	const [companyModalVisible, setCompanyModalVisible] = useState(false)

	const openModal = () => {
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
		setCompanyModalVisible(true)
	}
	return { openModal, userInfo, companyModalVisible, setCompanyModalVisible }
}

export default useCompanyInformation
