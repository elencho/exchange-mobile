import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	toggleCountriesModal,
	togglePhoneNumberModal,
} from '@app/refactor/redux/modals/modalsSlice'
import { saveUserInfo } from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePhoneNumber } from '@app/utils/userProfileUtils'

export const usePhoneNumberModal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		modalState: { phoneNumberModalVisible },
		profile: { userInfo, userProfileLoading },
		common: { countries },
	} = state

	const [error, setError] = useState(false)
	const [seconds, setSeconds] = useState(30)
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber)
	const x = {
		name: userInfo?.phoneCountry,
		code: userInfo?.phoneCountry,
	}
	const [chosenCountry, setChosenCountry] = useState(x)
	const [countryModalVisible, setCountryModalVisible] = useState(false)

	useEffect(() => {
		if (error) {
			setError(false)
		}
	}, [userInfo])

	useEffect(() => {
		if (phoneNumberModalVisible) {
			setSeconds(30)
		}
	}, [phoneNumberModalVisible])

	const hide = () => {
		dispatch(togglePhoneNumberModal(false))
	}

	const onModalHide = () => {
		dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
	}

	const handlePhoneNumber = (phoneNumber: string) => setPhoneNumber(phoneNumber)

	const handleSave = () => {
		if (
			error ||
			!userInfo?.country ||
			!(userInfo?.phoneNumber?.trim()?.length > 2)
		) {
			setError(true)
		} else {
			updatePhoneNumber(phoneNumber, chosenCountry.code)
			hide()
		}
	}

	const handleCountries = () => setCountryModalVisible(true)

	const phoneCountry = () => {
		let phoneCountry
		countries?.forEach((c: Country) => {
			if (userInfo?.country === c.code) {
				phoneCountry = c.phoneCode
			}
		})
		return phoneCountry
	}

	return {
		userInfo,
		countries,
		phoneNumberModalVisible,
		hide,
		onModalHide,
		handlePhoneNumber,
		handleSave,
		handleCountries,
		phoneCountry,
		error,
		setChosenCountry,
		chosenCountry,
		countryModalVisible,
		setCountryModalVisible,
		phoneNumber,
	}
}
