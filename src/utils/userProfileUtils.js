import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import {
  ACTIVATE_EMAIL_OTP,
  ACTIVATE_GOOGLE_OTP,
  CARD_VERIFICATION_TOKEN,
  CODE_TO_TOKEN,
  COUNTRIES_URL,
  EMAIL_VERIFICATION,
  LOGIN_START_URL,
  LOGOUT,
  OTP_CHANGE_TOKEN,
  REGISTRATION_START_URL,
  SEND_OTP,
  SUBSCRIBE_EMAIL_URL,
  UNSUBSCRIBE_EMAIL_URL,
  UPDATE_PASSWORD,
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_DATA,
  USER_INFO_URL,
  VERIFICATION_TOKEN,
  VERIFY_PHONE_NUMBER,
} from '../constants/api';

import { navigationRef } from '../navigation';

const authRedirectUrl = Constants.manifest.extra.authRedirectUrl;

export const sumsubVerificationToken = async () => {
  const token = await axios.get(VERIFICATION_TOKEN);
  return token.data;
};

export const cardVerificationToken = async (cardId) => {
  const token = await axios.get(CARD_VERIFICATION_TOKEN, {
    params: { cardId },
  });
  return token.data.token;
};

export const loginStart = async (code_challenge) => {
  const data = await axios.get(LOGIN_START_URL, {
    params: {
      client_id: 'mobile-service-public',
      redirect_uri: authRedirectUrl,
      response_mode: 'form_post',
      response_type: 'code',
      scope: 'openid',
      display: 'mobile',
      code_challenge,
      code_challenge_method: 'S256',
    },
    headers: { requestName: 'loginStart', toast: false },
  });
  if (data) return data.data;
};

export const registrationStart = async () => {
  const data = await axios.get(REGISTRATION_START_URL, {
    params: {
      client_id: 'mobile-service-public',
      redirect_uri: authRedirectUrl,
      response_mode: 'form_post',
      response_type: 'code',
      scope: 'openid',
      display: 'mobile',
    },
    headers: { requestName: 'registrationStart', toast: false },
  });
  if (data) return data.data;
};

export const usernameAndPasswordForm = async (username, password, url) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'usernameAndPasswordForm',
      toast: false,
    },
    url,
    data: `username=${username}&password=${password}`,
  });
  if (data) return data.data;
};

export const registrationForm = async (obj, url) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'registrationForm',
      toast: false,
    },
    url,
    data: obj,
  });
  if (data) return data.data;
};

export const verifyAccount = async (url, otp) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'verifyAccount',
      toast: false,
    },
    url,
    data: `otp=${otp}`,
  });
  return data?.data;
};

export const resendEmail = async (url) => {
  const data = await axios.get(`${url}&resend=true`);
  return data?.data;
};

export const loginOtp = async (otp, url) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'loginOtp',
      toast: false,
    },
    url,
    data: `otp=${otp}`,
  });
  if (data) return data.data;
};

export const resetOtp = async (url) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'resetOtp',
      toast: false,
    },
    url,
    data: `resetOTP=true`,
  });
  if (data) return data.data;
};

export const forgotPassword = async (url) => {
  const data = await axios.post(url);
  if (data) return data.data;
};

export const forgotPasswordCode = async (url, username) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'forgotPasswordCode',
      toast: false,
    },
    url,
    data: `username=${username}&send=true`,
  });
  if (data) return data.data;
};

export const forgotPasswordEnterCode = async (url, username, otp) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'forgotPasswordEnterCode',
      toast: false,
    },
    url,
    data: `username=${username}&otp=${otp}`,
  });
  if (data) return data.data;
};

export const setNewPassword = async (url, newPass, confirmPass) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url,
    data: `password-new=${newPass}&password-confirm=${confirmPass}`,
  });
  if (data) return data.data;
};

export const codeToToken = async (code, code_verifier) => {
  const data = await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: CODE_TO_TOKEN,
    data: `grant_type=authorization_code&client_id=mobile-service-public&code=${code}&redirect_uri=${authRedirectUrl}&code_verifier=${code_verifier}&code_challenge_method=S256`,
  });
  if (data) return data.data;
};

