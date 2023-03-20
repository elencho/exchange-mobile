import { ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';
import * as Clipboard from 'expo-clipboard';
import { IS_IOS } from '../constants/system';

export const copyToClipboard = (text) => {
  if (text) {
    Clipboard.setStringAsync(text)
      .then(() => {
        if (IS_IOS) {
          Toast.show('Copied');
        } else {
          ToastAndroid.show('Copied', ToastAndroid.SHORT);
        }
      })

      .catch((err) => console.log(err));
  }
};
