export const actionTypes = {
  SET_WALLET_TAB: 'SET_WALLET_TAB',
  SET_NETWORK: 'SET_NETWORK',
  SET_HAS_MULTIPLE_NETWORKS: 'SET_HAS_MULTIPLE_NETWORKS',
  SET_HAS_MULTIPLE_METHODS: 'SET_HAS_MULTIPLE_METHODS',
  SET_DEPOSIT_RESTRICTION: 'SET_DEPOSIT_RESTRICTION',
  SET_WITHDRAWAL_RESTRICTION: 'SET_WITHDRAWAL_RESTRICTION',
  SET_USD_BTC: 'SET_USD_BTC',

  // DEPOSIT
  SAVE_WIRE_DEPOSIT_INFO: 'SAVE_WIRE_DEPOSIT_INFO',
  SAVE_CRYPTO_ADDRESSES: 'SAVE_CRYPTO_ADDRESSES',

  // Withdrawal
  SET_WITHDRAWAL_AMOUNT: 'SET_WITHDRAWAL_AMOUNT',
  SET_WITHDRAWAL_NOTE: 'SET_WITHDRAWAL_NOTE',
  SAVE_TEMPLATES: 'SAVE_TEMPLATES',
  SET_CURRENT_TEMPLATE: 'SET_CURRENT_TEMPLATE',
  SAVE_BANKS: 'SAVE_BANKS',
  SET_WITHDRAWAL_BANK: 'SET_WITHDRAWAL_BANK',
  SET_IBAN: 'SET_IBAN',
  SAVE_TEMPLATE: 'SAVE_TEMPLATE',
  NEW_TEMPLATE_NAME: 'NEW_TEMPLATE_NAME',
  SET_RECEIVER_BANK: 'SET_RECEIVER_BANK',
  SET_INTERMEDIATE_BANK: 'SET_INTERMEDIATE_BANK',

  // WHITELIST
  SAVE_WHITELIST: 'SAVE_WHITELIST',
  SET_HAS_WHITELIST: 'SET_HAS_WHITELIST',
  CHOOSE_WHITELIST: 'CHOOSE_WHITELIST',
  SET_NEW_WHITELIST: 'SET_NEW_WHITELIST',

  // SAGAS
  WIRE_DEPOSIT_ACTION: 'WIRE_DEPOSIT_ACTION',
  CRYPTO_ADDRESSES_ACTION: 'CRYPTO_ADDRESSES_ACTION',
  GO_TO_BALANCE: 'GO_TO_BALANCE',
  GENERATE_CRYPTO_ADDRESS: 'GENERATE_CRYPTO_ADDRESS',
  CRYPTO_WITHDRAWAL_ACTION: 'CRYPTO_WITHDRAWAL_ACTION',
  GET_WHITELIST_ACTION: 'GET_WHITELIST_ACTION',
  ADD_WHITELIST_ACTION: 'ADD_WHITELIST_ACTION',
  EDIT_WHITELIST_ACTION: 'EDIT_WHITELIST_ACTION',
  DELETE_WHITELIST_ACTION: 'DELETE_WHITELIST_ACTION',
  FECTH_TEMPLATES_ACTION: 'FECTH_TEMPLATES_ACTION',
  WIRE_WITHDRAWAL_SAGA: 'WIRE_WITHDRAWAL_SAGA',
  DELETE_TEMPLATES_ACTION: 'DELETE_TEMPLATES_ACTION',
};

export const setWalletTab = (walletTab) => ({
  type: actionTypes.SET_WALLET_TAB,
  walletTab,
});
export const setUsdBtcSwitch = (usdBtcSwitch) => ({
  type: actionTypes.SET_USD_BTC,
  usdBtcSwitch,
});
export const setNetwork = (network) => ({
  type: actionTypes.SET_NETWORK,
  network,
});
export const setHasMultipleNetworks = (hasMultipleNetworks) => ({
  type: actionTypes.SET_HAS_MULTIPLE_NETWORKS,
  hasMultipleNetworks,
});
export const setHasMultipleMethods = (hasMultipleMethods) => ({
  type: actionTypes.SET_HAS_MULTIPLE_METHODS,
  hasMultipleMethods,
});
export const setDepositRestriction = (depositRestriction) => ({
  type: actionTypes.SET_DEPOSIT_RESTRICTION,
  depositRestriction,
});
export const setWithdrawalRestriction = (withdrawalRestriction) => ({
  type: actionTypes.SET_WITHDRAWAL_RESTRICTION,
  withdrawalRestriction,
});

