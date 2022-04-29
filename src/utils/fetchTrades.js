import axios from 'axios';

import {
  bearer,
  OFFERS_URL,
  TRADES_URL,
  BALANCE_URL,
  CARDS_URL,
  CALCULATE_FEE_URL,
} from '../constants/api';
import handleError from './errorHandling';

export const fetchTrades = async (params) => {
  try {
    const data = await axios.get(TRADES_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    handleError(err);
  }
};

export const fetchOffers = async () => {
  try {
    const data = await axios.get(OFFERS_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    handleError(err);
  }
};

export const submitTrade = async (params) => {
  try {
    const data = await axios.post(TRADES_URL, params, {
      headers: { Authorization: bearer },
    });
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const fetchBalance = async () => {
  try {
    const data = await axios.get(BALANCE_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    handleError(err);
  }
};

export const fetchCards = async (params) => {
  try {
    const data = await axios.get(CARDS_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    handleError(err);
  }
};

export const fetchFees = async (params) => {
  try {
    const data = await axios.get(CALCULATE_FEE_URL, {
      headers: { Authorization: bearer },
      params,
    });
    return data.data;
  } catch (err) {
    handleError(err);
  }
};
