import { actionTypes } from './actions';

const INITIAL_STATE = {
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
  bankFeesModalVisible: false,

  // User Profile
  personalInfoModalVisible: false,
  passwordModalVisible: false,
  phoneNumberModalVisible: false,
  countriesModalVisible: false,
  // security
  googleAuthModalVisible: false,
  smsAuthModalVisible: false,
  emailAuthModalVisible: false,
  googleOtpModalVisible: false,

  // WALLET
  chooseNetworkModalVisible: false,
  generateRequestModalVisible: false,
  chooseAddressModalVisible: false,
  whitelistActionsModalVisible: false,
  addWhitelistModalVisble: false,
  editWhitelistModalVisble: false,
  addDepositAddressModalVisble: false,
  transferMethodModalVisible: false,
  templatesModalVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  const {
    datePickerVisible,
    chooseCurrencyModalVisible,
    buySellModalVisible,
    transactionDetailsVisible,
    infoVisible,
    chooseCardModalVisible,
    chooseBankModalVisible,
    bankFeesModalVisible,
    cryptoModalVisible,
    fiatModalVisible,
    personalInfoModalVisible,
    passwordModalVisible,
    phoneNumberModalVisible,
    googleAuthModalVisible,
    countriesModalVisible,
    smsAuthModalVisible,
    googleOtpModalVisible,
    emailAuthModalVisible,
    chooseNetworkModalVisible,
    generateRequestModalVisible,
    chooseAddressModalVisible,
    whitelistActionsModalVisible,
    addWhitelistModalVisble,
    addDepositAddressModalVisble,
    editWhitelistModalVisble,
    transferMethodModalVisible,
    templatesModalVisible,
  } = action;
  switch (action.type) {
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
    case actionTypes.BANK_FEES_MODAL:
      return {
        ...state,
        bankFeesModalVisible,
      };
    case actionTypes.PERONAL_INFO_MODAL:
      return {
        ...state,
        personalInfoModalVisible,
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
    case actionTypes.ADD_DEPOSIT_ADDRESS_MODAL:
      return {
        ...state,
        addDepositAddressModalVisble,
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
    default:
      return state;
  }
};
