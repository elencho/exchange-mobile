import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import BackendAdapter from 'i18next-multiload-backend-adapter';
import * as SecureStore from 'expo-secure-store';

import { DICTIONARY } from '../constants/api';

i18next
  .use(BackendAdapter)
  .use(initReactI18next)
  .init({
    react: { useSuspense: false },
    lng: 'en-US',
    fallbackLng: 'en-US',
    backend: {
      backend: Backend,
      backendOption: {
        loadPath: DICTIONARY,
      },
    },
  });

export default i18next;

export const switchLanguage = async (lang) => {
  await SecureStore.setItemAsync('Language', lang);
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    t('key');
  });
};
