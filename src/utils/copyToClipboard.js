import { ToastAndroid, Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = (text) => {
  if (text) {
    Clipboard.setStringAsync(text)
      .then(() => {
        if (Platform.OS === 'ios') {
          Toast.show('Copied');
        } else {
          ToastAndroid.show('Copied', ToastAndroid.SHORT);
        }
      })

      .catch((err) => console.log(err));
  }
};
