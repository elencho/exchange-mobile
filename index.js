import messaging from '@react-native-firebase/messaging'
import { registerRootComponent } from 'expo'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import App from './App'
import SplashScreen from 'react-native-splash-screen'
// import { useNotificationHandler } from 'notifiactionHandler'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log('Message handled in the background!', remoteMessage)
})

// messaging().onNotificationOpenedApp((remoteMessage) => {
// 	const redirectUrl = remoteMessage?.data?.redirectUrl
// 	if (remoteMessage?.data?.title && remoteMessage?.data?.description) {
// 		useNotificationHandler(remoteMessage?.data)
// 	}
// })

// messaging()
// 	.getInitialNotification()
// 	.then(async (remoteMessage) => {
// 		if (remoteMessage?.data?.title && remoteMessage?.data?.description) {
// 			useNotificationHandler(remoteMessage?.data)
// 		}
// 	})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
SplashScreen.hide()
