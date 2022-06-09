import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { refreshToken } from './userProfileUtils';
import { navigationRef } from '../navigation';

export default async (err) => {
  const {
    response: { data, status, headers },
    request,
    message,
    config,
  } = err;

  if (err.response) {
    console.log(data);
    console.log(status);
    console.log(headers);

    if (status === 403) store.dispatch(saveGeneralError(data.errorMessage));
    if (status === 401) {
      const refresh_token = await SecureStore.getItemAsync('refreshToken');
      const data = await refreshToken(refresh_token);

      if (data.access_token && data.refresh_token) {
        await SecureStore.setItemAsync('accessToken', data.access_token);
        await SecureStore.setItemAsync('refreshToken', data.refresh_token);

        return axios.request(config);
      } else {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        navigationRef.navigate('Welcome');
      }
    }
  } else if (request) {
    console.log(request);
  } else {
    console.log(message);
  }
  console.log(config);
};
