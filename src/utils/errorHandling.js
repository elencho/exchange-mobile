import * as SecureStore from 'expo-secure-store';
import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';

export default async (err) => {
  let previousResponse;
  console.log(previousResponse);
  if (err.response) {
    // console.log(err.response.data);
    // console.log(err.response.status);
    // console.log(err.response.headers);
    if (err.response.data.errorMessage) {
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    }

    if (err.response.status === 500)
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    if (err.response.status === 401) {
      const response = await refreshToken(err.config);
      previousResponse = response;
      return response;
    }

    if (
      err.response.status === 400 &&
      err.response.data.error === 'invalid_grant'
    ) {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      navigationRef.navigate('Welcome');
      return previousResponse;
    }
  }
  // } else if (err.request) {
  //   console.log(err.request);
  // } else {
  //   console.log(err.message);
  // }
  // console.log(err.config);
};
