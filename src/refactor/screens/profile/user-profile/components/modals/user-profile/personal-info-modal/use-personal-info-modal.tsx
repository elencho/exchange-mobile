import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '@app/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { togglePersonalInfoModal } from '@app/refactor/redux/modals/modalsSlice'
import { updateUserThunk } from '@app/refactor/redux/profile/profileThunks'

const usePersonalInfoModal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		modalState: { personalInfoModalVisible },
		profile: { userInfo },
		common: { countries },
	} = state

	const [countryDrop, setCountryDrop] = useState(false)
	const [error, setError] = useState(false)
	const [localUserInfo, setLocalUserInfo] = useState({
		firstName: userInfo?.firstName,
		lastName: userInfo?.lastName,
		email: userInfo?.email,
		country: userInfo?.countryCode,
		city: userInfo?.city,
		postalCode: userInfo?.postalCode,
		address: userInfo?.address,
	})
	const x = {
		phoneCode: userInfo?.phoneCountry,
		name: userInfo?.country,
		code: userInfo?.countryCode,
	}
	const [chosenCountry, setChosenCountry] = useState<Country | undefined>(x)
	const [countryModalVisible, setCountryModalVisible] = useState(false)

	const alphabeticRegex = (text: string) => /^[a-zA-Z]+$/.test(text?.trim())

	useEffect(() => {
		error && setError(false)
	}, [userInfo, personalInfoModalVisible])

	const hide = () => {
		dispatch(togglePersonalInfoModal(false))
	}
	const handleSave = () => {
		// TODO: refactor
		const condition = canEditInfo
			? !userInfo?.country ||
			  !userInfo?.city?.trim() ||
			  !alphabeticRegex(userInfo?.city) ||
			  !userInfo?.postalCode?.trim() ||
			  !userInfo?.address?.trim()
			: !userInfo?.country ||
			  !userInfo.city?.trim() ||
			  !alphabeticRegex(userInfo.city) ||
			  !userInfo.postalCode?.trim() ||
			  !userInfo.address?.trim() ||
			  !userInfo.firstName?.trim() ||
			  !userInfo.lastName?.trim() ||
			  !userInfo.citizenship

		if (error || condition) {
			setError(true)
		} else dispatch(updateUserThunk(localUserInfo))
	}

	// TODO: FIX types
	const handleCountries = (countryDrop, citizenshipDrop) => {
		setCountryModalVisible(true)
		if (countryDrop) setCountryDrop(true)
		if (citizenshipDrop) setCitizenshipDrop(true)
	}

	// const handleReset = () => {
	// 	setCitizenshipDrop(false), setCountryDrop(false)
	// }

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
		countryDrop,
		personalInfoModalVisible,
		hide,
		setChosenCountry,
		chosenCountry,
		countryModalVisible,
		setCountryModalVisible,
		handleFieldChange,
		localUserInfo,
	}
}

export default usePersonalInfoModal
