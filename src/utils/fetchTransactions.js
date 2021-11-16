import axios from 'axios';
import { bearer, URL } from '../constants/filters';

export const fetchTransactions = async (params) => {
  try {
    const data = await axios.get(URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};
