import { RootState } from '@app/refactor/redux/rootReducer'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import { useModal } from '@components/modal/global_modal'
import messaging from '@react-native-firebase/messaging'
import KV from '@store/kv/regular'
import { setNotificationData } from '@store/redux/common/slice'
import { isEnrolledAsync } from 'expo-local-authentication'
import { AppState } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export const useNotificationHandler = () => {
	const { showModal } = useModal()
	const dispatch = useDispatch()

	const { isBiometricScreenOpened, isBiometricEnabled } = useSelector(
		(state: RootState) => state.common
	)

	// const bioVisible = isBiometricEnabled && biometricDiffElapsed()

	// messaging()
	// 	.getInitialNotification()
	// 	.then(async (remoteMessage) => {
	// 		if (remoteMessage) {
	// 			const data = {
	// 				description: remoteMessage?.notification?.body,
	// 				banner: remoteMessage?.data?.banner,
	// 				callToAction: remoteMessage?.data?.callToAction,
	// 				redirectUrl: remoteMessage?.data?.redirectUrl,
	// 				title: remoteMessage?.data?.title,
	// 			}
	// 			dispatch(setNotificationData(data))

	// 			if (data.title && data.description) {
	// 				showModal(data)
	// 			}
	// 		}
	// 	})

	// messaging().onNotificationOpenedApp((remoteMessage) => {
	// 	console.log('from onNotificationOpenedApp', remoteMessage)
	// 	const data = {
	// 		description: remoteMessage?.notification?.body,
	// 		banner: remoteMessage?.data?.banner,
	// 		callToAction: remoteMessage?.data?.callToAction,
	// 		redirectUrl: remoteMessage?.data?.redirectUrl,
	// 		title: remoteMessage?.data?.title,
	// 	}
	// 	// dispatch(setNotificationData(data))
	// 	if (data.title && data.description) {
	// 		showModal(data)
	// 	}
	// 	// if (remoteMessage?.data?.title && data.description && !bioVisible) {
	// 	// 	console.log('from bio onNotificationOpenedApp', data)

	// 	// 	 showModal(data)
	// 	// } else if (remoteMessage?.data?.title && data.description && bioVisible) {
	// 	// 	console.log('from here onNotificationOpenedApp', data)
	// 	// 	dispatch(setNotificationData(data))
	// 	// }
	// })
}
