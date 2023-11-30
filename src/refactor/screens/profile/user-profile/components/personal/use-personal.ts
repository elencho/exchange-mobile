import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	openCompanyInfoModal,
	togglePhoneNumberModal,
} from '@app/refactor/redux/modals/modalsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { UserStatus } from '@app/refactor/types/enums'
import { toggleSubscriptionThunk } from '@app/refactor/redux/profile/profileThunks'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import launchSumsubSdk from '@app/utils/sumsubMobileSdk'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

export const usePersonal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		profile: { userInfo },
		errors: { generalError },
		common: { language },
		auth: { otpType },
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
	const [personalInfoModalVisible, togglePersonalInfoModal] = useState(false)
	const [phoneNumberModalVisible, togglePhoneNumberModal] = useState(false)
	const [identityModalVisible, toggleIdentityModalVisible] = useState(false)
	const [companyInfoModalVisible, setCompanyInfoModalVisible] = useState(false)
	const [emailUpdated, setEmailUpdated] = useState(!!userInfo?.emailUpdates)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const hideError = () =>
		// TODO: Remove after wallets refactor
		dispatch(saveGeneralError(null))

	useEffect(() => {
		return () => hideError()
	}, [])

	const edit = () => {
		if (otpType === 'SMS') {
			dispatch(
				openCompanyInfoModal(
					'go web phone header',
					'go web phone description',
					'go web phone link',
					'go web phone button'
				)
			)
		} else {
			togglePhoneNumberModal(true)
		}
		hideError()
	}

	const verify = () => {
		if (eligibleToVerify) launchSumsubSdk()
		else setCompanyInfoModalVisible(true)
	}

	const goToSupport = () =>
		//move link somewhere
		Linking.openURL('https://support.cryptal.com/hc/en-us/requests/new')

	const editLanguage = () => {
		hideError()
		setLanguageModalVisible(true)
	}

	const openModal = () => {
		hideError()
		toggleIdentityModalVisible(true)
	}

	const handleEmailUpdates = (value: boolean) => {
		setEmailUpdated(value)
		handleGeneralError(
			() => dispatch(toggleSubscriptionThunk({ value })),
			setGeneralErrorData
		)
	}

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
		corporate,
		setCountryModalVisible,
		countryModalVisible,
		setChosenCountry,
		chosenCountry,
		togglePersonalInfoModal,
		personalInfoModalVisible,
		languageModalVisible,
		setLanguageModalVisible,
		phoneNumberModalVisible,
		togglePhoneNumberModal,
		setCompanyInfoModalVisible,
		emailUpdated,
		companyInfoModalVisible,
		toggleIdentityModalVisible,
		identityModalVisible,
		generalErrorData,
	}
}
