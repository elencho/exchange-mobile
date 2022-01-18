import axios from 'axios';
import {
  bearer,
  COUNTRIES_URL,
  SUBSCRIBE_EMAIL_URL,
  UNSUBSCRIBE_EMAIL_URL,
  UPDATE_PASSWORD,
  UPDATE_USER_DATA,
  USER_INFO_URL,
} from '../constants/api';

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
