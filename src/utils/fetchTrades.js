import axios from 'axios';

import {
  OFFERS_URL,
  TRADES_URL,
  BALANCE_URL,
  CARDS_URL,
  CALCULATE_FEE_URL,
} from '../constants/api';

export const fetchTrades = async (params) => {
  const data = await axios.get(TRADES_URL, { params });
  return data.data;
};

export const fetchOffers = async () => {
  const data = await axios.get(OFFERS_URL);
  return data.data;
};

export const submitTrade = async (params) => {
  const data = await axios.post(TRADES_URL, params, {});
  return data;
};
export const fetchBalance = async () => {
  const data = await axios.get(BALANCE_URL);
  return data.data;
};

export const fetchCards = async (params) => {
  const data = await axios.get(CARDS_URL, {
    params,
  });
  return data.data;
};

export const fetchFees = async (params) => {
  const data = await axios.get(CALCULATE_FEE_URL, {
    params,
  });
  return data.data;
};
