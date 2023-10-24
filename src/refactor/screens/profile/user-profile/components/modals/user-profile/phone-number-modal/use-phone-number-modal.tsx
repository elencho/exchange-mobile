import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	toggleCountriesModal,
	togglePhoneNumberModal,
} from '@app/refactor/redux/modals/modalsSlice'
import {
	saveUserInfo,
	updatePhoneNumber,
} from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'

export const usePhoneNumberModal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		modalState: { phoneNumberModalVisible },
		profile: { userInfo, countries, timerVisible, isProfileUpdating },
	} = state

	const [userInfoVariable, setUserInfoVariable] = useState(null)
	const [error, setError] = useState(false)
	const [seconds, setSeconds] = useState(30)

	useEffect(() => {
		if (!timerVisible) {
			setSeconds(30)
			return
		}
		if (!seconds) {
			dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
			setSeconds(30)
		}
		if (seconds && timerVisible) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		}
	}, [seconds, timerVisible])

	useEffect(() => {
		if (error) {
			setError(false)
		}
	}, [userInfo])

	useEffect(() => {
		if (phoneNumberModalVisible) {
			setUserInfoVariable(userInfo)
			setSeconds(30)
		}
	}, [phoneNumberModalVisible])

	const hide = () => {
		dispatch(saveUserInfo(userInfoVariable))
		dispatch(togglePhoneNumberModal(false))
	}

	const onModalHide = () => {
		dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
	}

	const handlePhoneNumber = (phoneNumber: string) =>
		dispatch(saveUserInfo({ ...userInfo, phoneNumber }))

	const handleSave = () => {
		if (error || !userInfo.country || !(userInfo.number?.trim()?.length > 2)) {
			setError(true)
		} else {
			dispatch(
				updatePhoneNumber(
					userInfo.number,
					userInfo.country,
					setUserInfoVariable
				)
			)
		}
	}

	const handleCountries = () => dispatch(toggleCountriesModal(true))

	const phoneCountry = () => {
		let phoneCountry
		// TODO: add country type
		countries?.forEach((c) => {
			if (userInfo.country === c.code) {
				phoneCountry = c.phoneCode
			}
		})
		return phoneCountry
	}

	return {
		userInfoVariable,
		userInfo,
		countries,
		timerVisible,
		isProfileUpdating,
		phoneNumberModalVisible,
		hide,
		onModalHide,
		handlePhoneNumber,
		handleSave,
		handleCountries,
		phoneCountry,
		error,
	}
}
