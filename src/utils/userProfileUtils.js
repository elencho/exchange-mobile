import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import {
  ACTIVATE_EMAIL_OTP,
  ACTIVATE_GOOGLE_OTP,
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
  VERIFY_PHONE_NUMBER,
} from '../constants/api';

const authRedirectUrl = Constants.manifest.extra.authRedirectUrl;

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
  });
  if (data) return data.data;
};

export const registrationStart = async () => {
  const data = await axios.get(REGISTRATION_START_URL, {
    params: {
      client_id: 'mobile-service-public',
      redirect_uri: authRedirectUrl,
      response_type: 'code',
      scope: 'openid',
      display: 'mobile',
    },
  });
  if (data) return data.data;
};

export const usernameAndPasswordForm = async (username, password, url) => {
  const data = await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url,
    data: `username=${username}&password=${password}`,
  });
  if (data) return data.data;
};

export const registrationForm = async (obj, url) => {
  const params = new URLSearchParams(obj);
  const data = await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url,
    data: params,
  });
  console.log(data);
  if (data) return data.data;
};

export const resendEmail = async (url) => await axios.post(url);

export const loginOtp = async (otp, url) => {
  const data = await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url,
    data: `otp=${otp}`,
  });
  if (data) return data.data.code;
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

export const fetchCountries = async () => {
  const data = await axios.get(COUNTRIES_URL);
  if (data) return data.data;
};

export const fetchUserInfo = async () => {
  const data = await axios.get(USER_INFO_URL);
  if (data) return data.data;
};

export const subscribeMail = async () => {
  await axios({
    method: 'POST',
    url: SUBSCRIBE_EMAIL_URL,
  });
};
export const unsubscribeMail = async () => {
  await axios({
    method: 'POST',
    url: UNSUBSCRIBE_EMAIL_URL,
  });
};

export const updateUserData = async (data) => {
  await axios({
    method: 'POST',
    url: UPDATE_USER_DATA,
    data,
  });
};

export const updatePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword
) => {
  const data = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: UPDATE_PASSWORD,
    data: `password=${currentPassword}&passwordNew=${newPassword}&passwordConfirm=${confirmNewPassword}`,
  });
  if (data) return data;
};

export const verifyPhoneNumber = async (phoneNumber, phoneCountry) => {
  await axios({
    method: 'POST',
    url: `${VERIFY_PHONE_NUMBER}?phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}`,
  });
};

export const updatePhoneNumber = async (
  phoneNumber,
  phoneCountry,
  verificationNumber
) => {
  await axios({
    method: 'POST',
    url: `${UPDATE_PHONE_NUMBER}?phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}&verificationNumber=${verificationNumber}`,
  });
};

export const sendOtp = async () => await axios.post(SEND_OTP);

export const getOtpChangeToken = async (OTP, newOTPType) => {
  const data = await axios({
    method: 'GET',
    headers: { OTP },
    url: `${OTP_CHANGE_TOKEN}?newOTPType=${newOTPType}`,
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
    },
    url: ACTIVATE_GOOGLE_OTP,
    data: `changeOTPToken=${changeOTPToken}&totpCode=${totpCode}&totpSecret=${totpSecret}`,
  });
  if (data) return data.status;
};
