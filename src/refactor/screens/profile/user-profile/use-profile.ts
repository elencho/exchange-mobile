import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { clearFilters } from '@app/refactor/redux/transactions/actions'
import { checkIsCompatable } from '@app/utils/biometricsAuth'
import { logoutThunk } from '@store/redux/auth/thunks'

export const useProfile = ({ route }) => {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)

	const [showRefreshControl, setShowRefreshControl] = useState(false)
	const [bioAvailable, setBioAvailable] = useState(false)
	const [personalSecurity, setPersonalSecurity] = useState('Personal')
	const { userInfo, userProfileLoading } = state

	useEffect(() => {
		dispatch(fetchUserInfoThunk(route?.params?.fromRegistration))
		checkCompitable()
		const timer = setTimeout(() => {
			setShowRefreshControl(true)
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	// useFocusEffect(
	// 	useCallback(() => {
	// 		return () => setPersonalSecurity('Personal')
	// 	}, [])
	// )

	const checkCompitable = async () => {
		const compitable = await checkIsCompatable()
		setBioAvailable(compitable)
	}

	const logout = () => {
		dispatch(logoutThunk())
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
		personalSecurity,
		userInfo,
		userProfileLoading,
		bioAvailable,
		setPersonalSecurity,
	}
}
