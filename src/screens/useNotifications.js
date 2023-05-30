import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Linking } from 'react-native';
import { useEffect } from 'react';
import { IS_ANDROID } from '../constants/system';

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

  const handleForegroundMessage = messaging().onMessage(
    async (remoteMessage) => {
      console.log('remoteee', remoteMessage);
    }
  );

  useEffect(() => {
    IS_ANDROID ? requestPermissionsAndroid() : requestUserPermissionIOS();
    checkToken();
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      const redirectUrl = remoteMessage.data?.redirectUrl;
      if (redirectUrl) Linking.openURL(redirectUrl);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const redirectUrl = remoteMessage.data?.redirectUrl;
          if (redirectUrl) Linking.openURL(redirectUrl);
        }
      });

    handleForegroundMessage();
  }, []);

  return {};
};

export default useNotifications;
