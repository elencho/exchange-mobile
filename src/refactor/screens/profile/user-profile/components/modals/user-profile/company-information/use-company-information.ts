import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const useCompanyInformation = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector((state) => state.profile.userInfo)

	const openModal = () => {
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
		dispatch(
			openCompanyInfoModal(
				'go web company header',
				'go web company description',
				'go web company link',
				'go web company button'
			)
		)
	}
	return { openModal, userInfo }
}

export default useCompanyInformation
