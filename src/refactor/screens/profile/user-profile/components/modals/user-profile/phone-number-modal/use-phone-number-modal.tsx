import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePhoneNumberThunk } from '@app/refactor/redux/profile/profileThunks'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import { verifyPhoneNumber } from '@app/utils/userProfileUtils'
import { OTPTypes } from '@app/refactor/types/enums'

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
		profile: { userInfo, userProfileButtonsLoading, userProfileLoading, tOTPChangeParams},
		common: { countries },
		auth: { otpType },
	} = state

	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [error, setError] = useState(false)
	const [seconds, setSeconds] = useState(30)
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber!)
	const [verificationCode, setVerificationCode] = useState()
	const x = {
		name: userInfo?.phoneCountry,
		code: userInfo?.phoneCountry,
		phoneCode: userInfo?.phoneCountry,
	}
	const [chosenCountry, setChosenCountry] = useState(x)
	const [countryModalVisible, setCountryModalVisible] = useState(false)
	const [countryFilterText, setCountryFilterText] = useState('')

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

	const saveHide = () => {
		togglePhoneNumberModal(false)
	}

	const hide = () => {
		if (!userProfileButtonsLoading && !userProfileLoading) {
			togglePhoneNumberModal(false)
			setPhoneNumber(userInfo?.phoneNumber!)
			setChosenCountry(x)
			setGeneralErrorData(null)
		}
	}

	const phoneCountry = () => {
		let phoneCountry
		countries?.forEach((c: Country) => {
			if (userInfo?.phoneCountry === c.code) {
				// phoneCountry = c.phoneCode
				setChosenCountry({ name: c.name, code: c.code, phoneCode: c.phoneCode })
			}
		})

		return phoneCountry
	}

	const handlePhoneNumber = (phoneNumber: string) => {
		setGeneralErrorData(null)
		setPhoneNumber(phoneNumber)
		setError(false)
	}

	const handleSave = () => {
		setGeneralErrorData(null)
		if (
			error ||
			!userInfo?.phoneCountry ||
			(!verificationCode && otpType === OTPTypes.SMS) ||
			!(phoneNumber?.trim()?.length > 0)
		) {
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
								verificationCode,
								changeOTPToken: tOTPChangeParams?.changeOTPToken,
								onSuccess: saveHide,
							})
						),
					setGeneralErrorData
				)
			}
		}
	}

	const handleCountries = () => setCountryModalVisible(true)
	const handleChangeCountry = (country: Country) => {
		setChosenCountry(country)
		setGeneralErrorData(null)
	}

	const sendVerification = () => {
		verifyPhoneNumber(phoneNumber, chosenCountry)
	}

	return {
		userInfo,
		countries,
		phoneNumberModalVisible,
		hide,
		handlePhoneNumber,
		handleSave,
		handleCountries,
		phoneCountry,
		error,
		setChosenCountry: handleChangeCountry,
		chosenCountry,
		countryModalVisible,
		setCountryModalVisible,
		phoneNumber,
		generalErrorData,
		userProfileButtonsLoading,
		countryFilterText,
		setCountryFilterText,
		otpType,
		setVerificationCode,
		verificationCode,
		sendVerification,
	}
}
