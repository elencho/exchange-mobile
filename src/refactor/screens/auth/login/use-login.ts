import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startRegistrationAction } from '@app/redux/profile/actions'
import { setCredentials } from '@app/refactor/redux/auth/authSlice'
import { usernameAndPaswordThunk } from '@app/refactor/redux/auth/authThunks'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export default function useLogin() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const navigation = useNavigation()
	const {
		profile: { userProfileLoading },
		authReducer: { credentials },
	}: any = state

	const { login, password } = credentials
	const loginValid = LOGIN_REGEX.test(login)

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
		(t: string) => dispatch(setCredentials({ ...credentials, login: t })),
		[credentials]
	)

	const onPasswordChanged = useCallback(
		(t: string) => dispatch(setCredentials({ ...credentials, password: t })),
		[credentials]
	)

	const onLoginPressed = () => {
		if (!login || !password || !loginValid) {
			setError(true)
		} else {
			dispatch(usernameAndPaswordThunk(navigation))
		}
	}

	const onForgotPasswordPressed = () =>
		dispatch({ type: 'FORGOT_PASSWORD_SAGA', navigation })

	const onRegisterPressed = () => dispatch(startRegistrationAction(navigation))

	const errorText = () =>
		error && login?.trim() && !loginValid ? 'Enter Valid Email' : null

	return {
		login,
		password,
		loginError: errorText(),
		passwordError: error && password,
		userProfileLoading,
		onLoginChanged,
		onPasswordChanged,
		onRegisterPressed,
		onLoginPressed,
		onForgotPasswordPressed,
	}
}
