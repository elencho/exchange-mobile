import axios from 'axios';
import { bearer, TRADES_URL } from '../constants/api';

export const fetchTrades = async (params) => {
  try {
    const data = await axios.get(TRADES_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
