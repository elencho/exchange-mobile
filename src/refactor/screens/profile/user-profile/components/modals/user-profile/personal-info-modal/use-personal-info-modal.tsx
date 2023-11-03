import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo } from '@app/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { togglePersonalInfoModal } from '@app/refactor/redux/modals/modalsSlice'

const usePersonalInfoModal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		modalState: { personalInfoModalVisible },
		profile: { userInfo, countriesConstant, isProfileUpdating },
	} = state

	const [countryDrop, setCountryDrop] = useState(false)
	const [citizenshipDrop, setCitizenshipDrop] = useState(false)
	const [userInfoVariable, setUserInfoVariable] = useState(null)
	const [error, setError] = useState(false)

	const x = {
		banned: false,
		phoneCode: '+995',
		name: 'Georgia',
		code: 'GEO',
	}
	const [chosenCountry, setChosenCountry] = useState<Country | undefined>(x)
	const [countryModalVisible, setCountryModalVisible] = useState(false)

	const alphabeticRegex = (text: string) => /^[a-zA-Z]+$/.test(text?.trim())

	useEffect(() => {
		error && setError(false)
	}, [userInfo, personalInfoModalVisible])

	useEffect(() => {
		if (personalInfoModalVisible && !userInfoVariable) {
			setUserInfoVariable(userInfo)
		}
		if (!personalInfoModalVisible && userInfoVariable) {
			setUserInfoVariable(null)
		}
	})
	const hide = () => {
		dispatch(saveUserInfo(userInfoVariable))
		dispatch(togglePersonalInfoModal(false))
	}
	const handleSave = () => {
		// TODO: refactor
		const condition = canEditInfo
			? !userInfo.country ||
			  !userInfo.city?.trim() ||
			  !alphabeticRegex(userInfo.citycity) ||
			  !userInfo.postalCode?.trim() ||
			  !userInfo.address?.trim()
			: !userInfo.country ||
			  !userInfo.city?.trim() ||
			  !alphabeticRegex(userInfo.city) ||
			  !userInfo.postalCode?.trim() ||
			  !userInfo.address?.trim() ||
			  !userInfo.firstName?.trim() ||
			  !userInfo.lastName?.trim() ||
			  !userInfo.citizenship

		if (error || condition) {
			setError(true)
		} else dispatch(saveUserInfoSaga())
	}

	// TODO: FIX types
	const handleCountries = (countryDrop, citizenshipDrop) => {
		setCountryModalVisible(true)
		if (countryDrop) setCountryDrop(true)
		if (citizenshipDrop) setCitizenshipDrop(true)
	}

	const handleReset = () => {
		setCitizenshipDrop(false), setCountryDrop(false)
	}

	const citizenshipText = (code: string) => {
		let country
		countriesConstant?.forEach((c) => {
			if (c.code === code) country = c.name
		})
		return country
	}

	const canEditInfo =
		userInfo?.userStatus === 'VERIFIED' || userInfo?.userStatus === 'PENDING'

	const onChangeText = (firstName: string) =>
		dispatch(saveUserInfo({ ...userInfo, firstName }))
	return {
		onChangeText,
		userInfo,
		alphabeticRegex,
		error,
		handleReset,
		handleCountries,
		citizenshipText,
		canEditInfo,
		handleSave,
		isProfileUpdating,
		citizenshipDrop,
		countryDrop,
		personalInfoModalVisible,
		hide,
		setChosenCountry,
		chosenCountry,
		countryModalVisible,
		setCountryModalVisible,
	}
}

export default usePersonalInfoModal
