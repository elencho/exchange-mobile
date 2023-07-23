export const actionTypes = {
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',
  CHOOSE_CURRENCY_MODAL_VISIBLE: 'CHOOSE_CURRENCY_MODAL_VISIBLE',
  TRANSACTION_DETAILS_MODAL: 'TRANSACTION_DETAILS_MODAL',
  BUY_SELL_MODAL_VISIBLE: 'BUY_SELL_MODAL_VISIBLE',
  INSTANT_TRADE_INFO: 'INSTANT_TRADE_INFO',
  CHOOSE_CARD_MODAL: 'CHOOSE_CARD_MODAL',
  CHOOSE_BANK_MODAL: 'CHOOSE_BANK_MODAL',
  WIRE_BANK_MODAL: 'WIRE_BANK_MODAL',
  BANK_FEES_MODAL: 'BANK_FEES_MODAL',
  FIAT_MODAL_VISIBLE: 'FIAT_MODAL_VISIBLE',
  CRYPTO_MODAL_VISIBLE: 'CRYPTO_MODAL_VISIBLE',
  RESET_STATE: 'RESET_STATE',
  PERONAL_INFO_MODAL: 'PERONAL_INFO_MODAL',
  PASSWORD_MODAL: 'PASSWORD_MODAL',
  PHONE_NUMBER_MODAL: 'PHONE_NUMBER_MODAL',
  TOGGLE_LANGUAGE_MODAL: 'TOGGLE_LANGUAGE_MODAL',
  OPEN_COMPANY_INFO_MODAL: 'OPEN_COMPANY_INFO_MODAL',
  CLOSE_COMPANY_INFO_MODAL: 'CLOSE_COMPANY_INFO_MODAL',
  GOOGLE_AUTH_MODAL: 'GOOGLE_AUTH_MODAL',
  COUNTRIES_MODAL: 'COUNTRIES_MODAL',
  SMS_AUTH_MODAL: 'SMS_AUTH_MODAL',
  EMAIL_AUTH_MODAL: 'EMAIL_AUTH_MODAL',
  GOOGLE_OTP_MODAL: 'GOOGLE_OTP_MODAL',
  WEB_VIEW_VISIBLE: 'WEB_VIEW_VISIBLE',

  CHOOSE_NETWORK_MODAL: 'CHOOSE_NETWORK_MODAL',
  GENERATE_REQUEST_MODAL: 'GENERATE_REQUEST_MODAL',
  QR_ADDRESS_MODAL: 'QR_ADDRESS_MODAL',
  QR_SCANNER_MODAL: 'QR_SCANNER_MODAL',
  CHOOSE_ADDRESS_MODAL: 'CHOOSE_ADDRESS_MODAL',
  WHITELIST_ACTIONS_MODAL: 'WHITELIST_ACTIONS_MODAL',
  ADD_WHITELIST_MODAL: 'ADD_WHITELIST_MODAL',
  EDIT_WHITELIST_MODAL: 'EDIT_WHITELIST_MODAL',
  TOGGLE_TRANSFER_METHOD_MODAL: 'TOGGLE_TRANSFER_METHOD_MODAL',
  TEMPLATES_MODAL: 'TEMPLATES_MODAL',
  TOGGLE_ADD_CARD_MODAL: 'TOGGLE_ADD_CARD_MODAL',
  SET_STATUS_MODAL_INFO: 'SET_STATUS_MODAL_INFO',
  DELETE_MODAL_INFO: 'DELETE_MODAL_INFO',
  GRANT_CAMERA_PERMISSION: 'GRANT_CAMERA_PERMISSION',

  SET_APP_TOAST: 'SET_APP_TOAST',
  SET_TOAST_OBJ: 'SET_TOAST_OBJ',
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
export const toggleWebViewVisible = (webViewVisible) => ({
  type: actionTypes.WEB_VIEW_VISIBLE,
  webViewVisible,
});
export const toggleChooseCardModal = (chooseCardModalVisible) => ({
  type: actionTypes.CHOOSE_CARD_MODAL,
  chooseCardModalVisible,
});
export const toggleChooseBankModal = (chooseBankModalVisible) => ({
  type: actionTypes.CHOOSE_BANK_MODAL,
  chooseBankModalVisible,
});
export const toggleWireBanksModal = (wireBanksModalVisible) => ({
  type: actionTypes.WIRE_BANK_MODAL,
  wireBanksModalVisible,
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
export const toggleLanguageModal = (languageModalVisible) => ({
  type: actionTypes.TOGGLE_LANGUAGE_MODAL,
  languageModalVisible,
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
export const openCompanyInfoModal = (
  companyInfoModalHeader,
  companyInfoModalDescription,
  companyInfoModalLink,
  companyInfoModalButton
) => ({
  type: actionTypes.OPEN_COMPANY_INFO_MODAL,
  companyInfoModalHeader,
  companyInfoModalDescription,
  companyInfoModalLink,
  companyInfoModalButton,
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
export const toggleQrAddressModal = (qrAddressModalVisible) => ({
  type: actionTypes.QR_ADDRESS_MODAL,
  qrAddressModalVisible,
});
export const toggleQrScannerModal = (qrScannerModalVisible) => ({
  type: actionTypes.QR_SCANNER_MODAL,
  qrScannerModalVisible,
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
export const toggleAddCardModal = (addCardModalVisible) => ({
  type: actionTypes.TOGGLE_ADD_CARD_MODAL,
  addCardModalVisible,
});
export const setStatusModalInfo = (statusModalInfo) => ({
  type: actionTypes.SET_STATUS_MODAL_INFO,
  statusModalInfo,
});
export const setDeleteModalInfo = (deleteModalInfo) => ({
  type: actionTypes.DELETE_MODAL_INFO,
  deleteModalInfo,
});

export const setAppToast = (appToastObj) => ({
  type: actionTypes.SET_APP_TOAST,
  appToastObj,
});
export const setToastObj = (toastObj) => ({
  type: actionTypes.SET_TOAST_OBJ,
  toastObj,
});
export const grantCameraPermission = (hasCameraPermission) => ({
  type: actionTypes.GRANT_CAMERA_PERMISSION,
  hasCameraPermission,
});
