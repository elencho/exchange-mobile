import axios from 'axios';
import { DICTIONARY } from '../constants/api';
import store from '../redux/store';

export const errorHappenedHere = (component) => {
  const state = store.getState();
  const {
    errors: { requestName },
  } = state;

  switch (component) {
    case 'CodeInput':
      return /* Array of request names */ [
        'verifyAccount',
        'cryptoWithdrawal',
        'wireWithdrawal',
        'cardWithdrawal',
        'addWhitelistAddress',
        'deleteWhitelistAddress',
        'getOtpChangeToken',
        'activateEmailOtp',
        'resetOtp',
        'loginOtp',
      ].some((c) => requestName === c);

    case 'BuySellModal':
      return requestName === 'submitTrade';

    case 'GoogleAuthModal':
      return requestName === 'activateGoogleOtp';
    case 'PasswordModal':
      return requestName === 'updatePassword';
    case 'PersonalInfoModal':
      return requestName === 'updateUserData';
    case 'PhoneNumberModal':
      return ['updatePhoneNumber', 'verifyPhoneNumber'].some(
        (c) => requestName === c
      );
    case 'NotificationSwitcher':
      return ['subscribeMail', 'unsubscribeMail'].some(
        (c) => requestName === c
      );

    case 'Deposit':
      return ['cardDeposit', 'generateCryptoAddress'].some(
        (c) => requestName === c
      );
    case 'AddEditWhitelistModal':
      return requestName === 'editWhitelistAddress';
    case 'DeleteModal':
      return ['deleteCard', 'deleteTemplates'].some((c) => requestName === c);

    case 'Welcome':
      return ['registrationStart', 'loginStart'].some((c) => requestName === c);
    case 'Login':
      return ['registrationStart', 'usernameAndPasswordForm'].some(
        (c) => requestName === c
      );
    case 'Registration':
      return ['loginStart', 'registrationForm'].some((c) => requestName === c);
    case 'ForgotPassword':
      return ['forgotPasswordCode', 'forgotPasswordEnterCode'].some(
        (c) => requestName === c
      );

    default:
      break;
  }
};

export const fetchTranslations = async () => {
  const data = await axios.get(DICTIONARY);
  return data?.data;
};

export const validateAmount = (amount) => {
  const validation =
    !!amount && parseInt(amount) > 0 && /^\d*\.?\d*$/.test(amount);
  return validation;
};
