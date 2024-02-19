import { useModal } from '@components/modal/global_modal'
import messaging, {
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import KV from '@store/kv/regular'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})
export const getNotification = () => {
	const { showModal, setModalContent } = useModal()
	const bioAvailableAsync = KV.get('bioIsAvailableOnUser')

	useEffect(() => {
		messaging()
			.getInitialNotification()
			.then(async (remoteMessage) => {
				if (remoteMessage) {
					const data = {
						description: remoteMessage?.notification?.body,
						banner: remoteMessage?.data?.banner,
						callToAction: remoteMessage?.data?.callToAction,
						redirectUrl: remoteMessage?.data?.redirectUrl,
						title: remoteMessage?.data?.title,
					}

					if (data.title && data.description && !bioAvailableAsync) {
						// showModal(data)
						setModalContent(data)
					} else if (data.title && data.description && bioAvailableAsync) {
						setModalContent(data)
					}
				}
			})

		messaging().onNotificationOpenedApp(async (remoteMessage) => {
			const bioAvailableAsync = KV.get('bioIsAvailableOnUser')
			const data = {
				description: remoteMessage?.notification?.body,
				banner: remoteMessage?.data?.banner,
				callToAction: remoteMessage?.data?.callToAction,
				redirectUrl: remoteMessage?.data?.redirectUrl,
				title: remoteMessage?.data?.title,
			}
			if (data.title && data.description && bioAvailableAsync) {
				setModalContent(data)
				messaging().setBackgroundMessageHandler(async (remoteMessage) => {
					setModalContent(remoteMessage)
				})
			} else if (data.title && data.description && !bioAvailableAsync) {
				// showModal(data)
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

		if (granted) {
			if (data.title && data.description && !isBiometricScreenOpenedForModal) {
				showModal(data)
			} else if (
				data.title &&
				data.description &&
				isBiometricScreenOpenedForModal
			) {
				setModalVisible(true, data)
				setModalContent(data)
			}
		}
	}
}
