import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	openCompanyInfoModal,
	toggleLanguageModal,
	togglePhoneNumberModal,
} from '@app/refactor/redux/modals/modalsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { UserStatus } from '@app/refactor/types/enums'
import { toggleSubscriptionThunk } from '@app/refactor/redux/profile/profileThunks'

export const usePersonal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		profile: { userInfo, smsAuth },
		errors: { generalError },
		common: { language },
	} = state

	const verified = userInfo?.userStatus === UserStatus.VERIFIED
	const unverified = userInfo?.userStatus === UserStatus.UNVERIFIED
	const pending = userInfo?.userStatus === UserStatus.PENDING
	const corporate = userInfo?.userType === UserStatus.CORPORATE
	const eligibleToVerify = userInfo?.verificationToolEnabled

	const x = {
		banned: false,
		phoneCode: '+995',
		name: 'Georgia',
		code: 'GEO',
	}
	const [chosenCountry, setChosenCountry] = useState<Country | undefined>(x)
	const [countryModalVisible, setCountryModalVisible] = useState(false)
	const [languageModalVisible, setLanguageModalVisible] = useState(false)

	const hideError = () =>
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })

	useEffect(() => {
		return () => hideError()
	}, [])

	const edit = () => {
		if (smsAuth) {
			dispatch(
				openCompanyInfoModal(
					'go web phone header',
					'go web phone description',
					'go web phone link',
					'go web phone button'
				)
			)
		} else {
			dispatch(togglePhoneNumberModal(true))
		}
		hideError()
	}

	const verify = () => {
		if (eligibleToVerify) launchSumsubSdk()
		else
			dispatch(
				openCompanyInfoModal(
					'go web personal header',
					'go web personal description',
					'go web personal link',
					'go web personal button'
				)
			)
	}

	const goToSupport = () =>
		//move link somewhere
		Linking.openURL('https://support.cryptal.com/hc/en-us/requests/new')

	const editLanguage = () => {
		hideError()
		dispatch(toggleLanguageModal(true))
	}

	const openModal = () => {
		hideError()
		dispatch({ type: 'TOGGLE_IDENTITY_MODAL' })
	}

	const handleEmailUpdates = (value: ToggleSubscriptionData) =>
		dispatch(toggleSubscriptionThunk(value))

	return {
		userStatus: { verified, unverified, pending, corporate, eligibleToVerify },
		hideError,
		edit,
		verify,
		goToSupport,
		editLanguage,
		openModal,
		handleEmailUpdates,
		userInfo,
		generalError,
		language,
		smsAuth,
		corporate,
		setCountryModalVisible,
		countryModalVisible,
		setChosenCountry,
		chosenCountry,
	}
}
