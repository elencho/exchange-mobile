import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'Hey Yo Im at home': 'Hey Yo Im at home',
        'Hey Yo Im inside Room': 'Hey Yo Im inside Room',
      },
    },
    es: {
      translation: {
        'Hey Yo Im at home': 'Hey yo estoy en casa',
        Withdrawal: 'Withdrawal in spanish',
        'Hey Yo Im inside Room': 'Hola, yo estoy dentro de la habitación',
      },
    },
    de: {
      translation: {
        'Hey Yo Im at home': 'Hey Yo Ich bin zu Hause',
        'Hey Yo Im inside Room': 'Hey Yo Ich bin im Zimmer',
      },
    },
  },
});
export default i18n;
