import jwt_decode from 'jwt-decode'
import {
	authenticateAsync,
	isEnrolledAsync,
	supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePasswordModal } from '@app/refactor/redux/modals/modalsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { canDoBiometric } from '@app/refactor/utils/authUtils'
import { TokenParams } from '@app/refactor/types/auth/splash'
import SecureKV from '@store/kv/secure'
import { sendOtp } from '@app/refactor/redux/profile/profileApi'
import { setCurrentSecurityAction } from '@app/refactor/redux/profile/profileSlice'
import KV from '@store/kv/regular'

interface SecurityRowProps {
	text: string
	togglePasswordModal?: (v: boolean) => void
	toggleEmailAuthModalVisible?: (v: boolean) => void
	toggleGoogleOtpModalVisible?: (v: boolean) => void
}

export const useSecurityRow = (props: SecurityRowProps) => {
	const {
		text,
		togglePasswordModal = () => {},
		toggleEmailAuthModalVisible = () => {},
		toggleGoogleOtpModalVisible = () => {},
		toggleSmsAuthModalVisible,
	} = props

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
		togglePasswordModal(true)
	}

	const handleAuth = async (userEmail: string) => {
		const cachedEmails = (await SecureKV.get('bioEnabledEmails')) || []
		const hasFaceOrTouchIdSaved = await isEnrolledAsync()
		if (isBioOn) {
			const withoutUserMail = cachedEmails.filter((e) => e !== userEmail)
			SecureKV.set('bioEnabledEmails', withoutUserMail)
			return setIsBioOn(false)
		}
		if (!isBioOn && hasFaceOrTouchIdSaved) {
			const result = await authenticateAsync({
				promptMessage: 'Log in with fingerprint or faceid',
				cancelLabel: 'Abort',
			})
			if (result.success) {
				KV.set('lastOpenDateMillis', Date.now())

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

	const handleChange = (value: string) => {
		// TODO: Remove this and use userInfo.email
		// Right now returns undefined so I take email from accessToken

		const email = jwt_decode<TokenParams>(accessToken || '')?.email
		if (value === 'Google_Auth') {
			if (otpType === 'EMAIL') {
				toggleEmailAuthModalVisible!(true)
			}
			if (otpType === 'SMS') {
				toggleSmsAuthModalVisible(true)
			}
			dispatch(setCurrentSecurityAction('TOTP'))
			sendOtp()
		} else if (value === 'E_mail_Auth') {
			if (otpType === 'TOTP') {
				toggleGoogleOtpModalVisible!(true)
			}
			if (otpType === 'SMS') {
				toggleSmsAuthModalVisible(true)
			}
			dispatch(setCurrentSecurityAction('EMAIL'))
		} else if (value === 'Biometric') {
			handleAuth(email!)
		}
	}

	const handleChangeGoogle = () => {
		if (otpType === 'EMAIL') toggleEmailAuthModalVisible(true)
		if (otpType === 'SMS') toggleSmsAuthModalVisible(true)
		dispatch(setCurrentSecurityAction('TOTP'))
		sendOtp()
	}

	return {
		handleChange,
		handlePassword,
		userInfo,
		isBioOn,
		bioType,
		otpType,
		handleChangeGoogle,
	}
}
