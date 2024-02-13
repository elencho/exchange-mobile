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
import { useSmsOtpVerifier } from '@app/refactor/common/util'

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
	const [error, setError] = useState({
		phoneNumber: false,
		verificationCode: false,
	})
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
			setError({
				phoneNumber: false,
				verificationCode: false,
			})
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
		setError({
			phoneNumber: false,
			verificationCode: error.verificationCode,
		})
	}

	const handleVerificationNumber = (verificationNumber: string) => {
		setGeneralErrorData(null)
		setVerificationCode(verificationNumber)
		setError({
			phoneNumber: error.phoneNumber,
			verificationCode: false,
		})
	}
	useSmsOtpVerifier(handleVerificationNumber)

	const handleSave = () => {
		setGeneralErrorData(null)
		console.log(
			error.phoneNumber,
			error.verificationCode && otpType === OTPTypes.SMS,
			!chosenCountry?.phoneCode,
			!(verificationCode?.trim()?.length > 0) && otpType === OTPTypes.SMS,
			!(phoneNumber?.trim()?.length > 0)
		)
		if (
			error.phoneNumber ||
			(error.verificationCode && otpType === OTPTypes.SMS) ||
			!chosenCountry?.phoneCode ||
			(!(verificationCode?.trim()?.length > 0) && otpType === OTPTypes.SMS) ||
			!(phoneNumber?.trim()?.length > 0)
		) {
			setError({
				phoneNumber: !(phoneNumber?.trim()?.length > 0),
				verificationCode: !(verificationCode?.trim()?.length > 0),
			})
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
		setGeneralErrorData(null)

		if (!(phoneNumber?.trim()?.length > 0)) {
			setError({
				phoneNumber: !(phoneNumber?.trim()?.length > 0),
				verificationCode: error.verificationCode,
			})
		} else {
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
					setError({
						phoneNumber: true,
						verificationCode: false,
					})
				}
			)
		}
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
		language,
		setGeneralErrorData,
		setError,
	}
}
