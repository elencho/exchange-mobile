import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';

export default async (err) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);

    if (err.response.status === 500)
      store.dispatch(saveGeneralError(err.response.data.errorMessage));
    if (err.response.status === 401) await refreshToken(err.config);

    if (
      err.response.status === 400 &&
      err.response.data.error === 'invalid_grant'
    ) {
      axios.Cancel('Log out');
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      navigationRef.navigate('Welcome');
    }
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log(err.message);
  }
  console.log(err.config);
};
