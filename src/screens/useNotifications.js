import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
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

  useEffect(() => {
    IS_ANDROID ? requestPermissionsAndroid() : requestUserPermissionIOS();
    checkToken();
  }, []);
  return {};
};

export default useNotifications;
