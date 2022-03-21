import axios from 'axios';
// import BlobCourier from 'react-native-blob-courier';
import * as FileSystem from 'expo-file-system';

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

export const generateWirePdf = async (currency, amount, wireDepositInfoId) => {
  try {
    // const request0 = {
    //   ios: { target: 'data' },
    //   headers: { Authorization: bearer },
    //   filename: 'wiredeposit.pdf',
    //   method: 'GET',
    //   mimeType: 'application/octet-stream',
    //   url: `${GENERATE_WIRE_PDF}?currency=GEL&amount=10&wireDepositInfoId=7&timeZone=UTC`,
    // };
    // const fetchedResult = await BlobCourier.fetchBlob(request0);
    // console.log(fetchedResult);

    FileSystem.downloadAsync(
      `${GENERATE_WIRE_PDF}?currency=GEL&amount=10&wireDepositInfoId=7&timeZone=UTC`,
      FileSystem.documentDirectory + 'wiredeposit.pdf',
      { headers: { Authorization: bearer } }
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err + ' in generateWirePdf');
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
