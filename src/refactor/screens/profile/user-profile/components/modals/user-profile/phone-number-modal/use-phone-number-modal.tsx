import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePhoneNumber } from '@app/utils/userProfileUtils'

export const usePhoneNumberModal = ({
	phoneNumberModalVisible,
	togglePhoneNumberModal,
}: {
	phoneNumberModalVisible: boolean
	togglePhoneNumberModal: (v: boolean) => void
}) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
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
		togglePhoneNumberModal(false)
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
