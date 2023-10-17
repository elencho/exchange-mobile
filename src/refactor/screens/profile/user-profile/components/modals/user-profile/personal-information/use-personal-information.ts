import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { togglePersonalInfoModal } from '@app/refactor/redux/modals/actions'
import { RootState } from '@app/refactor/redux/rootReducer'

const usePersonalInformation = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)
	const { userInfo } = state

	const edit = () => {
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
		dispatch(togglePersonalInfoModal(true))
	}
	return {
		edit,
		userInfo,
	}
}

export default usePersonalInformation
