import { actionTypes } from './actions';

const INITIAL_STATE = {
  // Login
  pkceInfo: {},
  loginStartInfo: {},
  credentials: { login: 'gexo@mailinator.com', password: 'Baneta125' },
  userAndPassInfo: {},

  Personal_Security: 'Personal',
  Personal_Company: 'Personal',
  userInfo: {},
  language: 'English',

  // Security
  otpType: '',
  get googleAuth() {
    return this.otpType === 'TOTP';
  },
  get emailAuth() {
    return this.otpType === 'EMAIL';
  },
  get smsAuth() {
    return this.otpType === 'SMS';
  },
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
    pkceInfo,
    credentials,
    userAndPassInfo,
    loginStartInfo,
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
    otpType,
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
    case actionTypes.SET_CREDENTIALS:
      return {
        ...state,
        credentials,
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
    case actionTypes.SET_OTP_TYPE:
      return {
        ...state,
        otpType,
      };
    default:
      return state;
  }
};