const refreshTokenService = async (refresh_token) => {
  const data = await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: CODE_TO_TOKEN,
    data: `grant_type=refresh_token&client_id=mobile-service-public&refresh_token=${refresh_token}`,
  });
  if (data) return data.data;
};

export const refreshToken = async (config) => {
  const refresh_token = await SecureStore.getItemAsync('refreshToken');
  const data = await refreshTokenService(refresh_token);
  if (data) {
    if (data.access_token && data.refresh_token) {
      await SecureStore.setItemAsync('accessToken', data.access_token);
      await SecureStore.setItemAsync('refreshToken', data.refresh_token);
      if (config) return axios.request(config);
      return data.access_token;
    }
  }
  // else Promise.reject().then((err) => err);
};

export const logoutUtil = async (refresh_token) => {
  const data = await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: LOGOUT,
    data: `refresh_token=${refresh_token}&client_id=mobile-service-public`,
  });
  if (data) return data.status;
};

export const logout = async () => {
  const refresh_token = await SecureStore.getItemAsync('refreshToken');
  const status = await logoutUtil(refresh_token);
  if (status === 204) {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    navigationRef.navigate('Welcome');

    dispatch({ type: 'LOGOUT' });
  }
};

export const fetchCountries = async () => {
  const data = await axios.get(COUNTRIES_URL);
  if (data) return data.data;
};

export const fetchUserInfo = async () => {
  const data = await axios.get(USER_INFO_URL);
  if (data) return data.data;
};

export const subscribeMail = async () => {
  const data = await axios({
    method: 'POST',
    url: SUBSCRIBE_EMAIL_URL,
    headers: { requestName: 'subscribeMail', toast: false },
  });
  return data;
};
export const unsubscribeMail = async () => {
  const data = await axios({
    method: 'POST',
    url: UNSUBSCRIBE_EMAIL_URL,
    headers: { requestName: 'unsubscribeMail', toast: false },
  });
  return data;
};

export const updateUserData = async (data) => {
  const userInfo = await axios({
    method: 'POST',
    url: UPDATE_USER_DATA,
    data,
    headers: {
      requestName: 'updateUserData',
      toast: false,
      'Content-Type': 'multipart/form-data',
    },
  });
  return userInfo;
};

export const updatePassword = async (
  password,
  passwordNew,
  passwordConfirm
) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'updatePassword',
      toast: false,
    },
    url: UPDATE_PASSWORD,
    data: `password=${password}&passwordNew=${passwordNew}&passwordConfirm=${passwordConfirm}`,
  });
  return data;
};

export const verifyPhoneNumber = async (phoneNumber, phoneCountry) => {
  await axios({
    method: 'POST',
    headers: { requestName: 'verifyPhoneNumber' },
    url: VERIFY_PHONE_NUMBER,
    params: { phoneCountry, phoneNumber },
  });
};

export const updatePhoneNumber = async (phoneNumber, phoneCountry) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'updatePhoneNumber',
      toast: false,
    },
    url: UPDATE_PHONE_NUMBER,
    data: `phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}`,
  });
  return data;
};

export const sendOtp = async () => await axios.post(SEND_OTP);

export const getOtpChangeToken = async (OTP, newOTPType) => {
  const data = await axios({
    method: 'GET',
    headers: { OTP, requestName: 'getOtpChangeToken', toast: false },
    url: OTP_CHANGE_TOKEN,
    params: { newOTPType },
  });
  if (data) return data.data;
};

export const sendEmailOtp = async () => {
  await axios({
    method: 'POST',
    url: EMAIL_VERIFICATION,
  });
};

export const activateEmailOtp = async (changeOTPToken, verificationCode) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'activateEmailOtp',
      toast: false,
    },
    url: ACTIVATE_EMAIL_OTP,
    data: `changeOTPToken=${changeOTPToken}&verificationCode=${verificationCode}`,
  });
  if (data) return data.status;
};

export const activateGoogleOtp = async (
  changeOTPToken,
  totpCode,
  totpSecret
) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      requestName: 'activateGoogleOtp',
      toast: false,
    },
    url: ACTIVATE_GOOGLE_OTP,
    data: `changeOTPToken=${changeOTPToken}&totpCode=${totpCode}&totpSecret=${totpSecret}`,
  });
  if (data) return data.status;
};
