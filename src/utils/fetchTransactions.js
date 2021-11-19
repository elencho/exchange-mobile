import axios from 'axios';
import { bearer, CURRENCIES_URL, TRANSACTIONS_URL } from '../constants/filters';

export const fetchTransactions = async (params) => {
  try {
    const data = await axios.get(TRANSACTIONS_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCurrencies = async () => {
  try {
    const currencies = await axios.get(CURRENCIES_URL);
    return currencies.data;
  } catch (err) {
    console.log(err);
  }
};

export const totalAmount = async (params) => {
  try {
    const data = await axios.get(TRANSACTIONS_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data.paging.pageCount;
  } catch (err) {
    console.log(err);
  }
};
