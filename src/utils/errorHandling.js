import * as SecureStore from 'expo-secure-store';

import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';
import { setAppToast } from '../redux/modals/actions';

export default async (err) => {
  const state = store.getState();

  if (err.response) {
    // console.log(err.response.data);
    // console.log(err.response.status);
    // console.log(err.response.headers);

    if (err.response.status > 401) {
      if (!state.modals.isToast) {
        store.dispatch(saveGeneralError(err.response.data));
      } else {
        store.dispatch(
          setAppToast({
            header: err.response.data.errorKey,
            body: err.response.data.errorMessage,
          })
        );
      }
    }
    if (err.response.status === 401) {
      const response = await refreshToken(err.config);
      return response;
    }

    if (
      err.response.status === 400 &&
      err.response.data.error === 'invalid_grant'
    ) {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      navigationRef.navigate('Welcome');
      store.dispatch({ type: 'LOGOUT' });
    }
  }
  // } else if (err.request) {
  //   console.log(err.request);
  // } else {
  //   console.log(err.message);
  // }
  // console.log(err.config);
};
