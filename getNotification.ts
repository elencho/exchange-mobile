import { useModal } from '@components/modal/global_modal'
import messaging, {
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import KV from '@store/kv/regular'
import { Alert } from 'react-native'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})
export const getNotification = () => {
	const { showModal, setModalContent } = useModal()
	const bioAvailable = KV.get('bioIsAvailableOnUser')

	useEffect(() => {
		Alert.alert(`bioAvailable = ${bioAvailable}`)
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

					if (data.title && data.description && !bioAvailable) {
						showModal(data)
					} else if (data.title && data.description && bioAvailable) {
						setModalContent(data)
					}
				}
			})

		messaging().onNotificationOpenedApp((remoteMessage) => {
			const data = {
				description: remoteMessage?.notification?.body,
				banner: remoteMessage?.data?.banner,
				callToAction: remoteMessage?.data?.callToAction,
				redirectUrl: remoteMessage?.data?.redirectUrl,
				title: remoteMessage?.data?.title,
			}
			if (data.title && data.description && !bioAvailable) {
				Alert.alert('from onNotificationOpenedApp without bio')
				showModal(data)
			} else if (data.title && data.description && bioAvailable) {
				Alert.alert('from onNotificationOpenedApp with bio')

				setModalContent(data)
			}
		})
	}, [])
}

export const inAppNotificationListener = () => {
	const {
		showModal,
		setModalContent,
		isBiometricScreenOpenedForModal,
		setModalVisible,
	} = useModal()

	useEffect(() => {
		const unsubscribe = messaging().onMessage(onForegroundMessageReceived)

		return () => {
			unsubscribe()
		}
	}, [])

	const onForegroundMessageReceived = async (
		message: FirebaseMessagingTypes.RemoteMessage
	) => {
		const data = {
			description: message?.notification?.body,
			banner: message?.data?.banner,
			callToAction: message?.data?.callToAction,
			redirectUrl: message?.data?.redirectUrl,
			title: message?.data?.title,
		}
		const { granted } = await Notifications.getPermissionsAsync()
		console.log('status', granted)
		if (granted) {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: message?.notification?.title,
					body: message?.notification?.body,
					data: { data: data },
				},
				trigger: null,
			}).then((id) => {
				if (
					data.title &&
					data.description &&
					!isBiometricScreenOpenedForModal
				) {
					showModal(data)
				} else if (
					data.title &&
					data.description &&
					isBiometricScreenOpenedForModal
				) {
					setModalVisible(true)
					setModalContent(data)
				}
				Notifications.dismissNotificationAsync(id)
			})
		}
	}
}
