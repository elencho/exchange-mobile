import { actionTypes } from './actions';

const INITIAL_STATE = {
  toastObj: {},
  appToastObj: null,
  isToast: true,
  webViewObj: null,

  // Login

  // Transactions
  datePickerVisible: { to: false, from: false },
  chooseCurrencyModalVisible: false,
  transactionDetailsVisible: false, // Both transactions and trades
  chooseMethodsModalVisible: false,

  // Instant Trade
  buySellModalVisible: false,
  cryptoModalVisible: false,
  fiatModalVisible: false,
  infoVisible: false,
  chooseCardModalVisible: false,
  chooseBankModalVisible: false,
  wireBanksModalVisible: false,
  bankFeesModalVisible: false,

  // User Profile
  personalInfoModalVisible: false,
  passwordModalVisible: false,
  phoneNumberModalVisible: false,
  languageModalVisible: false,
  countriesModalVisible: false,
  companyInfoModalVisible: false,
  identityModalVisible: false,
  // security
  googleAuthModalVisible: false,
  smsAuthModalVisible: false,
  emailAuthModalVisible: false,
  googleOtpModalVisible: false,
  hasCameraPermission: false,

  // WALLET
  chooseNetworkModalVisible: false,
  generateRequestModalVisible: false,
  qrAddressModalVisible: false,
  qrScannerModalVisible: false,
  chooseAddressModalVisible: false,
  withdrawalConfirmModalVisible: false,
  whitelistActionsModalVisible: false,
  addWhitelistModalVisble: false,
  editWhitelistModalVisble: false,
  transferMethodModalVisible: false,
  templatesModalVisible: false,
  addCardModalVisible: false,
  statusModalInfo: null,
  deleteModalInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  const {
    datePickerVisible,
    appToastObj,
    chooseCurrencyModalVisible,
    buySellModalVisible,
    transactionDetailsVisible,
    chooseMethodsModalVisible,
    infoVisible,
    chooseCardModalVisible,
    qrAddressModalVisible,
    qrScannerModalVisible,
    chooseBankModalVisible,
    bankFeesModalVisible,
    cryptoModalVisible,
    fiatModalVisible,
    statusModalInfo,
    deleteModalInfo,
    personalInfoModalVisible,
    withdrawalConfirmModalVisible,
    passwordModalVisible,
    phoneNumberModalVisible,
    googleAuthModalVisible,
    countriesModalVisible,
    smsAuthModalVisible,
    googleOtpModalVisible,
    wireBanksModalVisible,
    emailAuthModalVisible,
    chooseNetworkModalVisible,
    generateRequestModalVisible,
    chooseAddressModalVisible,
    whitelistActionsModalVisible,
    addWhitelistModalVisble,
    editWhitelistModalVisble,
    transferMethodModalVisible,
    templatesModalVisible,
    addCardModalVisible,
    languageModalVisible,
    toastObj,
    webViewObj,
    isToast,
    hasCameraPermission,
  } = action;
  switch (action.type) {
    case actionTypes.SET_TOAST_OBJ:
      return {
        ...state,
        toastObj,
      };
    case actionTypes.SET_APP_TOAST:
      return {
        ...state,
        appToastObj,
      };
    case actionTypes.TOGGLE_DATEPICKER:
      return {
        ...state,
        datePickerVisible,
      };
    case actionTypes.CHOOSE_CURRENCY_MODAL_VISIBLE:
      return {
        ...state,
        chooseCurrencyModalVisible,
      };
    case actionTypes.CHOOSE_METHODS_MODAL_VISIBLE:
      return {
        ...state,
        chooseMethodsModalVisible,
      };
    case actionTypes.TRANSACTION_DETAILS_MODAL:
      return {
        ...state,
        transactionDetailsVisible,
      };
    case actionTypes.BUY_SELL_MODAL_VISIBLE:
      return {
        ...state,
        buySellModalVisible,
      };
    case actionTypes.CRYPTO_MODAL_VISIBLE:
      return {
        ...state,
        cryptoModalVisible,
      };
    case actionTypes.FIAT_MODAL_VISIBLE:
      return {
        ...state,
        fiatModalVisible,
      };
    case actionTypes.INSTANT_TRADE_INFO:
      return {
        ...state,
        infoVisible,
      };
    case actionTypes.CHOOSE_CARD_MODAL:
      return {
        ...state,
        chooseCardModalVisible,
      };
    case actionTypes.CHOOSE_BANK_MODAL:
      return {
        ...state,
        chooseBankModalVisible,
      };
    case actionTypes.WIRE_BANK_MODAL:
      return {
        ...state,
        wireBanksModalVisible,
      };
    case actionTypes.BANK_FEES_MODAL:
      return {
        ...state,
        bankFeesModalVisible,
      };
    case 'SET_IS_TOAST':
      return {
        ...state,
        isToast,
      };
    case actionTypes.SET_STATUS_MODAL_INFO:
      return {
        ...state,
        statusModalInfo,
      };
    case 'TOGGLE_WITHDRAWAL_CONFIRM_MODAL':
      return {
        ...state,
        withdrawalConfirmModalVisible,
      };
    case actionTypes.DELETE_MODAL_INFO:
      return {
        ...state,
        deleteModalInfo,
      };
    case actionTypes.PERONAL_INFO_MODAL:
      return {
        ...state,
        personalInfoModalVisible,
      };

    case actionTypes.TOGGLE_LANGUAGE_MODAL:
      return {
        ...state,
        languageModalVisible,
      };
    case 'TOGGLE_COMPANY_INFO_MODAL':
      return {
        ...state,
        companyInfoModalVisible: !state.companyInfoModalVisible,
      };
    case 'TOGGLE_IDENTITY_MODAL':
      return {
        ...state,
        identityModalVisible: !state.identityModalVisible,
      };
    case actionTypes.PASSWORD_MODAL:
      return {
        ...state,
        passwordModalVisible,
      };
    case actionTypes.PHONE_NUMBER_MODAL:
      return {
        ...state,
        phoneNumberModalVisible,
      };
    case actionTypes.GOOGLE_AUTH_MODAL:
      return {
        ...state,
        googleAuthModalVisible,
      };
    case actionTypes.COUNTRIES_MODAL:
      return {
        ...state,
        countriesModalVisible,
      };
    case actionTypes.QR_ADDRESS_MODAL:
      return {
        ...state,
        qrAddressModalVisible,
      };
    case actionTypes.SMS_AUTH_MODAL:
      return {
        ...state,
        smsAuthModalVisible,
      };
    case actionTypes.EMAIL_AUTH_MODAL:
      return {
        ...state,
        emailAuthModalVisible,
      };
    case actionTypes.GOOGLE_OTP_MODAL:
      return {
        ...state,
        googleOtpModalVisible,
      };
    case actionTypes.CHOOSE_NETWORK_MODAL:
      return {
        ...state,
        chooseNetworkModalVisible,
      };
    case actionTypes.GENERATE_REQUEST_MODAL:
      return {
        ...state,
        generateRequestModalVisible,
      };
    case actionTypes.CHOOSE_ADDRESS_MODAL:
      return {
        ...state,
        chooseAddressModalVisible,
      };
    case actionTypes.WHITELIST_ACTIONS_MODAL:
      return {
        ...state,
        whitelistActionsModalVisible,
      };
    case actionTypes.ADD_WHITELIST_MODAL:
      return {
        ...state,
        addWhitelistModalVisble,
      };
    case actionTypes.EDIT_WHITELIST_MODAL:
      return {
        ...state,
        editWhitelistModalVisble,
      };
    case actionTypes.TOGGLE_TRANSFER_METHOD_MODAL:
      return {
        ...state,
        transferMethodModalVisible,
      };
    case actionTypes.TEMPLATES_MODAL:
      return {
        ...state,
        templatesModalVisible,
      };
    case actionTypes.TOGGLE_ADD_CARD_MODAL:
      return {
        ...state,
        addCardModalVisible,
      };
    case actionTypes.QR_SCANNER_MODAL:
      return {
        ...state,
        qrScannerModalVisible,
      };
    case 'SET_APP_WEBVIEW_OBJ':
      return {
        ...state,
        webViewObj,
      };
    case 'RESET_APP_WEBVIEW_OBJ':
      return {
        ...state,
        webViewObj: INITIAL_STATE.webViewObj,
      };
    case actionTypes.GRANT_CAMERA_PERMISSION:
      return {
        ...state,
        hasCameraPermission,
      };
    default:
      return state;
  }
};
