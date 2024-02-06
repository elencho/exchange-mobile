import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePhoneNumberThunk } from '@app/refactor/redux/profile/profileThunks'
import {
	handleAxiosErrors,
	handleGeneralError,
} from '@app/refactor/utils/errorUtils'
import { OTPTypes } from '@app/refactor/types/enums'
import { verifyPhoneNumber } from '@app/refactor/redux/profile/profileApi'

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
		profile: {
			userInfo,
			userProfileButtonsLoading,
			userProfileLoading,
			tOTPChangeParams,
		},
		common: { countries, language },
		auth: { otpType },
	} = state

	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	const [error, setError] = useState(false)
	const [seconds, setSeconds] = useState(30)
	const [timerVisible, setTimerVisible] = useState(false)
	const [sendLoading, resendLoading] = useState(false)
	const [alreadySent, setAlreadySent] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber!)
	const [verificationCode, setVerificationCode] = useState('')
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

	const reset = () => {
		setSeconds(30)
		setTimerVisible(false)
	}

	useEffect(() => {
		if (phoneNumberModalVisible) {
			if (!seconds) reset()
			if (seconds && timerVisible) {
				setTimeout(() => {
					setSeconds(seconds - 1)
				}, 1000)
			}
		} else {
			reset()
		}
	}, [seconds, timerVisible])

	useEffect(() => {
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

	const handleVerificationNumber = (verificationNumber: string) => {
		setGeneralErrorData(null)
		setVerificationCode(verificationNumber)
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

	const sendVerification = async () => {
		resendLoading(true)

		const response = await verifyPhoneNumber(phoneNumber, chosenCountry?.code)
		await handleAxiosErrors(
			response,
			() => {
				setAlreadySent(true)
				setTimerVisible(true)
				resendLoading(false)
			},
			(error) => {
				resendLoading(false)
				setGeneralErrorData(error)
			}
		)
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
		setVerificationCode: handleVerificationNumber,
		verificationCode,
		sendVerification,
		alreadySent,
		sendLoading,
		timerVisible,
		seconds,
		language
	}
}
