import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {
  OFFERS_URL,
  TRADES_URL,
  BALANCE_URL,
  CARDS_URL,
  CALCULATE_FEE_URL,
} from '../constants/api';
import handleError from './errorHandling';

let bearer;

export const fetchTrades = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.get(TRADES_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    handleError(err, 'fetchTrades');
  }
};

export const fetchOffers = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.get(OFFERS_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    handleError(err, 'fetchOffers');
  }
};

export const submitTrade = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.post(TRADES_URL, params, {
      headers: { Authorization: bearer },
    });
    return data;
  } catch (err) {
    handleError(err, 'submitTrade');
  }
};
export const fetchBalance = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.get(BALANCE_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    handleError(err, 'fetchBalance');
  }
};

export const fetchCards = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.get(CARDS_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    handleError(err, 'fetchCards');
  }
};

export const fetchFees = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    bearer = `Bearer ${token}`;

    const data = await axios.get(CALCULATE_FEE_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    handleError(err, 'fetchFees');
  }
};
