import axios from 'axios';
import {
  bearer,
  OFFERS_URL,
  TRADES_URL,
  BALANCE_URL,
  CARDS_URL,
  CALCULATE_FEE_URL,
} from '../constants/api';

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

export const fetchOffers = async () => {
  try {
    const data = await axios.get(OFFERS_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const submitTrade = async (params) => {
  try {
    const data = await axios.post(TRADES_URL, params, {
      headers: { Authorization: bearer },
    });
    return data.status;
  } catch (err) {
    console.log(err);
  }
};
export const fetchBalance = async () => {
  try {
    const data = await axios.get(BALANCE_URL, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
};
