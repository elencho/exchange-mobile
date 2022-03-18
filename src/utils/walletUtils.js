import axios from 'axios';

import {
  bearer,
  GET_CRYPTO_ADDRESSES,
  WIRE_DEPOSIT,
  GENERATE_WIRE_PDF,
  GENERATE_CRYPTO_ADDRESS,
} from '../constants/api';

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

// export const generateWirePdf = async (currency, amount, wireDepositInfoId) => {
//   try {
//     const data = await axios.get(
//       `${GENERATE_WIRE_PDF}?currency=GEL&amount=10&wireDepositInfoId=7&timeZone=UTC`,
//       {
//         headers: { Authorization: bearer },
//       }
//     );
//   } catch (err) {
//     console.log(err + ' in generateWirePdf');
//   }
// };

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

export const generateCryptoAddress = async (currency, network) => {
  try {
    const data = await axios({
      method: 'POST',
      headers: { Authorization: bearer },
      url: `${GENERATE_CRYPTO_ADDRESS}/${currency}?provider=${network}`,
    });
    return data.data;
  } catch (err) {
    console.log(err + ' in generateCryptoAddress');
  }
};
