import VersionCheck from 'react-native-version-check'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch } from 'react-redux'
import { useTheme } from '@theme/index'
import {
	checkReadiness,
	fetchTranslations,
	getTokensOnInit,
} from '@store/redux/auth/api'
import { currentVersion } from '@app/constants/system'
import { System } from '@app/refactor/common/util'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { i18n } from '@app/refactor/setup/i18n'
import { setTokens } from '@store/redux/auth/slice'
import { fetchCountriesThunk } from '@store/redux/common/thunks'
import {
	biometricDiffElapsed,
	canDoBiometric,
} from '@app/refactor/utils/authUtils'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import KV from '@store/kv/regular'
import SecureKV from '@store/kv/secure'
import { setBiometricToggleEnabled } from '@store/redux/common/slice'

const useInitApp = ({ navigation }: ScreenProp<'Splash'>) => {
	const { theme } = useTheme()
	const dispatch = useDispatch()

	useFocusEffect(
		useCallback(() => {
			startApp()
		}, [])
	)

	const startApp = async () => {
		if (KV.get('everOpened') !== true) {
			SecureKV.del('bioEnabledEmails')
			SecureKV.del('refreshToken')
			KV.set('everOpened', true)
		}

		KV.del('webViewVisible')
		changeNavigationBarColor(theme.color.backgroundPrimary, true)

		dispatch(fetchCountriesThunk())
		await fetchLexicon()

		const oldRefresh = await SecureKV.get('refreshToken')
		const tokens = await getTokensOnInit(oldRefresh)

		const accessToken = tokens?.access_token
		const refreshToken = tokens?.refresh_token
		if (refreshToken && accessToken) {
			dispatch(setTokens({ refreshToken, accessToken }))
			dispatch(fetchUserInfoThunk())
		}

		// ! For Testing
		// navigation.navigate('Login2Fa')
		// return

		const update = await updateNeeded()
		const maintenance = await backIsDown()
		const showBio = await canDoBiometric(accessToken).then((canDo) =>
			dispatch(setBiometricToggleEnabled(canDo))
		)
		if (showBio.payload && biometricDiffElapsed()) {
			navigation.navigate('Resume', {
				from: 'Splash',
				maintenanceInProgress: maintenance,
				version: update,
			})
		} else {
			if (update) {
				navigation.navigate('UpdateAvailable')
			} else if (maintenance) {
				navigation.navigate('Maintenance')
			} else if (accessToken) {
				navigation.navigate('Main')
			} else {
				navigation.navigate('Welcome')
			}
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
		return status !== 'UP'
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
				i18n.switchLanguage(KV.get('language') || 'en')
			})
			.catch((err) => console.log(err))
	}
}

export default useInitApp
