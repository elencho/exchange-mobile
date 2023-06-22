import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';
import { onNotifeeMessageReceived } from './src/screens/useNotifications';
import notifee, { EventType } from '@notifee/react-native';

import App from './App';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   onNotifeeMessageReceived(remoteMessage);
//   switch (type) {
//     case EventType.DISMISSED:
//       break;
//     case EventType.PRESS:
//       console.log('zdes', detail.notification);
//       break;
//     default:
//       break;
//   }
// });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
