import { RootState } from '@app/refactor/redux/rootReducer'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import { useModal } from '@components/modal/global_modal'
import messaging from '@react-native-firebase/messaging'
import KV from '@store/kv/regular'
import { isEnrolledAsync } from 'expo-local-authentication'
import { AppState } from 'react-native'
import { useSelector } from 'react-redux'

export const useNotificationHandler = () => {
	const { showModal } = useModal()

	// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	// 	console.log('Message handled in the background!', remoteMessage)
	// })
	const { isBiometricScreenOpened } = useSelector(
		(state: RootState) => state.common
	)
	const { accessToken } = useSelector((state: RootState) => state.auth)

	const bioVisible =
		AppState.currentState === 'active' &&
		accessToken !== undefined &&
		KV.get('webViewVisible') !== true &&
		biometricDiffElapsed() &&
		// (await isEnrolledAsync())

	messaging().onNotificationOpenedApp((remoteMessage) => {
		const redirectUrl = remoteMessage?.data?.redirectUrl
		if (remoteMessage?.data?.title && remoteMessage?.data?.description) {
			showModal(remoteMessage?.data, isBiometricScreenOpened)
		}
	})

	messaging()
		.getInitialNotification()
		.then(async (remoteMessage) => {
			if (remoteMessage?.data?.title && remoteMessage?.data?.description) {
				showModal(remoteMessage?.data, isBiometricScreenOpened)
			}
		})
}
