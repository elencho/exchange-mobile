import messaging from '@react-native-firebase/messaging'
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { useModal } from '@components/modal/global_modal'

const useNotificationsAndroid = () => {
	// Handle notification press when Android is killed
	const { showModal } = useModal()

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

					if (data.title && data.description) {
						showModal(data)
					}
				}
			})
	}, [])
	return {}
}

export default useNotificationsAndroid
