import { useModal } from '@components/modal/global_modal'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import messaging from '@react-native-firebase/messaging'
import { useEffect, useState } from 'react'

export const getNotification = () => {
	const { showModal } = useModal()
	console.log('from this page')
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
	const [foregroundNotification, setForegroundNotification] = useState(null)
	useEffect(() => {
		const type = 'notification'

		const unsubscribe = messaging().onMessage(onNotifeeMessageReceived)
		// PushNotificationIOS.addEventListener(type)
		return () => {
			unsubscribe()
			// PushNotificationIOS.removeEventListener(type)
		}
	}, [])

	const setNotification = (message) => {
		setForegroundNotification(message)
	}
	const onNotifeeMessageReceived = async (message) => {
		// PushNotificationIOS.({
		// 	title: message?.title,
		// 	body: message?.body,
		// 	id: '1',
		// })
		console.log('notifee received on foreground', message)
		const isClicked = message.getData().userInteraction === 1
		const data = {
			description: message?.notification?.body,
			banner: message?.data?.banner,
			callToAction: message?.data?.callToAction,
			redirectUrl: message?.data?.redirectUrl,
			title: message?.data?.title,
		}
		if (isClicked) {
			showModal(data)
		} else {
			console.log('dismissed')
		}
	}
}
