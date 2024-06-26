import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { clearFilters } from '@app/redux/transactions/actions'
import { checkIsCompatable } from '@app/utils/biometricsAuth'
import { logoutThunk } from '@store/redux/auth/thunks'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

interface Props {
	route: {
		params: {
			fromRegistration: boolean
		}
	}
}

export const useProfile = () => {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)

	const [isBackPressed, setIsBackPressed] = useState(false)
	const [shouldShowRefresh, setShouldShowRefresh] = useState(false)
	const [bioAvailable, setBioAvailable] = useState(false)
	const [personalSecurity, setPersonalSecurity] = useState('Personal')
	const { userProfileLoading } = state
	const [companyModalData, setCompanyModalData] = useState<CompanyInfoData>({
		header: 'Go To web',
		description: 'Visit Website',
		link: 'Web Link',
		button: 'OK',
	})
	const [companyInfoModalVisible, setCompanyInfoModalVisible] = useState(false)

	useEffect(() => {
		dispatch(fetchUserInfoThunk())
		checkCompitable()
	}, [])

	const checkCompitable = async () => {
		const compitable = await checkIsCompatable()
		setBioAvailable(compitable)
	}

	const logout = () => dispatch(logoutThunk())

	const onRefresh = () => {
		setShouldShowRefresh(true)
		checkCompitable()
		dispatch(fetchUserInfoThunk())
		setShouldShowRefresh(false)
	}
	const back = () => {
		setIsBackPressed(true)
		setTimeout(() => {
			navigation.goBack()
		}, 0)
	}

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		// const { y } = event.nativeEvent.contentOffset
	}

	return {
		logout,
		onRefresh,
		back,
		onScroll,
		personalSecurity,
		userProfileLoading,
		bioAvailable,
		setPersonalSecurity,
		companyModalData,
		setCompanyModalData,
		companyInfoModalVisible,
		setCompanyInfoModalVisible,
		shouldShowRefresh,
		isBackPressed,
	}
}
