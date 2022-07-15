import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import axios from 'axios';

import { VERIFICATION_TOKEN } from '../constants/api';
import { sumsubVerificationToken } from '../utils/userProfileUtils';

export default async () => {
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
      onEvent: (event) => {
        console.log('onEvent: ' + JSON.stringify(event));
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
