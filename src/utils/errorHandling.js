import * as SecureStore from 'expo-secure-store';

import store from '../redux/store';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';
import { setAppToast } from '../redux/modals/actions';

import SplashScreen from 'react-native-splash-screen';

export default async (err) => {
  const state = store.getState();
  if (err.response) {
    const {
      response: { status, data },
    } = err;
    const generalError = data;
    const params = data?.transParams && Object.keys(data?.transParams);
    const header = data.errorKey;
    const body = !data?.transParams
      ? data?.errorMessage
      : `${data?.errorMessage} params[${params?.join()}]`;

    if (status > 401) {
      if (!state.modals.isToast) {
        store.dispatch({ type: 'SAVE_GENERAL_ERROR', generalError });
      } else {
        store.dispatch(setAppToast({ header, body }));
      }
    }
    if (status === 401) {
      const token = await SecureStore.getItemAsync('refreshToken');
      if (token) {
        const response = await refreshToken(err.config);
        return response;
      }
    }

    if (status === 400 && data.error === 'invalid_grant') {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      navigationRef.navigate('Welcome');
      store.dispatch({ type: 'LOGOUT' });
    }
  }
};
