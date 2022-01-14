import axios from 'axios';
import { bearer, COUNTRIES_URL, USER_INFO_URL } from '../constants/api';

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
