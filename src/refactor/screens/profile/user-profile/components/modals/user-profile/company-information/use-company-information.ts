import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const useCompanyInformation = ({ setCompanyInfoModalVisible }) => {
	const dispatch = useDispatch()
	const userInfo = useSelector((state: RootState) => state.profile.userInfo)

	const openModal = () => {
		// TODO: Remove after wallets refactor
		setCompanyInfoModalVisible(true)
		dispatch(saveGeneralError(null))
	}
	return { openModal, userInfo }
}

export default useCompanyInformation
