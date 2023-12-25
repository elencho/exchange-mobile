import messaging from '@react-native-firebase/messaging'
import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import { IS_ANDROID, IS_IOS } from '../constants/system'
import { notificationSubscribe } from '@app/refactor/redux/profile/profileApi'

const useNotificationPermissions = () => {
	const requestUserPermissionIOS = async () =>
		await messaging().requestPermission()

	const requestPermissionsAndroid = () =>
		PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
		)

	const checkFcm = async () => {
		const token = await messaging().getToken()
		if (token) {
			notificationSubscribe(token)
		} else {
			IS_ANDROID ? requestPermissionsAndroid() : requestUserPermissionIOS()
		}
	}

	useEffect(() => {
		checkFcm()
	}, [])

	return {}
}

export default useNotificationPermissions
