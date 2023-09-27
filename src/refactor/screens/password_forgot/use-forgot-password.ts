import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { startLoginAction } from '@app/redux/profile/actions'
import { Screens } from '@app/refactor/setup/nav/types'

const useForgotPassword = (
	forgotPassInfo: any,
	navigation: NativeStackNavigationProp<Screens, 'ForgotPassword'>
) => {
	const dispatch = useDispatch()
	const [error, setError] = useState(false)

	useEffect(() => {
		error && setError(false)
	}, [forgotPassInfo])

	const mailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
		forgotPassInfo.username
	)

	const goToLogin = () => {
		navigation.navigate('Login')
		dispatch(startLoginAction(navigation))
	}

	const sendCode = () => {
		if (!mailValid) {
			setError(true)
		} else {
			dispatch({ type: 'SEND_FORGOT_PASS_CODE' })
		}
	}

	const saveUsername = (username: any) =>
		dispatch({
			type: 'SAVE_FORGOT_PASS_INFO',
			forgotPassInfo: { ...forgotPassInfo, username },
		})

	const saveCode = (code: any) => {
		dispatch({
			type: 'SAVE_FORGOT_PASS_INFO',
			forgotPassInfo: { ...forgotPassInfo, code },
		})
	}

	const next = () => {
		if (!forgotPassInfo.code?.trim() || !forgotPassInfo.username?.trim()) {
			setError(true)
		} else {
			dispatch({
				type: 'FORGOT_PASS_ENTER_CODE',
				navigation,
			})
		}
	}

	const errorText = () =>
		error && forgotPassInfo.username?.trim() && !mailValid
			? 'Enter Valid Email'
			: ''

	return {
		goToLogin,
		sendCode,
		saveUsername,
		saveCode,
		next,
		error,
		mailValid,
		errorText,
	}
}

export default useForgotPassword
