export const actionTypes = {
  SET_WALLET_TAB: 'SET_WALLET_TAB',
  SET_USD_BTC: 'SET_USD_BTC',
};

export const setWalletTab = (walletTab) => ({
  type: actionTypes.SET_WALLET_TAB,
  walletTab,
});
export const setUsdBtcSwitch = (usdBtcSwitch) => ({
  type: actionTypes.SET_USD_BTC,
  usdBtcSwitch,
});
