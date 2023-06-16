import AsyncStorage from '@react-native-async-storage/async-storage';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import axios from 'axios';

import { VERIFICATION_TOKEN } from '../constants/api';
import { sumsubVerificationToken } from '../utils/userProfileUtils';

export default async () => {
  await AsyncStorage.setItem('webViewVisible', 'true');

  const token = await sumsubVerificationToken();

  const snsMobileSDK = SNSMobileSDK.init(token, () => {
    return axios({
      url: VERIFICATION_TOKEN,
      method: 'GET',
    }).then((res) => {
      return res.data;
    });
  })
    .withBaseUrl('https://api.sumsub.com')
    .withHandlers({
      // Optional callbacks you can use to get notified of the corresponding events
      onStatusChanged: (event) => {
        console.log(
          'onStatusChanged: [' +
            event.prevStatus +
            '] => [' +
            event.newStatus +
            ']'
        );
      },
      onLog: (event) => {
        console.log('onLog: [Idensic] ' + event.message);
      },
      onEvent: async (event) => {
        if (event?.payload?.eventName === 'msdk:dismiss') {
          await AsyncStorage.removeItem('webViewVisible');
        }
      },
    })
    .withDebug(true)
    .withLocale('en') // Optional, for cases when you need to override system locale
    .build();

  snsMobileSDK
    .launch()
    .then((result) => {
      console.log('SumSub SDK State: ' + JSON.stringify(result));
    })
    .catch((err) => {
      console.log('SumSub SDK Error: ' + JSON.stringify(err));
    });
};
