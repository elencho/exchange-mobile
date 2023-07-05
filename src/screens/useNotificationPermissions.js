import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { IS_ANDROID, IS_IOS } from '../constants/system';

const useNotificationPermissions = () => {
  const requestUserPermissionIOS = async () =>
    await messaging().requestPermission();

  const requestPermissionsAndroid = () =>
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken', fcmToken);
    }
  };

  useEffect(() => {
    IS_ANDROID ? requestPermissionsAndroid() : requestUserPermissionIOS();
    checkToken();
  }, []);

  return {};
};

export default useNotificationPermissions;
