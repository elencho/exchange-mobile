import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setPersonalSecurity } from '@app/refactor/redux/profile/profileSlice'

const usePersonalSecuritySwitcher = () => {
	const dispatch = useDispatch()
	const Personal_Security = useSelector(
		(state: RootState) => state.profile.Personal_Security
	)

	const handleSwitch = (filter) => {
		dispatch(setPersonalSecurity(filter))
	}

	return { handleSwitch, Personal_Security }
}

export default usePersonalSecuritySwitcher
