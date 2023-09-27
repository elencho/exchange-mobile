import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import { useCallback } from 'react'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import VersionCheck from 'react-native-version-check'
import { useDispatch } from 'react-redux'
import { useTheme } from '@theme/index'
import {
	getCountryName,
	packageName,
	currentVersion,
} from '@app/constants/system'
import { setLanguage } from '@app/redux/profile/actions'
import { Screens } from '@app/refactor/setup/nav/types'
import { checkReadiness, fetchTranslations } from '@app/utils/appUtils'
import { addResources, switchLanguage } from '@app/utils/i18n'
import { fetchCountries } from '@app/utils/userProfileUtils'

interface Token {
	email: string
}

export default function useInitApp(
	navigation: NativeStackNavigationProp<Screens, 'Splash'>
) {
	const { theme } = useTheme()
	const dispatch = useDispatch()

	useFocusEffect(
		useCallback(() => {
			startApp()
		}, [])
	)

	const startApp = async () => {
		dispatch({ type: 'RESET_STATE' })
		await AsyncStorage.removeItem('webViewVisible')
		changeNavigationBarColor(theme.color.backgroundPrimary, true)

		const maintenanceInProgress = await checkStatus()
		const updateNeeded = await checkUpdateNeeded()
		let userHasToken = false

		await SecureStore.getItemAsync('accessToken').then((token) => {
			userHasToken = token != null
			if (token) {
				const email = jwt_decode<Token>(token)?.email
				getBiometricEnabled(email, updateNeeded, maintenanceInProgress)
			}
		})

		await fetchLexicon(updateNeeded, maintenanceInProgress, userHasToken)
		// navigate(updateNeeded, maintenanceInProgress, userHasToken)
	}

	const navigate = (
		updateNeeded: boolean,
		maintenanceInProgress: boolean,
		userHasToken: boolean
	) => {
		if (maintenanceInProgress) {
			navigation.navigate('Maintenance')
		} else if (updateNeeded) {
			navigation.navigate('UpdateAvailable')
		} else {
			if (userHasToken) {
				navigation.navigate('Main')
			} else {
				navigation.navigate('SetNewPassword') // TODO: Default-Welcome
			}
		}
	}

	const getBiometricEnabled = async (
		email: string,
		updateNeeded: boolean | undefined,
		maintenanceInProgress: boolean
	) => {
		const user = email
		const enabled = await AsyncStorage.getItem('BiometricEnabled')
		const lastTimeOpen = await AsyncStorage.getItem('isOpenDate')
		const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
		const timeDifference = lastTimeOpen
			? Date.now() - JSON.parse(lastTimeOpen)
			: 0

		let parsedUsers = enabled ? JSON.parse(enabled) : ''
		const userIndex = parsedUsers?.find(
			(u) => u?.user === user && u?.enabled === true
		)

		if (userIndex && timeDifference >= 30000 && !isLoggedIn) {
			// TODO: Should not navigate after this
			navigation.navigate('Resume', {
				fromSplash: true,
				version: updateNeeded,
				maintenanceInProgress: maintenanceInProgress,
			})
		}
	}

	const checkUpdateNeeded = useCallback(async () => {
		try {
			const countryName = await getCountryName
			// TODO: Removed APP_ID, should work?
			const latestVersion = await VersionCheck.getLatestVersion({
				forceUpdate: true,
				packageName: packageName,
				country: countryName.toLowerCase() || 'ge',
			})

			const versionInfo = await VersionCheck.needUpdate({
				currentVersion: currentVersion,
				latestVersion: latestVersion,
			})

			return versionInfo?.isNeeded
		} catch (error) {
			console.log(error)
			return false
		}
	}, [])

	const checkStatus = async () => {
		const version = DeviceInfo.getVersion()
		const { status } = await checkReadiness(version, Platform.OS)
		if (status === 'DOWN') {
			return true
		} else {
			return false
		}
	}

	const fetchLexicon = async (
		updateNeeded: boolean,
		maintenanceInProgress: boolean,
		userHasToken: boolean
	) => {
		await fetchTranslations()
			.then((res) => {
				const languages = Object.keys(res)
				for (let i = 0; i < languages.length; i++) {
					const translations = res[languages[i]].translation
					Object.keys(translations).forEach((key) => {
						if (translations[key] === null) translations[key] = ''
					})
					addResources(languages[i], 'translation', translations)
				}
				SecureStore.getItemAsync('language')
					.then((l) => {
						switchLanguage(l ? l : 'en')
						dispatch(setLanguage(l ? l : 'en'))
						navigate(updateNeeded, maintenanceInProgress, userHasToken)
					})
					.catch((err) => console.log(err))
			})
			.catch((err) => console.log(err))

		fetchCountries() //TODO: dispatch
	}
}
