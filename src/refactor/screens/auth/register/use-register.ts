import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import navigation from '@app/navigation'
import {
	registrationFormAction,
	startLoginAction,
	setRegistrationInputs,
	switchPersonalCompany,
} from '@app/redux/profile/actions'
import { Screens } from '@app/refactor/setup/nav/nav'

export default function useRegister(
	navigation: NativeStackNavigationProp<Screens, 'Registration'>
) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state.profile)
	const { registrationInputs, userProfileLoading } = state

	const [error, setError] = useState(false)

	useEffect(() => {
		preventBio()
	}, [])

	useEffect(() => {
		error && setError(false)
	}, [registrationInputs])

	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		phoneCountry,
		acceptTerms,
		passwordNew,
		passwordConfirm,
	} = registrationInputs

	const passLength = passwordNew?.length >= 8
	const hasUpperAndLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(passwordNew)
	const hasNumber = /\d/.test(passwordNew)

	const validations = {
		nameCheck:
			firstName?.trim() && /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]+$/g.test(firstName),
		lastNameCheck:
			lastName?.trim() && /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]+$/g.test(lastName),
		passwordCheck: passLength && hasNumber && hasUpperAndLower,
		isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email),
		similarPasswords: passwordNew === passwordConfirm,
		terms: acceptTerms === 'on',
		phoneNumberCheck: /^[0-9]+$/.test(phoneNumber),

		passLength,
		hasUpperAndLower,
		hasNumber,
	}

	const enabled =
		validations.nameCheck &&
		validations.lastNameCheck &&
		validations.isEmail &&
		validations.similarPasswords &&
		validations.passwordCheck &&
		validations.phoneNumberCheck &&
		firstName &&
		lastName &&
		phoneNumber &&
		phoneCountry &&
		validations.terms

	const handleRegistration = () => {
		if (!enabled) {
			setError(true)
		} else {
			dispatch(registrationFormAction(navigation))
		}
	}
	const goToSignIn = () => {
		dispatch(startLoginAction(navigation))
		setTimeout(() => {
			dispatch(setRegistrationInputs({}))
			dispatch(switchPersonalCompany('Personal'))
		}, 1000)
	}

	const preventBio = async () => await AsyncStorage.removeItem('isOpenDate')

	return {
		goToSignIn,
		handleRegistration,
		userProfileLoading,
		error,
		validations,
	}
}