// DEPOSIT
export const saveWireDepositInfo = (wireDepositInfo) => ({
  type: actionTypes.SAVE_WIRE_DEPOSIT_INFO,
  wireDepositInfo,
});
export const saveCryptoAddresses = (cryptoAddresses) => ({
  type: actionTypes.SAVE_CRYPTO_ADDRESSES,
  cryptoAddresses,
});

//WITHDRAWAL
export const setWithdrawalAmount = (withdrawalAmount) => ({
  type: actionTypes.SET_WITHDRAWAL_AMOUNT,
  withdrawalAmount,
});
export const setWithdrawalNote = (withdrawalNote) => ({
  type: actionTypes.SET_WITHDRAWAL_NOTE,
  withdrawalNote,
});
export const saveTemplates = (templates) => ({
  type: actionTypes.SAVE_TEMPLATES,
  templates,
});
export const chooseTemplate = (currentTemplate) => ({
  type: actionTypes.SET_CURRENT_TEMPLATE,
  currentTemplate,
});
export const saveBanks = (banks) => ({
  type: actionTypes.SAVE_BANKS,
  banks,
});
export const setWithdrawalBank = (withdrawalBank) => ({
  type: actionTypes.SET_WITHDRAWAL_BANK,
  withdrawalBank,
});
export const setIban = (iban) => ({
  type: actionTypes.SET_IBAN,
  iban,
});
export const saveTemplateAction = (saveTemplate) => ({
  type: actionTypes.SAVE_TEMPLATE,
  saveTemplate,
});
export const setNewTemplateName = (newTemplateName) => ({
  type: actionTypes.NEW_TEMPLATE_NAME,
  newTemplateName,
});
export const setReceiverBank = (receiverBank) => ({
  type: actionTypes.SET_RECEIVER_BANK,
  receiverBank,
});
export const setIntermediateBank = (intermediateBank) => ({
  type: actionTypes.SET_INTERMEDIATE_BANK,
  intermediateBank,
});

// WHITELIST
export const saveWhitelist = (whitelist) => ({
  type: actionTypes.SAVE_WHITELIST,
  whitelist,
});
export const setHasWhitelist = (hasWhitelist) => ({
  type: actionTypes.SET_HAS_WHITELIST,
  hasWhitelist,
});
export const chooseWhitelist = (currentWhitelistObj) => ({
  type: actionTypes.CHOOSE_WHITELIST,
  currentWhitelistObj,
});
export const setNewWhitelist = (newWhitelist) => ({
  type: actionTypes.SET_NEW_WHITELIST,
  newWhitelist,
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
export const cryptoWithdrawalAction = (OTP) => ({
  type: actionTypes.CRYPTO_WITHDRAWAL_ACTION,
  OTP,
});
export const getWhitelistAction = () => ({
  type: actionTypes.GET_WHITELIST_ACTION,
});
export const addWhitelistAction = (OTP) => ({
  type: actionTypes.ADD_WHITELIST_ACTION,
  OTP,
});
export const editWhitelistAction = () => ({
  type: actionTypes.EDIT_WHITELIST_ACTION,
});
export const deleteWhitelistAction = (OTP) => ({
  type: actionTypes.DELETE_WHITELIST_ACTION,
  OTP,
});
export const wireWithdrawalAction = (OTP) => ({
  type: actionTypes.WIRE_WITHDRAWAL_SAGA,
  OTP,
});
export const withdrawalTemplatesAction = () => ({
  type: actionTypes.FECTH_TEMPLATES_ACTION,
});
export const deleteTemplatesAction = (id) => ({
  type: actionTypes.DELETE_TEMPLATES_ACTION,
  id,
});
