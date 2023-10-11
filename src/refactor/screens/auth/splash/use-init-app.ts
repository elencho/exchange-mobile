import { useFocusEffect } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import { useCallback } from 'react'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import VersionCheck from 'react-native-version-check'
import { useDispatch } from 'react-redux'
import { useTheme } from '@theme/index'
import { checkReadiness, fetchTranslations } from '@store/redux/auth/api'
import { resetAuthState } from '@store/redux/auth/slice'
import { currentVersion } from '@app/constants/system'
import { setLanguage } from '@app/redux/profile/actions'
import { System } from '@app/refactor/common/util'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import KVStorage from '@app/refactor/store/kv'
import { Token } from '@app/refactor/types/auth/splash'
import { addResources, switchLanguage } from '@app/utils/i18n'
import { fetchCountries } from '@app/utils/userProfileUtils'

export default function useInitApp({ navigation }: ScreenProp<'Splash'>) {
	const { theme } = useTheme()
	const dispatch = useDispatch()

	useFocusEffect(
		useCallback(() => {
			startApp()
		}, [])
	)

	const startApp = async () => {
		dispatch({ type: 'RESET_STATE' }) // TODO: Remove

		dispatch(resetAuthState())
		KVStorage.del('webViewVisible')
		changeNavigationBarColor(theme.color.backgroundPrimary, true)

		await fetchLexicon()
		const accessToken = KVStorage.get('accessToken')

		if (hasUnlock()) {
			// ვამოწმებთ გვაქვს თუ არა ტოკენი, თუ არ გვაქვს ვისვრით ავტორიზაციაზე
			if (!accessToken) {
				navigation.navigate('Welcome')
			}
			// TODO: შემდეგ ვიძახებთ user info-ს ავტორიზაციის შესამოწმებლად  თუ წარუმატებელი აღმოჩნდა ვისვრით ავტორიზაციაზე
			// if userInfo 200 -> Welcome, else -> Resume
			// Next: as below
		} else {
			// ვამოწმებთ გვაქვს თუ არა ტოკენი, თუ არ გვაქვს ვისვრით ავტორიზაციაზე
			if (!accessToken) {
				navigation.navigate('Welcome')
			}
			// ვამოწმებთ სთორიზე არის თუ არა ახალი ვერსია
			else if (await updateNeeded()) {
				navigation.navigate('UpdateAvailable')
			}
			// ვამოწმებთ ბექი ჩართულია თუ არა დამატებით გადავცემთ ვერსიას, აღნიშნულ ვერსიაზე უნდა მშაობდეს თუ არა აპლიკაცია
			// (აქ ბაგი გვაქვს, არვჩეკავთ ყველაქეისს, წარამტების გარდა ნებისმიერ ერორზე უნდა გადავიდეთ ფარდაზე)
			else if (await backIsDown()) {
				navigation.navigate('Maintenance')
			}
			// ვუხსნით აპლიკაციას
			else {
				navigation.navigate('Main')
			}
		}
	}

	const hasUnlock = (): Boolean => {
		const bioEnabledEmails = KVStorage.get('bioEnabledEmails')
		const accessToken = KVStorage.get('accessToken')
		if (!bioEnabledEmails || !accessToken) return false

		const email = jwt_decode<Token>(accessToken)?.email
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

		fetchCountries() //TODO: needed?
	}
}
