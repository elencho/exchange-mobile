import jwt_decode from 'jwt-decode'
import {
	authenticateAsync,
	isEnrolledAsync,
	supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePasswordModal } from '@app/refactor/redux/modals/modalsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { canDoBiometric } from '@app/refactor/utils/authUtils'
import { TokenParams } from '@app/refactor/types/auth/splash'
import SecureKV from '@store/kv/secure'

export const useSecurityRow = ({ text }: { text: string }) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const { userInfo } = state.profile
	const { accessToken, otpType } = state.auth

	const [bioType, setBioType] = useState<string | null>(null)
	const [isBioOn, setIsBioOn] = useState(false)

	useEffect(() => {
		handleBiometricIcon()

		canDoBiometric(accessToken).then((can) => {
			if (can) {
				setIsBioOn(true)
			}
		})
	}, [])

	const handlePassword = () => {
		dispatch(togglePasswordModal(true))
	}

	const handleAuth = async (userEmail: string) => {
		const cachedEmails = (await SecureKV.get('bioEnabledEmails')) || []
		const hasFaceOrTouchIdSaved = await isEnrolledAsync()

		if (isBioOn) {
			const withoutUserMail = cachedEmails.filter((e) => e !== userEmail)
			SecureKV.set('bioEnabledEmails', withoutUserMail)
			return setIsBioOn(false)
		}
		if (hasFaceOrTouchIdSaved) {
			const result = await authenticateAsync({
				promptMessage: 'Log in with fingerprint or faceid',
				cancelLabel: 'Abort',
			})
			if (result.success) {
				const addedUserMail = cachedEmails
					.filter((e) => e !== userEmail)
					.concat([userEmail])

				SecureKV.set('bioEnabledEmails', addedUserMail)
				setIsBioOn(true)
			}
		}
	}

	const handleBiometricIcon = async () => {
		try {
			await supportedAuthenticationTypesAsync()
				.then((data) => {
					if (data[0] === 2) {
						setBioType('FACEID')
					} else {
						setBioType('TOUCHID')
					}
				})
				.catch((err) => console.log(err))
		} catch (err) {
			console.log(err)
		}
	}

	const handleChange = () => {
		// TODO: Remove this and use userInfo.email
		// Right now returns undefined so I take email from accessToken
		const email = jwt_decode<TokenParams>(accessToken || '')?.email
		handleAuth(email)
		// switch (text) {
		// 	case 'Google_Auth':
		// 		if (emailAuth) dispatch(toggleEmailAuthModal(true))
		// 		if (smsAuth) dispatch(toggleSmsAuthModal(true))
		// 		dispatch(setCurrentSecurityAction('google'))
		// 		dispatch(setGoogleAuth(true))
		// 		sendOtp()
		// 		break
		// 	case 'E_mail_Auth':
		// 		if (googleAuth) dispatch(toggleGoogleOtpModal(true))
		// 		if (smsAuth) {
		// 			dispatch(toggleSmsAuthModal(true))
		// 			sendOtp()
		// 		}
		// 		dispatch(setCurrentSecurityAction('email'))
		// 		dispatch(setEmailAuth(true))

		// 		break
		// 	case 'Biometric':
		// 		handleAuth(userInfo?.email)
		// 	default:
		// 		break
		// }
	}
	return {
		handleAuth,
		handleChange,
		handlePassword,
		userInfo,
		isBioOn,
		bioType,
		otpType,
	}
}
