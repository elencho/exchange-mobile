import { useModal } from '@components/modal/global_modal'
import messaging, {
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import KV from '@store/kv/regular'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})
export const getNotification = () => {
	const { showModal, setModalContent } = useModal()
	const { biometricSuccess } = useSelector((state) => state.common)
	// const bioAvailable = KV.get('bioIsAvailableOnUser')

	useEffect(() => {
		messaging()
			.getInitialNotification()
			.then(async (remoteMessage) => {
				const bioAvailableAsync = await AsyncStorage.getItem(
					'bioIsAvailableOnUser'
				)
				if (remoteMessage) {
					const data = {
						description: remoteMessage?.notification?.body,
						banner: remoteMessage?.data?.banner,
						callToAction: remoteMessage?.data?.callToAction,
						redirectUrl: remoteMessage?.data?.redirectUrl,
						title: remoteMessage?.data?.title,
					}

					if (data.title && data.description && !bioAvailableAsync) {
						showModal(data)
					} else if (data.title && data.description && bioAvailableAsync) {
						setModalContent(data)
					}
				}
			})

		messaging().onNotificationOpenedApp(async (remoteMessage) => {
			// const bioAvailableAsync = await AsyncStorage.getItem(
			// 	'bioIsAvailableOnUser'
			// )

			const data = {
				description: remoteMessage?.notification?.body,
				banner: remoteMessage?.data?.banner,
				callToAction: remoteMessage?.data?.callToAction,
				redirectUrl: remoteMessage?.data?.redirectUrl,
				title: remoteMessage?.data?.title,
			}
			if (data.title && data.description && !biometricSuccess) {
				setModalContent(data)
				Alert.alert('biometricSuccess is false')
			} else if (data.title && data.description && biometricSuccess) {
				Alert.alert('biometricSuccess is true')
				showModal(data)
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
			})
		}
	}
}
