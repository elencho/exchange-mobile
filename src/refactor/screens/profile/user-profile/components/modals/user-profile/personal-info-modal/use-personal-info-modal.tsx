import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '@app/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { updateUserThunk } from '@app/refactor/redux/profile/profileThunks'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

const usePersonalInfoModal = ({
	personalInfoModalVisible,
	togglePersonalInfoModal,
}: {
	personalInfoModalVisible: boolean
	togglePersonalInfoModal: (visible: boolean) => void
}) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		profile: { userInfo, userProfileLoading, userProfileButtonsLoading },
		common: { countries },
	} = state

	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [error, setError] = useState(false)
	const defaultCountry = {
		name: userInfo?.country,
		code: userInfo?.countryCode,
	}
	const [chosenCountry, setChosenCountry] = useState<Country>(defaultCountry)
	const [localUserInfo, setLocalUserInfo] = useState({
		country: chosenCountry?.code!,
		city: userInfo?.city!,
		postalCode: userInfo?.postalCode!,
		address: userInfo?.address!,
	})
	const [countryModalVisible, setCountryModalVisible] = useState(false)

	const alphabeticRegex = (text: string) => /^[a-zA-Z]+$/.test(text?.trim())

	useEffect(() => {
		error && setError(false)
	}, [userInfo, personalInfoModalVisible, localUserInfo])

	const hide = () => {
		!userProfileButtonsLoading && togglePersonalInfoModal(false)
		setChosenCountry(defaultCountry)
		setLocalUserInfo({
			country: chosenCountry?.code!,
			city: userInfo?.city!,
			postalCode: userInfo?.postalCode!,
			address: userInfo?.address!,
		})
		setGeneralErrorData(null)
	}
	const saveHide = () => {
		!userProfileButtonsLoading && togglePersonalInfoModal(false)
	}

	const handleSave = () => {
		const condition =
			!localUserInfo?.country ||
			!localUserInfo.city?.trim() ||
			!alphabeticRegex(localUserInfo.city) ||
			!localUserInfo.postalCode?.trim() ||
			!localUserInfo.address?.trim()

		if (error || condition) {
			setError(true)
		} else {
			handleGeneralError(
				() => dispatch(updateUserThunk({ localUserInfo, hide: saveHide })),
				setGeneralErrorData
			)
		}
	}
	const changeCountry = (country: Country) => {
		setChosenCountry(country)
		setLocalUserInfo({ ...localUserInfo, country: country?.code! })
	}

	const handleCountries = () => {
		setCountryModalVisible(true)
	}

	const citizenshipText = (code: string) => {
		let country
		countries?.forEach((c) => {
			if (c.code === code) country = c.name
		})
		return country
	}

	const canEditInfo =
		userInfo?.userStatus === 'VERIFIED' || userInfo?.userStatus === 'PENDING'

	const onChangeText = (firstName: string) =>
		dispatch(saveUserInfo({ ...userInfo, firstName }))

	const handleFieldChange = (fieldName: string, value: string) => {
		setLocalUserInfo((prevState) => ({
			...prevState,
			[fieldName]: value,
		}))
	}
	return {
		onChangeText,
		userInfo,
		alphabeticRegex,
		error,
		handleCountries,
		citizenshipText,
		canEditInfo,
		handleSave,
		userProfileButtonsLoading,
		hide,
		setChosenCountry,
		chosenCountry,
		countryModalVisible,
		setCountryModalVisible,
		handleFieldChange,
		localUserInfo,
		changeCountry,
		generalErrorData,
	}
}

export default usePersonalInfoModal
