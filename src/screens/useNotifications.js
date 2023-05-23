import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as SecureStore from 'expo-secure-store';
import { showLocalNotification } from '../utils/NotificationService';

import { IS_IOS } from '../constants/system';

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

  const getFcmToken = async () => {
    const fcmtoken = await SecureStore.getItemAsync('fcmtoken');
    console.log('fcmtoken', fcmtoken);
    if (!fcmtoken) {
      try {
        const newFcmToken = await messaging().getToken();
        await SecureStore.setItemAsync('fcmtoken', newFcmToken);
        console.log('newFcmToken', newFcmToken);
        return newFcmToken;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('token found', fcmtoken);
      return fcmtoken;
    }
  };

  const notificationListener = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
    });

    // Quiet and Background State -> Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          );
        }
      })
      .catch((error) => console.log('failed', error));

    // Foreground State
    messaging().onMessage(async (remoteMessage) => {
      console.log(
        'foreground',
        remoteMessage?.notification?.[Platform.OS].imageUrl
      );
      const {
        body,
        title,
        [Platform.OS]: { imageUrl },
      } = remoteMessage?.notification;
      showLocalNotification(title, body, imageUrl);
    });
  };

  useEffect(() => {
    if (IS_IOS) {
      requestUserPermissionIOS();
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
    getFcmToken();
    notificationListener();
  }, []);

  return { notificationListener };
};

export default useNotifications;
