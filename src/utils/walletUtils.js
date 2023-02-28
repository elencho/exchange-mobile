import { Platform, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';
import RNFetchBlob from 'rn-fetch-blob';
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
    params: { provider },
    headers: { requestName: 'fetchWireDeposit', toast: false },
  });
  if (data) return data.data;
};

export const generateWirePdf = async (
  currency,
  amount,
  wireDepositInfoId,
  setLoading
) => {
  try {
    setLoading(true);
    const token = await SecureStore.getItemAsync('accessToken');
    const bearer = `Bearer ${token}`;

    FileSystem.downloadAsync(
      `${GENERATE_WIRE_PDF}?currency=${currency}&amount=${amount}&wireDepositInfoId=${wireDepositInfoId}&timeZone=UTC`,
      FileSystem.documentDirectory + 'wiredeposit.pdf',
      { headers: { Authorization: bearer } }
    ).then(async (data) => {
      const { uri } = data;

      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri);
      }

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        downloadFile(currency, amount, wireDepositInfoId, bearer);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  } catch (error) {
    setLoading(false);
    alert(error);
    console.error(error);
  }
};

const downloadFile = async (currency, amount, wireDepositInfoId, bearer) => {
  const pdfLocation =
    RNFetchBlob.fs.dirs.DownloadDir + '/' + `wiredeposit${amount}.pdf`;
  const android = RNFetchBlob.android;

  RNFetchBlob.config({
    fileCache: true,
    path: pdfLocation,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: 'application/pdf',
      title: 'Wiredeposit',
      mediaScannable: true,
      description: 'File downloaded by download manager.',
    },
  });

  RNFetchBlob.fetch(
    'GET',
    `${GENERATE_WIRE_PDF}?currency=${currency}&amount=${amount}&wireDepositInfoId=${wireDepositInfoId}&timeZone=UTC`,
    {
      Authorization: bearer,
    }
  )
    .then((res) => {
      let status = res.info().status;
      if (status == 200) {
        let base64Str = res.base64();
        RNFetchBlob.fs
          .writeFile(pdfLocation, base64Str, 'base64')
          .then(() => android.actionViewIntent(pdfLocation, 'application/pdf'))
          .catch((err) => console.log('createFile', err));
      }
    })
    .catch((errorMessage) => {
      alert(errorMessage);
      console.log('errorMessage', errorMessage);
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
    headers: { requestName: 'generateCryptoAddress', toast: false },
  });
  if (data) return data.data;
};

export const cryptoWithdrawal = async (OTP, params) => {
  const data = await axios.post(
    CRYPTO_WITHDRAWAL,
    { ...params },
    {
      headers: { OTP, requestName: 'cryptoWithdrawal', toast: false },
    }
  );
  if (data) return data.status;
};

export const fetchWhitelist = async (currency) => {
  const data = await axios.get(CRYPTO_WHITELIST, {
    params: { currency },
  });
  if (data) return data.data;
};

export const addWhitelistAddress = async (OTP, params) => {
  const data = await axios.post(
    CRYPTO_WHITELIST,
    { ...params },
    {
      headers: { OTP, requestName: 'addWhitelistAddress', toast: false },
    }
  );
  if (data) return data.data;
};

export const editWhitelistAddress = async (id, name) => {
  const data = await axios({
    method: 'PUT',
    url: `${CRYPTO_WHITELIST}/${id}?name=${name}`,
    headers: { requestName: 'editWhitelistAddress', toast: false },
  });
  if (data) return data.status;
};

export const deleteWhitelistAddress = async (id, OTP) => {
  const data = await axios({
    method: 'DELETE',
    headers: { OTP, requestName: 'deleteWhitelistAddress', toast: false },
    url: `${CRYPTO_WHITELIST}/${id}`,
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
    headers: { requestName: 'deleteTemplates', toast: false },
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
    { ...params },
    {
      headers: { OTP, requestName: 'wireWithdrawal', toast: false },
    }
  );
  if (data) return data.status;
};

export const cardWithdrawal = async (OTP, params) => {
  const data = await axios.post(
    CARD_WITHDRAWAL,
    { ...params },
    {
      headers: { OTP, requestName: 'cardWithdrawal', toast: false },
    }
  );
  if (data) return data.status;
};

export const maxWithdrawal = async (params) => {
  const data = await axios.get(MAX_WITHDRAWAL, {
    params,
  });
  if (data) return data.data;
};

export const cardDeposit = async (payload) => {
  const data = await axios.post(CARD_DEPOSIT, payload, {
    headers: { requestName: 'cardDeposit', toast: false },
  });
  if (data) return data.data;
};

export const addCard = async (payload) => {
  const data = await axios.post(ADD_CARD_URL, payload, {});
  if (data) return data.data;
};

export const deleteCard = async (cardId) => {
  const data = await axios.delete(DELETE_CARD_URL, {
    params: { cardId },
    headers: { requestName: 'deleteCard', toast: false },
  });
  if (data) return data.status;
};
