import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import { useModal } from '@components/modal/global_modal'
import notifee, { EventType, AndroidImportance } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import { setNotificationData } from '@store/redux/common/slice'
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

const useNotifications = () => {
	const { showModal } = useModal()
	const dispatch = useDispatch()

	const { isBiometricEnabled, isBiometricScreenOpened } = useSelector(
		(state) => state.common
	)
	const bioVisible = isBiometricEnabled && biometricDiffElapsed()

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
						const data = {
							description: detail?.notification?.body,
							banner: detail?.data?.banner,
							callToAction: detail?.data?.callToAction,
							redirectUrl: detail?.data?.redirectUrl,
							title: detail?.data?.title,
						}
						console.log(data, 'from Froeground')
						// dispatch(setNotificationData(data))
						if (detail?.data?.title && data.description && !bioVisible) {
							showModal(data, isBiometricScreenOpened)
						}

						break
					default:
						break
				}
			})
		}

		return () => unsubscribe()
	}, [])

	const onNotifeeMessageReceived = async (message) => {
		console.log('notifee received on foreground', message)
		const data = {
			description: message?.notification?.body,
			banner: message?.data?.banner,
			callToAction: message?.data?.callToAction,
			redirectUrl: message?.data?.redirectUrl,
			title: message?.data?.title,
		}
		// dispatch(setNotificationData(data))
		// if (message?.data?.title && data.description && !bioVisible) {
		// 	showModal(data, isBiometricScreenOpened)
		// }
		//else if (
		// 	message?.data?.title &&
		// 	data.description &&
		// 	(bioVisible || isBiometricScreenOpened)
		// ) {
		// 	dispatch(setNotificationData(data))
		// }
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

	useEffect(() => {
		const unsubscribe = messaging().onMessage(onNotifeeMessageReceived)

		return unsubscribe
	}, [])

	useEffect(() => {
		notifee.getInitialNotification().then((message) => {
			// const redirectUrl = res?.notification?.data?.redirectUrl
			// if (redirectUrl) Linking.openURL(redirectUrl)
			console.log('getInitialNotification', message)

			const data = {
				description: message?.notification?.body,
				banner: message?.data?.banner,
				callToAction: message?.data?.callToAction,
				redirectUrl: message?.data?.redirectUrl,
				title: message?.data?.title,
			}
			if (data.title && data.description) {
				showModal(data)
			}
		})
	}, [])

	// useEffect(() => {
	// 	const unsubscribe = notifee.onBackgroundEvent(async ({ type, detail }) => {
	// 		// const redirectUrl = detail?.notification?.data?.redirectUrl
	// 		// if (redirectUrl) Linking.openURL(redirectUrl)
	// 		console.log('onBackgroundEvent', detail)
	// 		const data = {
	// 			description: detail?.notification?.body,
	// 			banner: detail?.data?.banner,
	// 			callToAction: detail?.data?.callToAction,
	// 			redirectUrl: detail?.data?.redirectUrl,
	// 			title: detail?.data?.title,
	// 		}
	// 		if (data.title && data.description) {
	// 			showModal(data)
	// 		}
	// 	})
	// 	return () => unsubscribe()
	// }, [])

	return {}
}

export default useNotifications

// export const onNotifeeMessageReceived = async (message) => {
// 	console.log('notifee received on foreground', message)
// 	const channelId = await notifee.createChannel({
// 		id: 'default',
// 		name: 'Default Channel',
// 	})
// 	notifee.displayNotification({
// 		id: message.messageId,
// 		title: message.notification.title,
// 		body: message.notification.body,
// 		data: message.data,
// 		remote: true,
// 		ios: {
// 			attachments: [
// 				{
// 					url: message?.data?.fcm_options?.image ?? ' ',
// 				},
// 			],
// 		},
// 		android: {
// 			channelId: channelId,
// 			attachments: [{ url: message?.notification?.android?.imageUrl ?? ' ' }],
// 			importance: AndroidImportance.HIGH,
// 			lightUpScreen: true,
// 			sound: 'default',
// 			smallIcon: 'ic_small_icon',
// 			largeIcon: message?.notification?.android?.imageUrl ?? ' ',
// 			color: '#1F1F35',
// 			pressAction: {
// 				id: 'default',
// 			},
// 		},
// 	})
// }
