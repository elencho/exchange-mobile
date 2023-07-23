import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';

const useNotificationsAndroid = () => {
  // Handle notification press when Android is killed

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          const redirectUrl = remoteMessage?.data?.redirectUrl;
          if (redirectUrl) Linking.openURL(remoteMessage?.data?.redirectUrl);
        }
      });
  }, []);
  return {};
};

export default useNotificationsAndroid;
