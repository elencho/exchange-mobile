import messaging from '@react-native-firebase/messaging'
import { registerRootComponent } from 'expo'
import { Linking } from 'react-native'
import 'react-native-gesture-handler'
import 'react-native-reanimated'

import App from './App'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log('Message handled in the background!', remoteMessage)
})

messaging().onNotificationOpenedApp((remoteMessage) => {
	const redirectUrl = remoteMessage?.data?.redirectUrl
	if (redirectUrl) Linking.openURL(redirectUrl)
})

messaging()
	.getInitialNotification()
	.then(async (remoteMessage) => {
		if (remoteMessage) {
			const redirectUrl = remoteMessage?.data?.redirectUrl
			if (redirectUrl) Linking.openURL(redirectUrl)
		}
	})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
