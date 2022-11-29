import { actionTypes } from './actions';

const vaxo_realuri = {
  login: 'Vakhtang.elisabedashvili@gmail.com',
  password: '11111!Aa',
};
const vaxo_satesto = { login: 'metro21@mailinator.com', password: '11111!Aa' };
const sali_satesto = {
  login: 'salibukhiashvili@mailinator.com',
  password: 'Salome1996$',
};
const sali_realuri = {
  login: 'bukhiashvilisalome@gmail.com',
  password: '',
};
const baneta_realuri = { login: 'ibanet@cryptx.com', password: 'Malina125$' };

const INITIAL_STATE = {
  timerVisible: false,

  // Login
  pkceInfo: {},
  loginStartInfo: {},
  credentials: baneta_realuri,
  userAndPassInfo: {},
  forgotPassInfo: {
    username: '',
    code: '',
  },
  forgotPassMode: false,

  // Register
  Personal_Company: 'Personal',
  registrationStartInfo: {},
  registrationInputs: {
    firstName: 'aa',
    lastName: 'aa',
    email: 'vaxo2@mailinator.com',
    passwordNew: '11111!Aa',
    passwordConfirm: '11111!Aa',
    phoneCountry: 'GEO',
    phoneNumber: '555554555',
    promoCode: '',
    referralCode: '',
    acceptTerms: 'on',
  },
  verificationInfo: {},

  Personal_Security: 'Personal',
  userInfo: {},
  language: 'English',

  // Security
  googleAuth: false,
  emailAuth: false,
  smsAuth: false,
  currentSecurityAction: null,
  otpChangeToken: null,
  totpSecretObj: {},

  countries: [],
  countriesConstant: [],
};

export default (state = INITIAL_STATE, action) => {
  const {
    pkceInfo,
    credentials,
    userAndPassInfo,
    forgotPassInfo,
    forgotPassMode,
    loginStartInfo,
    registrationStartInfo,
    verificationInfo,
    registrationInputs,
    Personal_Security,
    Personal_Company,
    countries,
    countriesConstant,
    userInfo,
    language,
    emailAuth,
    googleAuth,
    smsAuth,
    currentSecurityAction,
    otpChangeToken,
    totpSecretObj,
    timerVisible,
  } = action;
  switch (action.type) {
    case actionTypes.SAVE_PKCE_INFO:
      return {
        ...state,
        pkceInfo,
      };
    case actionTypes.SAVE_LOGIN_START_INFO:
      return {
        ...state,
        loginStartInfo,
      };
    case actionTypes.SAVE_REGISTRATION_START_INFO:
      return {
        ...state,
        registrationStartInfo,
      };
    case actionTypes.SAVE_VERIFICATION_INFO:
      return {
        ...state,
        verificationInfo,
      };
    case actionTypes.SET_CREDENTIALS:
      return {
        ...state,
        credentials,
      };
    case actionTypes.SET_REGISTRATION_INPUTS:
      return {
        ...state,
        registrationInputs,
      };
    case actionTypes.SAVE_USER_AND_PASS_INFO:
      return {
        ...state,
        userAndPassInfo,
      };
    case 'SAVE_FORGOT_PASS_INFO':
      return {
        ...state,
        forgotPassInfo,
      };
    case 'TOGGLE_TIMER':
      return {
        ...state,
        timerVisible,
      };
    case 'TOGGLE_FORGOT_PASS_MODE':
      return {
        ...state,
        forgotPassMode,
      };
    case actionTypes.SWITCH_PERSONAL_SECURITY:
      return {
        ...state,
        Personal_Security,
      };
    case actionTypes.SWITCH_PERSONAL_COMPANY:
      return {
        ...state,
        Personal_Company,
      };
    case actionTypes.SAVE_COUNTRIES:
      return {
        ...state,
        countries,
      };
    case actionTypes.SAVE_COUNTRIES_CONSTANT:
      return {
        ...state,
        countriesConstant,
      };
    case actionTypes.SAVE_USER_INFO:
      return {
        ...state,
        userInfo,
      };
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language,
      };
    case actionTypes.SET_GOOGLE_AUTH:
      return {
        ...state,
        googleAuth,
      };
    case actionTypes.SET_EMAIL_AUTH:
      return {
        ...state,
        emailAuth,
      };
    case actionTypes.SET_SMS_AUTH:
      return {
        ...state,
        smsAuth,
      };
    case actionTypes.CURRENT_SECURITY_ACTION:
      return {
        ...state,
        currentSecurityAction,
      };
    case actionTypes.SAVE_OTP_CHANGE_TOKEN:
      return {
        ...state,
        otpChangeToken,
      };
    case actionTypes.SAVE_TOTP_SECRET_OBJ:
      return {
        ...state,
        totpSecretObj,
      };
    case actionTypes.RESET_PROFILE_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
