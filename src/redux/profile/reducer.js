import jwt_decode from 'jwt-decode';

import { actionTypes } from './actions';
import { bearer } from '../../constants/api';

const type = jwt_decode(bearer.split(' ')[1]).otpType;

const INITIAL_STATE = {
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
