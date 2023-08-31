import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import colors from 'constants/colors'

import SplashScreen from 'react-native-splash-screen'
import VersionCheck from 'react-native-version-check'
import * as SecureStore from 'expo-secure-store'
import DeviceInfo from 'react-native-device-info'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import { switchLanguage } from 'utils/i18n'
import { addResources } from 'utils/i18n'

import {
	getCountryName,
	APP_ID,
	packageName,
	currentVersion,
} from 'constants/system'

import { fetchCountries, setLanguage } from 'redux/profile/actions'
import { checkReadiness, fetchTranslations } from 'utils/appUtils'
import { Platform } from 'react-native'

export default function useInitApp(navigation: any) {
	const dispatch = useDispatch()

	useFocusEffect(
		useCallback(() => {
			startApp()
		}, [])
	)

	const startApp = async () => {
		dispatch({ type: 'RESET_STATE' })
		await AsyncStorage.removeItem('webViewVisible')

		const maintenanceInProgress = await statusDown()
		const updateNeeded = await checkVersion()

		await SecureStore.getItemAsync('accessToken').then((t) => {
			if (t) {
				const email = jwt_decode(t)?.email
				getBiometricEnabled(email, updateNeeded, maintenanceInProgress)
			} else {
				if (updateNeeded) {
					navigation.navigate('UpdateAvailable')
				} else if (maintenanceInProgress) {
					navigation.navigate('Maintanance')
				} else if (!updateNeeded && !maintenanceInProgress) {
					navigation.navigate('Welcome')
				}
			}
		})

		changeNavigationBarColor(colors.PRIMARY_BACKGROUND, true)
		await fetchData()

		SplashScreen.hide()
	}

	const getBiometricEnabled = async (
		email: string,
		updateNeeded: boolean | undefined,
		maintenanceInProgress: boolean
	) => {
		const enabled = await AsyncStorage.getItem('BiometricEnabled')
		const user = email
		const lastTimeOpen = await AsyncStorage.getItem('isOpenDate')
		const timeDifference = lastTimeOpen
			? Date.now() - JSON.parse(lastTimeOpen)
			: false
		const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
		let parsedUsers: string = JSON.parse(enabled)
		const userIndex = parsedUsers?.find(
			(u) => u?.user === user && u?.enabled === true
		)
		if (maintenanceInProgress) {
			navigation.navigate('Maintanance')
		}

		if (updateNeeded) {
			navigation.navigate('UpdateAvailable')
		}

		if (userIndex && timeDifference >= 30000 && !isLoggedIn) {
			navigation.navigate('Resume', {
				fromSplash: true,
				version: updateNeeded,
				maintenanceInProgress: maintenanceInProgress,
			})
		} else if (!updateNeeded && !maintenanceInProgress) {
			navigation.navigate('Main')
		}
	}

	const checkVersion = useCallback(async () => {
		try {
			const countryName = await getCountryName
			const latestVersion = await VersionCheck.getLatestVersion({
				forceUpdate: true,
				appID: APP_ID,
				packageName: packageName,
				country: countryName.toLowerCase() || 'ge',
			})

			const updateNeeded = await VersionCheck.needUpdate({
				currentVersion: currentVersion,
				latestVersion: latestVersion,
			})

			return updateNeeded?.isNeeded
		} catch (error) {
			console.log(error)
		}
	}, [])

	const statusDown = async () => {
		const version = DeviceInfo.getVersion()
		const { status } = await checkReadiness(version, Platform.OS)
		if (status === 'DOWN') {
			return true
		} else {
			return false
		}
	}

	const fetchData = async () => {
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
					})
					.catch((err) => console.log(err))
			})
			.catch((err) => console.log(err))
		dispatch(fetchCountries())
	}
}
