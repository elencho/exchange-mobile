import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import handleError from './errorHandling';

axios.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    // console.log('▼▼▼▼▼▼ response');
    // console.log(response);
    // console.log('▲▲▲▲▲▲');
    return response;
  },
  async (err) => {
    const response = await handleError(err);
    return response;
  }
);
