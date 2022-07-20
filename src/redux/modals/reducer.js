import { actionTypes } from './actions';

const INITIAL_STATE = {
  toastObj: {},
  appToastVisible: false,

  // Login
  login2FaModalVisible: false,

  // Register
  emailVerificationModalVisible: false,

  // Transactions
  datePickerVisible: { to: false, from: false },
  chooseCurrencyModalVisible: false,
  transactionDetailsVisible: false, // Both transactions and trades

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
  // security
  googleAuthModalVisible: false,
  smsAuthModalVisible: false,
  emailAuthModalVisible: false,
  googleOtpModalVisible: false,

  // WALLET
  chooseNetworkModalVisible: false,
  generateRequestModalVisible: false,
  qrAddressModalVisible: false,
  chooseAddressModalVisible: false,
  whitelistActionsModalVisible: false,
  addWhitelistModalVisble: false,
  editWhitelistModalVisble: false,
  transferMethodModalVisible: false,
  templatesModalVisible: false,
  addCardModalVisible: false,
  cardAddStatusModalInfo: {},
  cardDeleteModalInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  const {
    datePickerVisible,
    appToastVisible,
    chooseCurrencyModalVisible,
    buySellModalVisible,
    transactionDetailsVisible,
    infoVisible,
    chooseCardModalVisible,
    qrAddressModalVisible,
    chooseBankModalVisible,
    bankFeesModalVisible,
    cryptoModalVisible,
    fiatModalVisible,
    cardAddStatusModalInfo,
    cardDeleteModalInfo,
    personalInfoModalVisible,
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
    login2FaModalVisible,
    addCardModalVisible,
    languageModalVisible,
    emailVerificationModalVisible,
    toastObj,
  } = action;
  switch (action.type) {
    case actionTypes.SET_TOAST_OBJ:
      return {
        ...state,
        toastObj,
      };
    case actionTypes.TOGGLE_APP_TOAST:
      return {
        ...state,
        appToastVisible,
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
    case actionTypes.CARD_ADD_STATUS_MODAL_INFO:
      return {
        ...state,
        cardAddStatusModalInfo,
      };
    case actionTypes.CARD_DELETE_MODAL_INFO:
      return {
        ...state,
        cardDeleteModalInfo,
      };
    case actionTypes.PERONAL_INFO_MODAL:
      return {
        ...state,
        personalInfoModalVisible,
      };
    case actionTypes.EMAIL_VERIFICATION_MODAL:
      return {
        ...state,
        emailVerificationModalVisible,
      };
    case actionTypes.TOGGLE_LANGUAGE_MODAL:
      return {
        ...state,
        languageModalVisible,
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
    case actionTypes.LOGIN_TWO_FA_MODAL:
      return {
        ...state,
        login2FaModalVisible,
      };
    case actionTypes.TOGGLE_ADD_CARD_MODAL:
      return {
        ...state,
        addCardModalVisible,
      };
    default:
      return state;
  }
};
