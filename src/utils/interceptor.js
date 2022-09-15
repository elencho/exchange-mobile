import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import store from '../redux/store';
import { saveGeneralError } from '../redux/profile/actions';
import handleError from './errorHandling';

axios.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  store.dispatch({
    type: 'SET_IS_TOAST',
    isToast: config.headers.toast === false ? false : true,
  });

  delete config.headers.toast;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    const state = store.getState();
    state.profile.generalError && store.dispatch(saveGeneralError(null));

    response?.data?.errors?.length &&
      store.dispatch(saveGeneralError(response?.data?.errors[0]));

    return response;
  },
  async (err) => {
    const response = await handleError(err);
    return response;
  }
);
