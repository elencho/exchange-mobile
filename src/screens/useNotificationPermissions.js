import messaging from '@react-native-firebase/messaging'
import React, { useEffect } from 'react'
import { PermissionsAndroid } from 'react-native'
import { IS_ANDROID, IS_IOS } from '../constants/system'
import { notificationSubscribe } from '@app/refactor/redux/profile/profileApi'
// import notifee, { AuthorizationStatus } from '@notifee/react-native'
import {
	PERMISSIONS,
	RESULTS,
	requestNotifications,
	request,
} from 'react-native-permissions'

export const useNotificationPermissions = () => {
	const checkPermission = async () => {
		if (IS_ANDROID) {
			request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((status) => {
				if (status === RESULTS.GRANTED) {
					checkFcm()
				}
			})
		} else {
			await messaging()
				.requestPermission()
				.then((status) => {
					console.log('status', status)
					if (status > 0) {
						checkFcm()
					}
				})
		}
	}

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
