import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import store from '../redux/store';
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
    state.errors.generalError &&
      store.dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });

    setTimeout(() => {
      response?.data?.errors?.length &&
        store.dispatch({
          type: 'SAVE_GENERAL_ERROR',
          generalError: response?.data?.errors[0],
        });
    }, 500);

    return response;
  },
  async (err) => {
    const response = await handleError(err);
    return response;
  }
);
