import jwt_decode from 'jwt-decode';

import { actionTypes } from './actions';
import { bearer } from '../../constants/api';

const type = jwt_decode(bearer.split(' ')[1]).otpType;

const INITIAL_STATE = {
  // Login
  pkceInfo: {},
  loginStartInfo: {},
  credentials: { login: 'Metro21@mailinator.com', password: 'Qwerty123$' },
  userAndPassInfo: {},

  Personal_Security: 'Security',
  userInfo: {},

  // Security
  googleAuth: type === 'TOTP',
  emailAuth: type === 'EMAIL',
  smsAuth: type === 'SMS',
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
    countries,
    countriesConstant,
    userInfo,
    emailAuth,
    googleAuth,
    smsAuth,
    currentSecurityAction,
    otpChangeToken,
    totpSecretObj,
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
