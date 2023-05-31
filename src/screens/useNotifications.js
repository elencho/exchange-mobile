import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Linking } from 'react-native';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { useEffect } from 'react';
import { IS_ANDROID, IS_IOS } from '../constants/system';

const useNotifications = () => {
  const requestUserPermissionIOS = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const requestPermissionsAndroid = () =>
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('TOKEN', fcmToken);
    } else {
      console.log('Could not fetch');
    }
  };

  useEffect(() => {
    IS_ANDROID ? requestPermissionsAndroid() : requestUserPermissionIOS();
    checkToken();
  }, []);

  useEffect(() => {
    const unsubscribe = () => {
      return notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            break;
          case EventType.PRESS:
            console.log('useNot', detail.notification);
            Linking.openURL(detail.notification?.data?.redirectUrl);
            break;
          default:
            break;
        }
      });
    };

    unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onNotifeeMessageReceived);

    return unsubscribe;
  }, []);

  return {};
};

export default useNotifications;

export const onNotifeeMessageReceived = async (message) => {
  console.log('notifee received on foreground', message);
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  notifee.displayNotification({
    id: message.messageId,
    title: message.notification.title,
    body: message.notification.body,
    data: message.data,
    remote: true,
    ios: {
      attachments: [{ url: message?.data?.fcm_options?.image }],
    },
    android: {
      channelId: channelId,
      attachments: [{ url: message?.data?.fcm_options?.image }],
      importance: AndroidImportance.HIGH,
      lightUpScreen: true,
      sound: 'default',
      timeoutAfter: 1000,
      pressAction: {
        id: 'default',
      },
    },
  });
};
