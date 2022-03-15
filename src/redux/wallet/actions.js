export const actionTypes = {
  SET_WALLET_TAB: 'SET_WALLET_TAB',
  SET_USD_BTC: 'SET_USD_BTC',
  SAVE_WIRE_DEPOSIT_INFO: 'SAVE_WIRE_DEPOSIT_INFO',

  // SAGAS
  WIRE_DEPOSIT_ACTION: 'WIRE_DEPOSIT_ACTION',
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

// SAGAS
export const wireDepositAction = (name, code, navigation) => ({
  type: actionTypes.WIRE_DEPOSIT_ACTION,
  name,
  code,
  navigation,
});
