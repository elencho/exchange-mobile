import axios from 'axios';

import {
  OFFERS_URL,
  TRADES_URL,
  BALANCE_URL,
  CARDS_URL,
  CALCULATE_FEE_URL,
  TRADES_URL_PAGED,
} from '../constants/api';

export const fetchTrades = async (params) => {
  console.log(
    'params',
    params,
    encodeURIComponent(new URLSearchParams(params))
  );

  try {
    const data = await axios.get(TRADES_URL_PAGED, {
      params,
    });
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const fetchOffers = async () => {
  const data = await axios.get(OFFERS_URL);
  return data?.data;
};

export const submitTrade = async (payload) => {
  const data = await axios.post(TRADES_URL, payload, {
    headers: { toast: false, requestName: 'submitTrade' },
  });
  return data;
};
export const fetchBalance = async () => {
  const data = await axios.get(BALANCE_URL);
  return data?.data;
};

export const fetchCards = async (params) => {
  const data = await axios.get(CARDS_URL, {
    params,
  });
  return data?.data;
};

export const fetchFees = async (params) => {
  const data = await axios.get(CALCULATE_FEE_URL, {
    params,
  });
  return data?.data;
};
