import { Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

//Platform
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

//Version info

export const packageName = VersionCheck.getPackageName();
export const APP_ID = '6443718356';
export const getCountryName = VersionCheck.getCountry();
export const currentVersion = VersionCheck.getCurrentVersion();
