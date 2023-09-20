import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import React, { useCallback } from 'react'
import { BackHandler, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import VersionCheck from 'react-native-version-check'
import { useDispatch } from 'react-redux'
import colors from '../constants/colors'
import {
	getCountryName,
	APP_ID,
	packageName,
	currentVersion,
} from '../constants/system'
import { fetchCountries, setLanguage } from '../redux/profile/actions'
import { checkReadiness, fetchTranslations } from '../utils/appUtils'
import { addResources, switchLanguage } from '../utils/i18n'

const Splash = ({ navigation }) => {
	//TODO: REMOVE
	return <View />
}

export default Splash
