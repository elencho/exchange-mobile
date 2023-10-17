import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	authenticateAsync,
	isEnrolledAsync,
	supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	toggleEmailAuthModal,
	toggleGoogleOtpModal,
	togglePasswordModal,
	toggleSmsAuthModal,
} from '@app/refactor/redux/modals/actions'
import {
	setCurrentSecurityAction,
	setEmailAuth,
	setGoogleAuth,
} from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { sendOtp } from '@app/utils/userProfileUtils'

export const useSecurityRow = ({ text }: { text: string }) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)
	const { userInfo, smsAuth, emailAuth, googleAuth } = state

	const [bioType, setBioType] = useState<string | null>(null)
	const [isBioOn, setIsBioOn] = useState(false)

	useEffect(() => {
		handleBiometricIcon()
		getBiometricEnabled(userInfo?.email)
	}, [])

	const handlePassword = () => {
		dispatch(togglePasswordModal(true))
	}

	const handleAuth = async (type, user) => {
		const enabledUsers = await AsyncStorage.getItem('BiometricEnabled')
		const enrolled = await isEnrolledAsync()
		let newUser = JSON.parse(enabledUsers!)
		if (!newUser) {
			newUser = []
		}

		if (isBioOn) {
			const newUsers = newUser.filter((u) => u.user !== user)
			await AsyncStorage.removeItem('BiometricEnabled')
			await AsyncStorage.setItem('BiometricEnabled', JSON.stringify(newUsers))
			return setIsBioOn(false)
		}

		if (enrolled) {
			const result = await authenticateAsync({
				promptMessage: 'Log in with fingerprint or faceid',
				cancelLabel: 'Abort',
			})
			if (result.success) {
				newUser?.push({ user: user, enabled: true, type: type })
				await AsyncStorage.setItem('BiometricEnabled', JSON.stringify(newUser))
					.then(async () => {
						setIsBioOn(true)
						await AsyncStorage.setItem('isLoggedIn', 'true')
					})
					.catch(() => {
						console.log('‘There was an error saving the product’')
					})
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

	// TODO: add user type
	const getBiometricEnabled = async (user) => {
		const enabledUsers = await AsyncStorage.getItem('BiometricEnabled')
		if (enabledUsers) {
			let parsedUsers = JSON.parse(enabledUsers)
			const userIndex = parsedUsers?.find(
				(u) => u?.user === user && u?.enabled === true
			)
			if (userIndex) {
				setIsBioOn(true)
			}
		}
	}

	const handleChange = () => {
		switch (text) {
			case 'Google_Auth':
				if (emailAuth) dispatch(toggleEmailAuthModal(true))
				if (smsAuth) dispatch(toggleSmsAuthModal(true))
				dispatch(setCurrentSecurityAction('google'))
				dispatch(setGoogleAuth(true))
				sendOtp()
				break
			case 'E_mail_Auth':
				if (googleAuth) dispatch(toggleGoogleOtpModal(true))
				if (smsAuth) {
					dispatch(toggleSmsAuthModal(true))
					sendOtp()
				}
				dispatch(setCurrentSecurityAction('email'))
				dispatch(setEmailAuth(true))

				break
			case 'Biometric':
				handleAuth(bioType, userInfo?.email)
			default:
				break
		}
	}
	return {
		handleAuth,
		handleChange,
		getBiometricEnabled,
		handlePassword,
		userInfo,
		smsAuth,
		emailAuth,
		googleAuth,
		isBioOn,
		bioType,
		images,
	}
}
