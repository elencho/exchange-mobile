import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const useCompanyInformation = ({
	setCompanyInfoModalVisible,
	setCompanyModalData,
}) => {
	const dispatch = useDispatch()
	const userInfo = useSelector((state: RootState) => state.profile.userInfo)

	const openModal = () => {
		// TODO: Remove after wallets refactor
		setCompanyModalData({
			header: 'go web company header',
			description: 'go web company description',
			link: 'go web company link',
			button: 'go web company button',
		})
		setCompanyInfoModalVisible(true)
		dispatch(saveGeneralError(null))
	}
	return { openModal, userInfo }
}

export default useCompanyInformation
