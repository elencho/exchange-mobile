import axios from 'axios';
import {
  ACTIVATE_EMAIL_OTP,
  ACTIVATE_GOOGLE_OTP,
  bearer,
  COUNTRIES_URL,
  EMAIL_VERIFICATION,
  LOGIN_START_URL,
  OTP_CHANGE_TOKEN,
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

export const loginStart = async (code_challenge) => {
  try {
    const data = await axios.get(LOGIN_START_URL, {
      params: {
        client_id: 'mobile-service-public',
        redirect_uri:
          'https://187257d8-01c3-48c0-a0e9-dae2c9aed1f2.mock.pstmn.io',
        response_mode: 'fragment',
        response_type: 'code',
        scope: 'openid',
        display: 'mobile',
        code_challenge,
        code_challenge_method: 'S256',
      },
    });
    console.log(data);
    return data.data;
  } catch (err) {
    handleError(err);
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
    handleError(err);
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
    console.log(data);
  } catch (err) {
    handleError(err, 'loginOtp');
  }
};

export const fetchCountries = async () => {
  try {
    const countries = await axios.get(COUNTRIES_URL);
    return countries.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserInfo = async () => {
  try {
    const data = await axios.get(USER_INFO_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const subscribeMail = async () => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: SUBSCRIBE_EMAIL_URL,
    });
  } catch (err) {
    console.log(err);
  }
};
export const unsubscribeMail = async () => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: UNSUBSCRIBE_EMAIL_URL,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = async (data) => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: UPDATE_USER_DATA,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword
) => {
  try {
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
    console.log(err);
  }
};

export const verifyPhoneNumber = async (phoneNumber, phoneCountry) => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: `${VERIFY_PHONE_NUMBER}?phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePhoneNumber = async (
  phoneNumber,
  phoneCountry,
  verificationNumber
) => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: `${UPDATE_PHONE_NUMBER}?phoneNumber=${phoneNumber}&phoneCountry=${phoneCountry}&verificationNumber=${verificationNumber}`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendOtp = async () => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: SEND_OTP,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOtpChangeToken = async (OTP, newOTPType) => {
  try {
    const data = await axios({
      method: 'GET',
      headers: { Authorization: bearer, OTP },
      url: `${OTP_CHANGE_TOKEN}?newOTPType=${newOTPType}`,
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendEmailOtp = async () => {
  try {
    await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: EMAIL_VERIFICATION,
    });
  } catch (err) {
    console.log(err);
  }
};

export const activateEmailOtp = async (changeOTPToken, verificationCode) => {
  try {
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
    console.log(err);
  }
};

export const activateGoogleOtp = async (
  changeOTPToken,
  totpCode,
  totpSecret
) => {
  try {
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
    console.log(err);
  }
};
