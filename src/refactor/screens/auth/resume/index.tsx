import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useCallback, useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Biometric from '@assets/images/Biometric.svg'
import { useFocusEffect } from '@react-navigation/native'
import {
	AuthenticationType,
	authenticateAsync,
	cancelAuthenticate,
	supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'
import { System } from '@app/refactor/common/util'
import { t } from 'i18next'
import { logoutThunk } from '@store/redux/auth/thunks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setBiometricScreenOpened } from '@store/redux/common/slice'
import KV from '@store/kv/regular'

const Resume = ({ navigation, route }: ScreenProp<'Resume'>) => {
	const dispatch = useDispatch()
	const { styles } = useTheme(_styles)

	const { from, maintenanceInProgress, version } = route.params
	const fromSplash = from === 'Splash'

	const resumed = route?.key === 'Resume-uniqueKey'

	const { userInfo } = useSelector((state: RootState) => state.profile)

	const [bioType, setBioType] = useState<BioType>()

	useFocusEffect(
		useCallback(() => {
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

	const handleBiometricType = useCallback(async () => {
		try {
			await supportedAuthenticationTypesAsync()
				.then((data) => {
					if (data.includes(AuthenticationType.FACIAL_RECOGNITION)) {
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
			cancelLabel: t('Abort') || '',
		})
		if (authResult?.success) {
			KV.set('lastOpenDateMillis', Date.now())

			if (maintenanceInProgress) {
				navigation.navigate('Maintenance')
			} else if (version) {
				navigation.navigate('UpdateAvailable')
			} else if (fromSplash && !resumed) {
				navigation.replace('Main')
			} else {
				if (navigation.getState().routes.length > 1) navigation.goBack()
			}
		} else if (
			['passcode_not_set', 'not_enrolled'].includes(authResult?.error)
		) {
			logoutAndReturnToWelcome()
		}
	}, [])

	const logoutAndReturnToWelcome = () => {
		dispatch(logoutThunk())
	}

	return (
		<View style={styles.container}>
			<Biometric height={66} width={66} />
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
				onPress={logoutAndReturnToWelcome}
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
