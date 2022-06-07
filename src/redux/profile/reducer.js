import { actionTypes } from './actions';

const INITIAL_STATE = {
  generalError: null,

  // Login
  pkceInfo: {},
  loginStartInfo: {},
  credentials: { login: 'gkerva@cryptal.com', password: 'TestGexCryptal7' },
  userAndPassInfo: {},

  // Register
  Personal_Company: 'Personal',
  registrationStartInfo: {},
  registrationInputs: {},
  resendLink: null,

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

  // Query Params
  offset: 0,
  limit: 5,
};

export default (state = INITIAL_STATE, action) => {
  const {
    generalError,
    pkceInfo,
    credentials,
    userAndPassInfo,
    loginStartInfo,
    registrationStartInfo,
    resendLink,
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
  } = action;
  switch (action.type) {
    case actionTypes.SAVE_GENERAL_ERROR:
      return {
        ...state,
        generalError,
      };
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
    case actionTypes.SAVE_RESEND_LINK:
      return {
        ...state,
        resendLink,
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
    default:
      return state;
  }
};
