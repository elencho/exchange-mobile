export const actionTypes = {
  SET_WALLET_TAB: 'SET_WALLET_TAB',
  SET_USD_BTC: 'SET_USD_BTC',
  SAVE_WIRE_DEPOSIT_INFO: 'SAVE_WIRE_DEPOSIT_INFO',
  SAVE_CRYPTO_ADDRESSES: 'SAVE_CRYPTO_ADDRESSES',
  SET_NETWORK: 'SET_NETWORK',

  // SAGAS
  WIRE_DEPOSIT_ACTION: 'WIRE_DEPOSIT_ACTION',
  CRYPTO_ADDRESSES_ACTION: 'CRYPTO_ADDRESSES_ACTION',
  GO_TO_BALANCE: 'GO_TO_BALANCE',
  GENERATE_CRYPTO_ADDRESS: 'GENERATE_CRYPTO_ADDRESS',
};

export const setWalletTab = (walletTab) => ({
  type: actionTypes.SET_WALLET_TAB,
  walletTab,
});
export const setUsdBtcSwitch = (usdBtcSwitch) => ({
  type: actionTypes.SET_USD_BTC,
  usdBtcSwitch,
});
export const saveWireDepositInfo = (wireDepositInfo) => ({
  type: actionTypes.SAVE_WIRE_DEPOSIT_INFO,
  wireDepositInfo,
});
export const saveCryptoAddresses = (cryptoAddresses) => ({
  type: actionTypes.SAVE_CRYPTO_ADDRESSES,
  cryptoAddresses,
});
export const setNetwork = (network) => ({
  type: actionTypes.SET_NETWORK,
  network,
});

// SAGAS
export const wireDepositAction = (name, code, navigation) => ({
  type: actionTypes.WIRE_DEPOSIT_ACTION,
  name,
  code,
  navigation,
});
export const goToBalanceAction = (name, code, navigation) => ({
  type: actionTypes.GO_TO_BALANCE,
  name,
  code,
  navigation,
});
export const cryptoAddressesAction = (name, code, navigation, network) => ({
  type: actionTypes.CRYPTO_ADDRESSES_ACTION,
  name,
  code,
  navigation,
  network,
});
export const generateCryptoAddressAction = (code, network) => ({
  type: actionTypes.GENERATE_CRYPTO_ADDRESS,
  code,
  network,
});
