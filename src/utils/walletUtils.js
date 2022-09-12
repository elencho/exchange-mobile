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
  CARD_WITHDRAWAL,
  CARD_DEPOSIT,
  ADD_CARD_URL,
  DELETE_CARD_URL,
  MAX_WITHDRAWAL,
} from '../constants/api';

export const fetchWireDeposit = async (currency, provider) => {
  const data = await axios.get(`${WIRE_DEPOSIT}/${currency}`, {
    params: { toast: false, provider },
  });
  if (data) return data.data;
};

export const generateWirePdf = async (currency, amount, wireDepositInfoId) => {
  const token = await SecureStore.getItemAsync('accessToken');
  const bearer = `Bearer ${token}`;

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
        if (perm.status !== 'granted') return;

        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (!album) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchCryptoAddresses = async (currency, network) => {
  const data = await axios.get(
    `${GET_CRYPTO_ADDRESSES}/${currency}?provider=${network}`
  );
  if (data) return data.data[0];
};

export const generateCryptoAddress = async (currency, network) => {
  const data = await axios({
    method: 'POST',
    url: `${GENERATE_CRYPTO_ADDRESS}/${currency}?provider=${network}`,
    params: { toast: false },
  });
  if (data) return data.data;
};

export const cryptoWithdrawal = async (OTP, params) => {
  const data = await axios.post(
    CRYPTO_WITHDRAWAL,
    { ...params, toast: false },
    {
      headers: { OTP },
    }
  );
  if (data) return data.status;
};

export const fetchWhitelist = async (currency) => {
  const data = await axios.get(CRYPTO_WHITELIST, {
    params: { currency, toast: false },
  });
  if (data) return data.data;
};

export const addWhitelistAddress = async (OTP, params) => {
  const data = await axios.post(
    CRYPTO_WHITELIST,
    { ...params, toast: false },
    {
      headers: { OTP },
    }
  );
  if (data) return data.data;
};

export const editWhitelistAddress = async (id, name) => {
  const data = await axios({
    method: 'PUT',
    url: `${CRYPTO_WHITELIST}/${id}?name=${name}`,
    params: { toast: false },
  });
  if (data) return data.status;
};

export const deleteWhitelistAddress = async (id, OTP) => {
  const data = await axios({
    method: 'DELETE',
    headers: { OTP },
    url: `${CRYPTO_WHITELIST}/${id}`,
    params: { toast: false },
  });
  if (data) return data.status;
};

export const fetchTemplates = async (currency, provider) => {
  const data = await axios({
    method: 'GET',
    url: `${WITHDRAWAL_TEMPLATES}?currency=${currency}&provider=${provider}`,
  });
  if (data) return data.data;
};

export const deleteTemplates = async (id) => {
  const data = await axios({
    method: 'DELETE',
    url: `${WITHDRAWAL_TEMPLATES}/${id}`,
    params: { toast: false },
  });
  if (data) return data.status;
};

export const fetchBanks = async (provider) => {
  const data = await axios({
    method: 'GET',
    url: `${BANKS_URL}?provider=${provider}`,
  });
  if (data) return data.data;
};

export const wireWithdrawal = async (OTP, params) => {
  const data = await axios.post(
    WIRE_WITHDRAWAL,
    { ...params, toast: false },
    {
      headers: { OTP },
    }
  );
  if (data) return data.status;
};

export const cardWithdrawal = async (OTP, params) => {
  const data = await axios.post(
    CARD_WITHDRAWAL,
    { ...params, toast: false },
    {
      headers: { OTP },
    }
  );
  if (data) return data.status;
};

export const maxWithdrawal = async (params) => {
  const data = await axios.get(MAX_WITHDRAWAL, { params });
  if (data) return data.data;
};

export const cardDeposit = async (payload) => {
  const data = await axios.post(CARD_DEPOSIT, payload);
  if (data) return data.data;
};

export const addCard = async (payload) => {
  const data = await axios.post(ADD_CARD_URL, payload, {
    params: { toast: false },
  });
  if (data) return data.data;
};

export const deleteCard = async (cardId) => {
  const data = await axios.delete(DELETE_CARD_URL, {
    params: { cardId, toast: false },
  });
  if (data) return data.status;
};
