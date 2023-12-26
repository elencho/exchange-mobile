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
					// const redirectUrl = remoteMessage?.data?.redirectUrl
					// if (redirectUrl) Linking.openURL(remoteMessage?.data?.redirectUrl)
					if (remoteMessage?.data?.title && remoteMessage?.data?.description) {
						showModal(remoteMessage?.data)
					}
				}
			})
	}, [])
	return {}
}

export default useNotificationsAndroid
