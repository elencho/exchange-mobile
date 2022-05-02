export const actionTypes = {
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',
  CHOOSE_CURRENCY_MODAL_VISIBLE: 'CHOOSE_CURRENCY_MODAL_VISIBLE',
  TRANSACTION_DETAILS_MODAL: 'TRANSACTION_DETAILS_MODAL',
  BUY_SELL_MODAL_VISIBLE: 'BUY_SELL_MODAL_VISIBLE',
  INSTANT_TRADE_INFO: 'INSTANT_TRADE_INFO',
  CHOOSE_CARD_MODAL: 'CHOOSE_CARD_MODAL',
  CHOOSE_BANK_MODAL: 'CHOOSE_BANK_MODAL',
  BANK_FEES_MODAL: 'BANK_FEES_MODAL',
  FIAT_MODAL_VISIBLE: 'FIAT_MODAL_VISIBLE',
  CRYPTO_MODAL_VISIBLE: 'CRYPTO_MODAL_VISIBLE',

  PERONAL_INFO_MODAL: 'PERONAL_INFO_MODAL',
  PASSWORD_MODAL: 'PASSWORD_MODAL',
  PHONE_NUMBER_MODAL: 'PHONE_NUMBER_MODAL',
  GOOGLE_AUTH_MODAL: 'GOOGLE_AUTH_MODAL',
  COUNTRIES_MODAL: 'COUNTRIES_MODAL',
  SMS_AUTH_MODAL: 'SMS_AUTH_MODAL',
  EMAIL_AUTH_MODAL: 'EMAIL_AUTH_MODAL',
  GOOGLE_OTP_MODAL: 'GOOGLE_OTP_MODAL',

  CHOOSE_NETWORK_MODAL: 'CHOOSE_NETWORK_MODAL',
  GENERATE_REQUEST_MODAL: 'GENERATE_REQUEST_MODAL',
  CHOOSE_ADDRESS_MODAL: 'CHOOSE_ADDRESS_MODAL',
  WHITELIST_ACTIONS_MODAL: 'WHITELIST_ACTIONS_MODAL',
  ADD_WHITELIST_MODAL: 'ADD_WHITELIST_MODAL',
  EDIT_WHITELIST_MODAL: 'EDIT_WHITELIST_MODAL',
  TOGGLE_TRANSFER_METHOD_MODAL: 'TOGGLE_TRANSFER_METHOD_MODAL',
  TEMPLATES_MODAL: 'TEMPLATES_MODAL',

  LOGIN_TWO_FA_MODAL: 'LOGIN_TWO_FA_MODAL',
};

export const toggleDatePicker = (datePickerVisible) => ({
  type: actionTypes.TOGGLE_DATEPICKER,
  datePickerVisible,
});
export const toggleCurrencyModal = (chooseCurrencyModalVisible) => ({
  type: actionTypes.CHOOSE_CURRENCY_MODAL_VISIBLE,
  chooseCurrencyModalVisible,
});
export const toggleTransactionDetails = (transactionDetailsVisible) => ({
  type: actionTypes.TRANSACTION_DETAILS_MODAL,
  transactionDetailsVisible,
});
export const toggleBuySellModal = (buySellModalVisible) => ({
  type: actionTypes.BUY_SELL_MODAL_VISIBLE,
  buySellModalVisible,
});
export const toggleCryptoModal = (cryptoModalVisible) => ({
  type: actionTypes.CRYPTO_MODAL_VISIBLE,
  cryptoModalVisible,
});
export const toggleFiatModal = (fiatModalVisible) => ({
  type: actionTypes.FIAT_MODAL_VISIBLE,
  fiatModalVisible,
});
export const toggleInfoModal = (infoVisible) => ({
  type: actionTypes.INSTANT_TRADE_INFO,
  infoVisible,
});
export const toggleChooseCardModal = (chooseCardModalVisible) => ({
  type: actionTypes.CHOOSE_CARD_MODAL,
  chooseCardModalVisible,
});
export const toggleChooseBankModal = (chooseBankModalVisible) => ({
  type: actionTypes.CHOOSE_BANK_MODAL,
  chooseBankModalVisible,
});
export const toggleBankFeesModal = (bankFeesModalVisible) => ({
  type: actionTypes.BANK_FEES_MODAL,
  bankFeesModalVisible,
});

// USER PROFILE
export const togglePersonalInfoModal = (personalInfoModalVisible) => ({
  type: actionTypes.PERONAL_INFO_MODAL,
  personalInfoModalVisible,
});
export const togglePasswordModal = (passwordModalVisible) => ({
  type: actionTypes.PASSWORD_MODAL,
  passwordModalVisible,
});
export const togglePhoneNumberModal = (phoneNumberModalVisible) => ({
  type: actionTypes.PHONE_NUMBER_MODAL,
  phoneNumberModalVisible,
});
export const toggleGoogleAuthModal = (googleAuthModalVisible) => ({
  type: actionTypes.GOOGLE_AUTH_MODAL,
  googleAuthModalVisible,
});
export const toggleCountriesModal = (countriesModalVisible) => ({
  type: actionTypes.COUNTRIES_MODAL,
  countriesModalVisible,
});
export const toggleSmsAuthModal = (smsAuthModalVisible) => ({
  type: actionTypes.SMS_AUTH_MODAL,
  smsAuthModalVisible,
});
export const toggleEmailAuthModal = (emailAuthModalVisible) => ({
  type: actionTypes.EMAIL_AUTH_MODAL,
  emailAuthModalVisible,
});
export const toggleGoogleOtpModal = (googleOtpModalVisible) => ({
  type: actionTypes.GOOGLE_OTP_MODAL,
  googleOtpModalVisible,
});

// WALLET
export const toggleChooseNetworkModal = (chooseNetworkModalVisible) => ({
  type: actionTypes.CHOOSE_NETWORK_MODAL,
  chooseNetworkModalVisible,
});
export const toggleGenerateRequestModal = (generateRequestModalVisible) => ({
  type: actionTypes.GENERATE_REQUEST_MODAL,
  generateRequestModalVisible,
});
export const toggleChooseAddressModal = (chooseAddressModalVisible) => ({
  type: actionTypes.CHOOSE_ADDRESS_MODAL,
  chooseAddressModalVisible,
});
export const toggleWhitelistActionsModal = (whitelistActionsModalVisible) => ({
  type: actionTypes.WHITELIST_ACTIONS_MODAL,
  whitelistActionsModalVisible,
});
export const toggleAddWhitelistModal = (addWhitelistModalVisble) => ({
  type: actionTypes.ADD_WHITELIST_MODAL,
  addWhitelistModalVisble,
});
export const toggleEditWhitelistModal = (editWhitelistModalVisble) => ({
  type: actionTypes.EDIT_WHITELIST_MODAL,
  editWhitelistModalVisble,
});
export const toggleTransferMethodModal = (transferMethodModalVisible) => ({
  type: actionTypes.TOGGLE_TRANSFER_METHOD_MODAL,
  transferMethodModalVisible,
});
export const toggleTemplatesModal = (templatesModalVisible) => ({
  type: actionTypes.TEMPLATES_MODAL,
  templatesModalVisible,
});

// Login
export const toggleLogin2FaModal = (login2FaModalVisible) => ({
  type: actionTypes.LOGIN_TWO_FA_MODAL,
  login2FaModalVisible,
});
