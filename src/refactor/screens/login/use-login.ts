import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import navigation from '@app/navigation'
import {
	setCredentials,
	usernameAndPasswordAction,
	startRegistrationAction,
} from '@app/redux/profile/actions'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export default function useLogin() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		profile: { credentials, userProfileLoading },
	}: any = state

	const loginText: string = credentials.login
	const passwordText: string = credentials.password
	const loginValid = LOGIN_REGEX.test(loginText)

	const [error, setError] = useState(false)

	useEffect(() => {
		error && setError(false)
	}, [credentials])

	useFocusEffect(
		useCallback(() => {
			preventBio()
			return () =>
				setTimeout(() => {
					dispatch(setCredentials({}))
				}, 400)
		}, [])
	)

	const preventBio = async () => await AsyncStorage.removeItem('isOpenDate')

	const onLoginChanged = useCallback(
		(t: string) => dispatch(setCredentials({ ...credentials, loginText: t })),
		[credentials]
	)

	const onPasswordChanged = useCallback(
		(t: string) =>
			dispatch(setCredentials({ ...credentials, passwordText: t })),
		[credentials]
	)

	const onLoginPressed = () => {
		if (!loginText || !passwordText || !loginValid) {
			setError(true)
		} else {
			dispatch(usernameAndPasswordAction(navigation))
		}
	}

	const onForgotPasswordPressed = () =>
		dispatch({ type: 'FORGOT_PASSWORD_SAGA', navigation })

	const onRegisterPressed = () => dispatch(startRegistrationAction(navigation))

	const errorText = () =>
		error && loginText?.trim() && !loginValid ? 'Enter Valid Email' : null

	return {
		loginText,
		passwordText,
		loginError: errorText(),
		passwordError: error && passwordText,
		userProfileLoading,
		onLoginChanged,
		onPasswordChanged,
		onRegisterPressed,
		onLoginPressed,
		onForgotPasswordPressed,
	}
}
