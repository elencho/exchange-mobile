import axios from 'axios';
import { bearer, WIRE_DEPOSIT } from '../constants/api';

export const fetchWireDeposit = async (currency) => {
  try {
    const data = await axios.get(`${WIRE_DEPOSIT}/${currency}?provider=SWIFT`, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    console.log(err + ' in fetchWireDeposit');
  }
};
