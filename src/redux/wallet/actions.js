export const actionTypes = {
  SET_WALLET_TAB: 'SET_WALLET_TAB',
};

export const setWalletTab = (walletTab) => ({
  type: actionTypes.SET_WALLET_TAB,
  walletTab,
});
