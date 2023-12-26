import messaging from '@react-native-firebase/messaging'
import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import { IS_ANDROID, IS_IOS } from '../constants/system'
import { notificationSubscribe } from '@app/refactor/redux/profile/profileApi'
import notifee, { AuthorizationStatus } from '@notifee/react-native'

const useNotificationPermissions = async () => {
	const settings = await notifee.getNotificationSettings()

	const requestUserPermissionIOS = async () =>
		await messaging()
			.requestPermission()
			.then((value) => {
				if (value === AuthorizationStatus.AUTHORIZED) {
					checkFcm()
				}
			})

	const checkPermission = () => {
		if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
			if (IS_ANDROID) {
				requestPermissionsAndroid()
			} else {
				requestUserPermissionIOS()
			}
		}
	}

	const requestPermissionsAndroid = () =>
		PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
		).then((value) => {
			if (value === 'granted') {
				checkFcm()
			}
		})

	const checkFcm = async () => {
		const token = await messaging().getToken()
		if (token) {
			notificationSubscribe(token)
		}
	}

	useEffect(() => {
		checkPermission()
	}, [])

	return {}
}

export default useNotificationPermissions
