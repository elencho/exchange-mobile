import axios from 'axios';
import { bearer, COUNTRIES_URL } from '../constants/api';

export const fetchCountries = async () => {
  try {
    const countries = await axios.get(COUNTRIES_URL);
    return countries.data;
  } catch (err) {
    console.log(err);
  }
};
