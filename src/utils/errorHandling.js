import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';

export default async (err) => {
  const controller = new AbortController();
  // Promise.reject(err).then((err) => err);

  if (err.response) {
    // console.log(err.response.data);
    // console.log(err.response.status);
    // console.log(err.response.headers);

    if (err.response.status === 500)
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    if (err.response.status === 401) {
      const response = await refreshToken(err.config);
      return response;
    }

    if (
      err.response.status === 400 &&
      err.response.data.error === 'invalid_grant'
    ) {
      controller.abort();
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      navigationRef.navigate('Welcome');
    }
  }
  // } else if (err.request) {
  //   console.log(err.request);
  // } else {
  //   console.log(err.message);
  // }
  // console.log(err.config);
};
