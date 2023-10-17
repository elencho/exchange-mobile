import { Platform } from 'react-native'
import VersionCheck from 'react-native-version-check'

export const System = {
	isIos: Platform.OS === 'ios',
	isAndroid: Platform.OS === 'android',
	appId: '6443718356',
	packageName: VersionCheck.getPackageName(),
	currentVersion: VersionCheck.getCurrentVersion(),
	getCountryName: VersionCheck.getCountry(),
} as const
