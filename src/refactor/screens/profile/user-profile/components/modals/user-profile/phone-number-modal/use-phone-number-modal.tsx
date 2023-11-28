import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePhoneNumber } from '@app/utils/userProfileUtils'
import { updatePhoneNumberThunk } from '@app/refactor/redux/profile/profileThunks'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

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
		profile: { userInfo, userProfileButtonsLoading },
		common: { countries },
	} = state

	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [error, setError] = useState(false)
	const [seconds, setSeconds] = useState(30)
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber!)
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
		phoneCountry()
	}, [phoneNumberModalVisible])

	const hide = () => {
		!userProfileButtonsLoading && togglePhoneNumberModal(false)
	}

	const phoneCountry = () => {
		let phoneCountry
		countries?.forEach((c: Country) => {
			if (userInfo?.phoneCountry === c.code) {
				// phoneCountry = c.phoneCode
				setChosenCountry({ name: c.name, code: c.code })
			}
		})

		return phoneCountry
	}

	const onModalHide = () => {
		// dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
		setGeneralErrorData(null)
		setPhoneNumber(userInfo?.phoneNumber!)
		setChosenCountry(x)
	}

	const handlePhoneNumber = (phoneNumber: string) => {
		setGeneralErrorData(null)
		setPhoneNumber(phoneNumber)
	}

	const handleSave = () => {
		if (error || !userInfo?.country || !(phoneNumber?.trim()?.length > 2)) {
			setError(true)
		} else {
			const phoneCountry = chosenCountry.code
			if (phoneNumber && phoneCountry) {
				handleGeneralError(
					() =>
						dispatch(
							updatePhoneNumberThunk({
								phoneNumber,
								phoneCountry,
								hideModal: hide,
							})
						),
					setGeneralErrorData
				)
			}
		}
	}

	const handleCountries = () => setCountryModalVisible(true)

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
		generalErrorData,
		userProfileButtonsLoading,
	}
}
