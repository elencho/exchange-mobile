import VersionCheck from 'react-native-version-check'
import { useFocusEffect } from '@react-navigation/native'
import jwt_decode from 'jwt-decode'
import { useCallback } from 'react'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@theme/index'
import {
	checkReadiness,
	fetchTranslations,
	getTokensOnInit,
} from '@store/redux/auth/api'
import { currentVersion } from '@app/constants/system'
import { System } from '@app/refactor/common/util'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import KVStore from '@app/refactor/store/kv'
import { i18n } from '@app/refactor/setup/i18n'
import { TokenParams } from '@app/refactor/types/auth/splash'
import { setTokens } from '@store/redux/auth/slice'
import { fetchCountriesThunk } from '@store/redux/common/thunks'
import { BIOMETRIC_DIFF_MILLIS } from '@app/refactor/common/constants'

export default function useInitApp({ navigation }: ScreenProp<'Splash'>) {
	const { theme } = useTheme()
	const dispatch = useDispatch()

	useFocusEffect(
		useCallback(() => {
			startApp()
		}, [])
	)

	const startApp = async () => {
		KVStore.del('webViewVisible')
		changeNavigationBarColor(theme.color.backgroundPrimary, true)
		dispatch(fetchCountriesThunk())
		await fetchLexicon()

		const tokens = await getTokensOnInit()
		const accessToken = tokens?.access_token
		const refreshToken = tokens?.refresh_token
		if (refreshToken && accessToken) {
			dispatch(setTokens({ refreshToken, accessToken }))
		}

		// // ! For Testing
		// navigation.navigate('EmailVerification')
		// return

		if (await updateNeeded()) {
			navigation.navigate('UpdateAvailable')
			return
		} else if (await backIsDown()) {
			navigation.navigate('Maintenance')
			return
		}

		if (hasBiometricEnabled(accessToken)) {
			handleBiometric()
		} else {
			if (!accessToken) {
				navigation.navigate('Welcome')
			} else {
				navigation.navigate('Welcome') // Main
			}
		}
	}

	const hasBiometricEnabled = (accessToken: string | undefined): Boolean => {
		const bioEnabledEmails = KVStore.get('bioEnabledEmails')
		if (!bioEnabledEmails || !accessToken) return false

		const email = jwt_decode<TokenParams>(accessToken)?.email
		return bioEnabledEmails.includes(email)
	}

	const handleBiometric = () => {
		const isLoggedIn = KVStore.get('isLoggedIn')
		const lateTimeOpenMillis = KVStore.get('lastOpenDateMillis')

		const biometricDiffElapsed = lateTimeOpenMillis
			? Date.now() - lateTimeOpenMillis >= BIOMETRIC_DIFF_MILLIS
			: false

		// TODO: && or ||
		if (biometricDiffElapsed && !isLoggedIn) {
			navigation.navigate('Resume', { fromSplash: true })
		} else {
			navigation.navigate('Main')
		}
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
