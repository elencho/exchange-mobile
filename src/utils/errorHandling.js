import AsyncStorage from '@react-native-async-storage/async-storage';

import store from '../redux/store';
import { navigationRef } from '../navigation';
import { refreshToken } from './userProfileUtils';
import { setAppToast } from '../redux/modals/actions';

export default async (err) => {
  const state = store.getState();

  if (err.response) {
    const {
      response: { status, data },
    } = err;
    const generalError = data;
    const header = data.errorKey;
    const body = data.errorMessage;

    if (status > 401) {
      if (!state.modals.isToast) {
        store.dispatch({ type: 'SAVE_GENERAL_ERROR', generalError });
      } else {
        store.dispatch(setAppToast({ header, body }));
      }
    }
    if (status === 401) {
      const response = await refreshToken(err.config);
      return response;
    }

    if (status === 400 && data.error === 'invalid_grant') {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      navigationRef.navigate('Welcome');
      store.dispatch({ type: 'LOGOUT' });
    }
  }
};
