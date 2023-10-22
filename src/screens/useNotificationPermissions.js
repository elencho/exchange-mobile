import messaging from '@react-native-firebase/messaging'
import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import { IS_ANDROID, IS_IOS } from '../constants/system'

const useNotificationPermissions = () => {
	const requestUserPermissionIOS = async () =>
		await messaging().requestPermission()

	const requestPermissionsAndroid = () =>
		PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
		)

	useEffect(() => {
		IS_ANDROID ? requestPermissionsAndroid() : requestUserPermissionIOS()
	}, [])

	return {}
}

export default useNotificationPermissions
