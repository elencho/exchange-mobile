import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import { showLocalNotification } from './src/utils/NotificationService';

import App from './App';

PushNotification.createChannel(
  {
    channelId: 'cryptal-channel',
    channelName: 'My channel',
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(
    'Message handled in the background!',
    remoteMessage?.notification
  );
  const {
    body,
    title,
    [Platform.OS]: { imageUrl },
  } = remoteMessage?.notification;
  showLocalNotification(title, body, imageUrl);
});

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN generated index.js:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION opened:', notification);
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
}),
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App);
