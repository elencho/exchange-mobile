import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

i18next.use(initReactI18next).init({
  react: { useSuspense: false },
  compatibilityJSON: 'v3',
  lng: 'en-US',
  fallbackLng: 'en-US',
  resources: {},
  interpolation: true,
});

export default i18next;

export const switchLanguage = async (lang) => {
  await AsyncStorage.setItem('language', lang);
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    t('key');
  });
};

export const addResources = (lng, ns, resources) => {
  i18next.addResources(lng, ns, resources);
};
