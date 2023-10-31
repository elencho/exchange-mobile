import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalSecurity } from '@app/refactor/redux/profile/profileSlice'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { clearFilters } from '@app/refactor/redux/transactions/actions'
import { checkIsCompatable } from '@app/utils/biometricsAuth'
import { logoutUtil } from '@app/utils/userProfileUtils'

export const useProfile = ({ route }) => {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)

	const [showRefreshControl, setShowRefreshControl] = useState(false)
	const [bioAvailable, setBioAvailable] = useState(false)

	const { Personal_Security, userInfo, userProfileLoading } = state

	useEffect(() => {
		dispatch(fetchUserInfoThunk(route?.params?.fromRegistration))
		checkCompitable()
		const timer = setTimeout(() => {
			setShowRefreshControl(true)
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	useFocusEffect(
		useCallback(() => {
			return () => dispatch(setPersonalSecurity('Personal'))
		}, [])
	)

	const checkCompitable = async () => {
		const compitable = await checkIsCompatable()
		setBioAvailable(compitable)
	}

	// TODO: use thunk logout
	const logout = async () => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
		const status = await logoutUtil(refresh_token)

		//TODO: Fix this
		// if (status === 204
		// 	) {
		// 	await SecureStore.deleteItemAsync('accessToken')
		// 	await SecureStore.deleteItemAsync('refreshToken')
		// 	navigation.navigate('Welcome')

		// 	dispatch({ type: 'LOGOUT' })
		// }
		if (true) {
			await SecureStore.deleteItemAsync('accessToken')
			await SecureStore.deleteItemAsync('refreshToken')
			navigation.navigate('Welcome')

			dispatch({ type: 'LOGOUT' })
		}
	}

	const onRefresh = () => {
		checkCompitable()
		dispatch(fetchUserInfoThunk())
	}
	const back = () => {
		clear()
		navigation.goBack()
	}

	const clear = () => {
		dispatch(clearFilters())
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
	}

	const onScroll = (event) => {
		const { y } = event.nativeEvent.contentOffset
		if (y > 0) {
			setShowRefreshControl(true)
		}
	}

	return {
		logout,
		onRefresh,
		back,
		clear,
		onScroll,
		showRefreshControl,
		Personal_Security,
		userInfo,
		userProfileLoading,
		bioAvailable,
	}
}