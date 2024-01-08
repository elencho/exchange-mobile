import { useModal } from '@components/modal/global_modal'
import messaging from '@react-native-firebase/messaging'
import { useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})
export const getNotification = () => {
	const { showModal } = useModal()
	useEffect(() => {
		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				if (remoteMessage) {
					const data = {
						description: remoteMessage?.notification?.body,
						banner: remoteMessage?.data?.banner,
						callToAction: remoteMessage?.data?.callToAction,
						redirectUrl: remoteMessage?.data?.redirectUrl,
						title: remoteMessage?.data?.title,
					}
					console.log('getInitialNotification', data)

					if (data.title && data.description) {
						showModal(data)
					}
				}
			})

		messaging().onNotificationOpenedApp((remoteMessage) => {
			console.log('from onNotificationOpenedApp', remoteMessage)
			const data = {
				description: remoteMessage?.notification?.body,
				banner: remoteMessage?.data?.banner,
				callToAction: remoteMessage?.data?.callToAction,
				redirectUrl: remoteMessage?.data?.redirectUrl,
				title: remoteMessage?.data?.title,
			}
			if (data.title && data.description) {
				showModal(data)
			}
		})
	}, [])
}

export const inAppNotificationListener = () => {
	const { showModal } = useModal()
	const responseListener = useRef()

	useEffect(() => {
		const unsubscribe = messaging().onMessage(onNotifeeMessageReceived)

		return () => {
			unsubscribe()
		}
	}, [])

	const onNotifeeMessageReceived = async (message) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: message.notification.title,
				body: message?.notification?.body,
				data: { data: data },
			},
			trigger: null,
		})
		const data = {
			description: message?.notification?.body,
			banner: message?.data?.banner,
			callToAction: message?.data?.callToAction,
			redirectUrl: message?.data?.redirectUrl,
			title: message?.data?.title,
		}
		showModal(data)
	}
}
