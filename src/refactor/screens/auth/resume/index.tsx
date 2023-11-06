import PurpleText from '@app/components/PurpleText'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useCallback, useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import FaceID from '@assets/images/Face_ID-pruple.svg'
import TouchID from '@assets/images/TouchID-Purple.svg'
import { useFocusEffect } from '@react-navigation/native'
import {
	AuthenticationType,
	authenticateAsync,
	cancelAuthenticate,
	supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import KVStore from '@store/kv'
import { System } from '@app/refactor/common/util'
import { t } from 'i18next'
import { logoutThunk } from '@store/redux/auth/thunks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setBiometricScreenOpened } from '@store/redux/common/slice'

const Resume = ({ navigation, route }: ScreenProp<'Resume'>) => {
	const dispatch = useDispatch()
	const { styles } = useTheme(_styles)

	const params = route.params
	const fromSplash = params.from === 'Splash'

	const { userInfo } = useSelector((state: RootState) => state.profile)

	const [bioType, setBioType] = useState<BioType>()

	useFocusEffect(
		useCallback(() => {
			KVStore.set('authVisible', true)
			handleBiometricType()
			tryBioAuth(fromSplash)
		}, [fromSplash])
	)

	useEffect(() => {
		dispatch(setBiometricScreenOpened(true))
		return () => {
			dispatch(setBiometricScreenOpened(false))
		}
	}, [])

	//TODO: Ask about this
	// const startAuthActions = async () => {
	// 	if (IS_ANDROID && withdrawalConfirmModalVisible) {
	// 		dispatch(toggleGoogleOtpModal(false))
	// 		dispatch(toggleEmailAuthModal(false))
	// 		dispatch(toggleSmsAuthModal(false))
	// 	}
	// 	if (Personal_Security === 'Security') {
	// 		dispatch(switchPersonalSecurity('Security'))
	// 	}
	// 	dispatch(toggleWebViewVisible(true))
	// 	await AsyncStorage.setItem('isLoggedIn', 'true')
	// 	await AsyncStorage.removeItem('isOpenDate')
	// 	await AsyncStorage.removeItem('authVisible')
	// }

	const handleBiometricType = useCallback(async () => {
		try {
			await supportedAuthenticationTypesAsync()
				.then((data) => {
					if (data[0] === AuthenticationType.FACIAL_RECOGNITION) {
						setBioType('FaceID')
					} else {
						setBioType('TouchID')
					}
				})
				.catch((err) => console.log(err))
		} catch (err) {
			console.log(err)
		}
	}, [])

	const tryBioAuth = useCallback(async (fromSplash: boolean) => {
		if (System.isAndroid) cancelAuthenticate()

		const authResult = await authenticateAsync({
			promptMessage: t('Log in with fingerprint or faceid').toString(),
			cancelLabel: t('Abort').toString(),
		})

		if (authResult?.success) {
			//TODO: Check all bad cases
			if (fromSplash) {
				navigation.navigate('Main')
			} else {
				navigation.goBack()
			}
		} else if (
			['passcode_not_set', 'not_enrolled'].includes(authResult?.error)
		) {
			standardLogin()
		}
	}, [])

	const standardLogin = () => {
		KVStore.del('authVisible')
		dispatch(logoutThunk({ navigation }))
	}

	return (
		<View style={styles.container}>
			{bioType === 'FaceID' ? <FaceID /> : <TouchID />}
			<AppText variant="headline" style={styles.primary}>
				<Trans
					i18nKey="welcome back {{username}} params{username}"
					values={{ username: userInfo?.firstName }}
				/>
			</AppText>

			<AppText variant="title" style={styles.second}>
				{bioType === 'FaceID'
					? 'face id subtitle description'
					: 'touch id subtitle description'}
			</AppText>
			<AppButton
				variant="primary"
				text={
					bioType === 'FaceID' ? 'Login with Face ID' : 'Login with Touch ID'
				}
				style={styles.button}
				onPress={() => tryBioAuth(fromSplash)}
			/>
			<AppButton
				variant="text"
				text="Standard Log In"
				onPress={standardLogin}
			/>
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: theme.color.backgroundPrimary,
		},
		primary: {
			color: theme.color.textPrimary,
			marginTop: 25,
			marginBottom: 12,
			textAlign: 'center',
		},
		second: {
			color: theme.color.textSecondary,
			marginBottom: 80,
			textAlign: 'center',
		},
		button: {
			paddingHorizontal: 44,
			marginBottom: 38,
		},
	})

export default Resume
