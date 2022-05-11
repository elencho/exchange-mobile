import { Platform } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';

import {
  GET_CRYPTO_ADDRESSES,
  WIRE_DEPOSIT,
  GENERATE_WIRE_PDF,
  GENERATE_CRYPTO_ADDRESS,
  CRYPTO_WITHDRAWAL,
  CRYPTO_WHITELIST,
  WITHDRAWAL_TEMPLATES,
  BANKS_URL,
  WIRE_WITHDRAWAL,
} from '../constants/api';
import handleError from './errorHandling';

let bearer;
(async function () {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  bearer = `Bearer ${accessToken}`;
})();

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
    FileSystem.downloadAsync(
      `${GENERATE_WIRE_PDF}?currency=${currency}&amount=${amount}&wireDepositInfoId=${wireDepositInfoId}&timeZone=UTC`,
      FileSystem.documentDirectory + 'wiredeposit.pdf',
      { headers: { Authorization: bearer } }
    )
      .then(async (data) => {
        const { uri } = data;

        if (Platform.OS === 'ios') {
          await Sharing.shareAsync(uri);
        }

        if (Platform.OS === 'android') {
          const perm = await MediaLibrary.requestPermissionsAsync();
          if (perm.status !== 'granted') {
            return;
          }

          try {
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.getAlbumAsync('Download');
            if (!album) {
              await MediaLibrary.createAlbumAsync('Download', asset, false);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }
          } catch (e) {
            console.log(e);
          }
        }
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
    handleError(err, 'fetchCryptoAddresses');
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
    handleError(err);
  }
};

export const cryptoWithdrawal = async (OTP, params) => {
  try {
    const data = await axios.post(CRYPTO_WITHDRAWAL, params, {
      headers: { Authorization: bearer, OTP },
    });
    return data.status;
  } catch (err) {
    console.log(err + ' in cryptoWithdrawal');
  }
};

export const fetchWhitelist = async (currency) => {
  try {
    const data = await axios.get(CRYPTO_WHITELIST, {
      headers: { Authorization: bearer },
      params: { currency },
    });
    return data.data;
  } catch (err) {
    console.log(err);
    console.log('Error in fetchWhitelist');
  }
};

export const addWhitelistAddress = async (OTP, params) => {
  try {
    const data = await axios.post(CRYPTO_WHITELIST, params, {
      headers: { Authorization: bearer, OTP },
    });
    return data;
  } catch (err) {
    console.log(err);
    console.log('Error in addWhitelistAddress');
  }
};

export const editWhitelistAddress = async (id, name) => {
  try {
    const data = await axios({
      method: 'PUT',
      headers: { Authorization: bearer },
      url: `${CRYPTO_WHITELIST}/${id}?name=${name}`,
    });
    return data.status;
  } catch (err) {
    console.log(err);
    console.log('Error in editWhitelistAddress');
  }
};

export const deleteWhitelistAddress = async (id, OTP) => {
  try {
    const data = await axios({
      method: 'DELETE',
      headers: { Authorization: bearer, OTP },
      url: `${CRYPTO_WHITELIST}/${id}`,
    });
    return data.status;
  } catch (err) {
    console.log(err);
    console.log('Error in deleteWhitelistAddress');
  }
};

export const fetchTemplates = async (currency, provider) => {
  try {
    const data = await axios({
      method: 'GET',
      headers: { Authorization: bearer },
      url: `${WITHDRAWAL_TEMPLATES}?currency=${currency}&provider=${provider}`,
    });
    return data.data;
  } catch (err) {
    console.log(err);
    console.log('Error in fetchTemplates');
  }
};

export const deleteTemplates = async (id) => {
  try {
    const data = await axios({
      method: 'DELETE',
      headers: { Authorization: bearer },
      url: `${WITHDRAWAL_TEMPLATES}/${id}`,
    });
    return data.status;
  } catch (err) {
    handleError(err);
  }
};

export const fetchBanks = async (provider) => {
  try {
    const data = await axios({
      method: 'GET',
      headers: { Authorization: bearer },
      url: `${BANKS_URL}?provider=${provider}`,
    });
    return data.data;
  } catch (err) {
    console.log(err);
    console.log('Error in fetchBanks');
  }
};

export const wireWithdrawal = async (OTP, params) => {
  try {
    const data = await axios.post(WIRE_WITHDRAWAL, params, {
      headers: { Authorization: bearer, OTP },
    });
    return data.status;
  } catch (err) {
    handleError(err);
  }
};
