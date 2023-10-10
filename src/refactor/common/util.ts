import { Platform } from 'react-native'
import VersionCheck from 'react-native-version-check'

export const System = {
	isIos: Platform.OS === 'ios',
	isAndroid: Platform.OS === 'android',
	appId: '6443718356',
	packageName: VersionCheck.getPackageName(),
	getCountryName: VersionCheck.getCountry(),
	currentVersion: VersionCheck.getCurrentVersion(),
} as const
