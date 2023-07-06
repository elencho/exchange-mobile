import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { useEffect } from 'react';

const useNotifications = () => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken', fcmToken);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const unsubscribe = () => {
      return notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            break;
          case EventType.PRESS:
            if (detail.notification?.data?.redirectUrl)
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
      attachments: [
        {
          url: message?.data?.fcm_options?.image ?? ' ',
        },
      ],
    },
    android: {
      channelId: channelId,
      attachments: [{ url: message?.data?.fcm_options?.image }],
      importance: AndroidImportance.HIGH,
      lightUpScreen: true,
      sound: 'default',
      pressAction: {
        id: 'default',
      },
    },
  });
};
