import { useModal } from '@components/modal/global_modal'
import notifee, { EventType, AndroidImportance } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import { useEffect } from 'react'
import { Linking } from 'react-native'

const useNotifications = () => {
	const { showModal } = useModal()
	const checkToken = async () => {
		const fcmToken = await messaging().getToken()
		if (fcmToken) {
			console.log('fcmToken', fcmToken)
		}
	}

	useEffect(() => {
		checkToken()
	}, [])

	useEffect(() => {
		const unsubscribe = () => {
			return notifee.onForegroundEvent(({ type, detail }) => {
				switch (type) {
					case EventType.DISMISSED:
						break
					case EventType.PRESS:
						if (
							detail.notification?.data?.title &&
							detail.notification?.data?.description
						) {
							showModal(detail.notification?.data)
						}
						break
					default:
						break
				}
			})
		}

		unsubscribe()
	}, [])

	useEffect(() => {
		const unsubscribe = messaging().onMessage(onNotifeeMessageReceived)

		return unsubscribe
	}, [])

	useEffect(() => {
		notifee.getInitialNotification().then((res) => {
			// const redirectUrl = res?.notification?.data?.redirectUrl
			// if (redirectUrl) Linking.openURL(redirectUrl)
			if (
				res.notification?.data?.title &&
				res.notification?.data?.description
			) {
				showModal(res.notification?.data)
			}
		})

		notifee.onBackgroundEvent(async ({ type, detail }) => {
			// const redirectUrl = detail?.notification?.data?.redirectUrl
			// if (redirectUrl) Linking.openURL(redirectUrl)
			if (
				detail.notification?.data?.title &&
				detail.notification?.data?.description
			) {
				showModal(detail.notification?.data)
			}
		})
	}, [])

	return {}
}

export default useNotifications

export const onNotifeeMessageReceived = async (message) => {
	console.log('notifee received on foreground', message)
	const channelId = await notifee.createChannel({
		id: 'default',
		name: 'Default Channel',
	})

	notifee.displayNotification({
		id: message.messageId,
		title: message.notification.title,
		body: message.notification.body,
		data: message.data,
		remote: true,
		ios: {
			attachments: [
				{
					url: message?.data?.fcm_options?.image ?? ' ',
				},
			],
		},
		android: {
			channelId: channelId,
			attachments: [{ url: message?.notification?.android?.imageUrl ?? ' ' }],
			importance: AndroidImportance.HIGH,
			lightUpScreen: true,
			sound: 'default',
			smallIcon: 'ic_small_icon',
			largeIcon: message?.notification?.android?.imageUrl ?? ' ',
			color: '#1F1F35',
			pressAction: {
				id: 'default',
			},
		},
	})
}
