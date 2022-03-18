import axios from 'axios';
import { bearer, GET_CRYPTO_ADDRESSES, WIRE_DEPOSIT } from '../constants/api';

export const fetchWireDeposit = async (currency, network) => {
  try {
    const data = await axios.get(`${WIRE_DEPOSIT}/${currency}?provider=SWIFT`, {
      headers: { Authorization: bearer },
    });
    return data.data;
  } catch (err) {
    console.log(err + ' in fetchWireDeposit');
  }
};

export const fetchCryptoAddresses = async (currency, network) => {
  try {
    const data = await axios.get(
      `${GET_CRYPTO_ADDRESSES}/${currency}?provider=${network}`,
      {
        headers: { Authorization: bearer },
      }
    );
    return data.data;
  } catch (err) {
    console.log(err + ' in fetchCryptoAddresses');
  }
};
