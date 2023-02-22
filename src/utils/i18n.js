import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';

i18next.use(initReactI18next).init({
  react: { useSuspense: false },
  compatibilityJSON: 'v3',
  lng: 'en-US',
  fallbackLng: 'en-US',
  resources: {
    en: {
      translation: {
        togglePairs: '<purple/> other pairs',
        priceUpdate: 'Price update in ',
        Hide: 'Hideee',
        Show: 'Showwww',
        '{{minConfirmsForDeposit}}':
          'Shuashi --> {{minConfirmsForDeposit}} <-- shuashi',
        '{{onlyThisNetwork}}': '{{onlyThisNetwork}}',
        deactivateAccount:
          '<t>saports miweret rom</t> <b>gagiuqmot eqaunti</b>',
        'needs tag for deposit {{currency}} params[currency]':
          '<light>მიუთითეთ თეგიც და მისამართიც, რომელიც აუცილებელია იმისათვის, რომ</light> <gold>მოხდეს {{currency}}-ის დეპოზიტი</gold> ',
        'confirmWithdrawal modal key with tag params[network]':
          '<light>აუცილებლად მიუთითეთ თეგიც და მისამართიც</light> <gold>უეჭველი ეს ნეთვორქი {{network}}</gold> ',
        'confirmWithdrawal modal key without tag params[network]':
          '<light>თეგი საჭირო არაა</light> <gold>უეჭველი ეს ნეთვორქი {{network}}</gold> <light>რენდომ ინფო</light> ',
        'we do not have cards add card': 'არ გაქვთ ბარათები <purple />',
        'we already have cards add card': 'გაქვთ უკვე ბარათები <purple />',
        'Add Card': 'დაამატეთ',
        'do not have address whitelist': 'არ გაქვთ მისამართები <purple />',
        'Add Whitelist': 'დაამატეთ ვაითლისტი',
        'card verification purple text full': 'click to <purple />',
        'retry card verification purple text full':
          'double click to <purple />',
        'card verification purple text': 'Verifyyyy',
        'retry card verification purple text': 'Retryyyy',
        'new user? register': 'ახალი მომხმარებელი ხართ? <purple />',
        'new user register purple': 'დარეგისტრირდით',
        'have an account? sign in': 'გაქვთ ექაუნთი? <purple />',
        'have an account? sign in purple': 'დალოგინდით',
        'resend purple': 'გაგზავნეთ ხელახლა',
      },
    },
    ka: {
      translation: {
        blaa: 'blaa:',
        togglePairs: 'დანარჩენი წყვილები <purple/>',
        priceUpdate: 'ფასები განახლდება ',
        Hide: 'დამალე',
        Show: 'გამოაჩინე',
        '{{minConfirmsForDeposit}}': '{{minConfirmsForDeposit}} <-- თავში',
        '{{onlyThisNetwork}}':
          'მხოლოდ {{onlyThisNetwork}} და არაფერი {{onlyThisNetwork}}-ის გარდა',
        deactivateAccount:
          '<b>ექაუნთის გასაუქმებლად</b> <t>მიწერეთ საფორთს</t>',
        confirmWithdrawal: `<light>Please confirm that your withdrawal addresses supports the</light> <gold>{{network}}.</gold> <light>If the other platform does not support it,</light> <gold>your assets may be lost.</gold> <light>If you are not sure whether the rece iver supports it, you can click the butto below to verify it yourself.</light>`,
        // "confirmWithdrawal: network, subject": `<light>Please confirm that your withdrawal addresses supports the</light> <gold>{{network}}.</gold> <light>If the other platform does not support it,</light> <gold>your assets may be lost.</gold> <light>If you are not sure whether the rece iver supports it, you can click the butto below to verify it yourself.</light>`,
      },
    },
  },
  interpolation: true,
});

export default i18next;

export const switchLanguage = async (lang) => {
  await SecureStore.setItemAsync('language', lang);
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    t('key');
  });
};

export const addResources = (lng, ns, resources) => {
  i18next.addResources(lng, ns, resources);
};
