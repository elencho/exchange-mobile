import VersionCheck from 'react-native-version-check'
import { useFocusEffect } from '@react-navigation/native'
import jwt_decode from 'jwt-decode'
import { useCallback } from 'react'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch } from 'react-redux'
import { useTheme } from '@theme/index'
import { checkReadiness, fetchTranslations } from '@store/redux/auth/api'
import { resetAuthState, setOtpType } from '@store/redux/auth/slice'
import { fetchCountriesThunk } from '@store/redux/auth/thunks'
import { currentVersion } from '@app/constants/system'
import { System } from '@app/refactor/common/util'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import KVStore from '@app/refactor/store/kv'
import { TokenEmail, TokenOtpType } from '@app/refactor/types/auth/splash'
import { i18n } from '@app/refactor/setup/i18n'

export default function useInitApp({ navigation }: ScreenProp<'Splash'>) {
	const { theme } = useTheme()
	const dispatch = useDispatch()

	useFocusEffect(
		useCallback(() => {
			startApp()
		}, [])
	)

	const startApp = async () => {
		dispatch(resetAuthState())
		dispatch(fetchCountriesThunk())

		KVStore.del('webViewVisible')
		changeNavigationBarColor(theme.color.backgroundPrimary, true)

		await fetchLexicon()

		const accessToken = KVStore.get('accessToken')
		if (accessToken) {
			const otpType = jwt_decode<TokenOtpType>(accessToken)?.otpType
			dispatch(setOtpType(otpType))
		}

		// // ! For Testing
		// navigation.navigate('Login')
		// return

		if (hasUnlock()) {
			if (!accessToken) {
				navigation.navigate('Welcome')
			}

			// TODO: შემდეგ ვიძახებთ user info-ს ავტორიზაციის შესამოწმებლად  თუ წარუმატებელი აღმოჩნდა ვისვრით ავტორიზაციაზე
			// if userInfo 200 -> Welcome, else -> Resume
			// Next: as below
		} else {
			if (!accessToken) {
				navigation.navigate('Welcome')
			} else if (await updateNeeded()) {
				navigation.navigate('UpdateAvailable')
			} else if (await backIsDown()) {
				navigation.navigate('Maintenance')
			} else {
				navigation.navigate('Welcome') // Main
			}
		}
	}

	const hasUnlock = (): Boolean => {
		const bioEnabledEmails = KVStore.get('bioEnabledEmails')
		const accessToken = KVStore.get('accessToken')
		if (!bioEnabledEmails || !accessToken) return false

		const email = jwt_decode<TokenEmail>(accessToken)?.email
		return bioEnabledEmails.includes(email)
	}

	const updateNeeded = useCallback(async () => {
		try {
			const countryName = await System.getCountryName
			const latestVersion = await VersionCheck.getLatestVersion({
				forceUpdate: true,
				packageName: System.packageName,
				country: countryName.toLowerCase() || 'ge',
			})
			const versionInfo = await VersionCheck.needUpdate({
				currentVersion,
				latestVersion,
			})
			return versionInfo?.isNeeded
		} catch (error) {
			console.log(error)
			return false
		}
	}, [])

	const backIsDown = async () => {
		const { status } = await checkReadiness()
		return status === 'DOWN'
	}

	// const getBiometricEnabled = async (
	// 	email: string,
	// 	updateNeeded: boolean | undefined,
	// 	maintenanceInProgress: boolean
	// ) => {
	// 	const user = email
	// 	const enabled = await AsyncStorage.getItem('BiometricEnabled')
	// 	const lastTimeOpen = await AsyncStorage.getItem('isOpenDate')
	// 	const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
	// 	const timeDifference = lastTimeOpen
	// 		? Date.now() - JSON.parse(lastTimeOpen)
	// 		: 0

	// 	let parsedUsers = enabled ? JSON.parse(enabled) : ''
	// 	const userIndex = parsedUsers?.find(
	// 		(u) => u?.user === user && u?.enabled === true
	// 	)

	// 	if (userIndex && timeDifference >= 30000 && !isLoggedIn) {
	// 		// TODO: Should not navigate after this
	// 		navigation.navigate('Resume', {
	// 			fromSplash: true,
	// 			version: updateNeeded,
	// 			maintenanceInProgress: maintenanceInProgress,
	// 		})
	// 	}
	// }

	const fetchLexicon = async () => {
		await fetchTranslations()
			.then((res) => {
				const languages = Object.keys(res)
				for (let i = 0; i < languages.length; i++) {
					const translations = res[languages[i]].translation
					Object.keys(translations).forEach((key) => {
						if (translations[key] === null) translations[key] = ''
					})
					i18n.addResources(languages[i], translations)
				}
				i18n.switchLanguage(KVStore.get('language') || 'en')
			})
			.catch((err) => console.log(err))
	}
}
