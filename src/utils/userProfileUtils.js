import axios from 'axios';
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
import handleError from './errorHandling';

let bearer;

export const loginStart = async (code_challenge) => {
  try {
    const data = await axios.get(LOGIN_START_URL, {
      params: {
        client_id: 'mobile-service-public',
        redirect_uri:
          'https://187257d8-01c3-48c0-a0e9-dae2c9aed1f2.mock.pstmn.io',
        response_mode: 'form_post',
        response_type: 'code',
        scope: 'openid',
        display: 'mobile',
        code_challenge,
        code_challenge_method: 'S256',
      },
    });
    return data.data;
  } catch (err) {
    handleError(err, 'loginStart');
  }
};

export const registrationStart = async () => {
  try {
    const data = await axios.get(REGISTRATION_START_URL, {
      params: {
        client_id: 'mobile-service-public',
        redirect_uri:
          'https://187257d8-01c3-48c0-a0e9-dae2c9aed1f2.mock.pstmn.io',
        response_type: 'code',
        scope: 'openid',
        display: 'mobile',
      },
    });
    return data.data;
  } catch (err) {
    handleError(err, 'registrationStart');
  }
};

export const usernameAndPasswordForm = async (username, password, url) => {
  try {
    const data = await axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url,
      data: `username=${username}&password=${password}`,
    });
    return data.data;
  } catch (err) {
    handleError(err, 'usernameAndPasswordForm');
  }
};

export const registrationForm = async (obj, url) => {
  const params = new URLSearchParams(obj);
  try {
    const data = await axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url,
      data: params,
    });
    console.log(data);
    return data.data;
  } catch (err) {
    handleError(err, 'usernameAndPasswordForm');
  }
};

export const resendEmail = async (url) => {
  try {
    await axios.post(url);
  } catch (err) {
    handleError(err, 'resendEmail');
  }
};

export const loginOtp = async (otp, url) => {
  try {
    const data = await axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url,
      data: `otp=${otp}`,
    });
  } catch (err) {
    handleError(err, 'loginOtp');
  }
};

export const codeToToken = async (code, code_verifier) => {
  try {
    const data = await axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: CODE_TO_TOKEN,
      data: `grant_type=authorization_code&client_id=mobile-service-public&code=${code}&redirect_uri=https://187257d8-01c3-48c0-a0e9-dae2c9aed1f2.mock.pstmn.io&code_verifier=${code_verifier}&code_challenge_method=S256`,
    });
    return data.data;
  } catch (err) {
    handleError(err, 'codeToToken');
  }
};

export const logoutUtil = async (refresh_token) => {
  try {
    const data = await axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: LOGOUT,
      data: `refresh_token=${refresh_token}&client_id=mobile-service-public`,
    });
    return data.status;
  } catch (err) {
    handleError(err, 'logoutUtil');
  }
};

export const fetchCountries = async () => {
  try {
    const countries = await axios.get(COUNTRIES_URL);
    return countries.data;
  } catch (err) {
    handleError(err, 'fetchCountries');
  }
};

export const fetchUserInfo = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.get(USER_INFO_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    handleError(err, 'fetchUserInfo');
  }
};

export const subscribeMail = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: SUBSCRIBE_EMAIL_URL,
    });
  } catch (err) {
    handleError(err, 'subscribeMail');
  }
};
export const unsubscribeMail = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: UNSUBSCRIBE_EMAIL_URL,
    });
  } catch (err) {
    handleError(err, 'unsubscribeMail');
  }
};

export const updateUserData = async (data) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: UPDATE_USER_DATA,
      data,
    });
  } catch (err) {
    handleError(err, 'updateUserData');
  }
};

export const updatePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword
) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios({
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url: UPDATE_PASSWORD,
      data: `password=${currentPassword}&passwordNew=${newPassword}&passwordConfirm=${confirmNewPassword}`,
    });
    return data;
  } catch (err) {
    handleError(err, 'updatePassword');
  }
};

export const verifyPhoneNumber = async (phoneNumber, phoneCountry) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: `${VERIFY_PHONE_NUMBER}?phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}`,
    });
  } catch (err) {
    handleError(err, 'verifyPhoneNumber');
  }
};

export const updatePhoneNumber = async (
  phoneNumber,
  phoneCountry,
  verificationNumber
) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: `${UPDATE_PHONE_NUMBER}?phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}&verificationNumber=${verificationNumber}`,
    });
  } catch (err) {
    handleError(err, 'updatePhoneNumber');
  }
};

export const sendOtp = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: SEND_OTP,
    });
  } catch (err) {
    handleError(err, 'sendOtp');
  }
};

export const getOtpChangeToken = async (OTP, newOTPType) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios({
      method: 'GET',
      headers: { Authorization: bearer, OTP },
      url: `${OTP_CHANGE_TOKEN}?newOTPType=${newOTPType}`,
    });
    return data.data;
  } catch (err) {
    handleError(err, 'getOtpChangeToken');
  }
};

export const sendEmailOtp = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: EMAIL_VERIFICATION,
    });
  } catch (err) {
    handleError(err, 'sendEmailOtp');
  }
};

export const activateEmailOtp = async (changeOTPToken, verificationCode) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios({
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url: ACTIVATE_EMAIL_OTP,
      data: `changeOTPToken=${changeOTPToken}&verificationCode=${verificationCode}`,
    });
    return data.status;
  } catch (err) {
    handleError(err, 'activateEmailOtp');
  }
};

export const activateGoogleOtp = async (
  changeOTPToken,
  totpCode,
  totpSecret
) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios({
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url: ACTIVATE_GOOGLE_OTP,
      data: `changeOTPToken=${changeOTPToken}&totpCode=${totpCode}&totpSecret=${totpSecret}`,
    });
    return data.status;
  } catch (err) {
    handleError(err, 'activateGoogleOtp');
  }
};
