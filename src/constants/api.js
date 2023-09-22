import Constants from 'expo-constants';

const auth = Constants.manifest.extra.auth;
const core = Constants.manifest.extra.core;

export const READINESS_URL = `${core}/health/readiness`;

export const LOGIN_START_URL = `${auth}/auth/realms/GEX/protocol/openid-connect/auth`;

export const REGISTRATION_START_URL = `${auth}/auth/realms/GEX/protocol/openid-connect/registrations`;

export const REGISTRATION_FORM = `${auth}/auth/realms/GEX/login-actions/registration`;

export const EMAIL_VERIFY_REGISTER = `${auth}/auth/realms/GEX/login-actions/action-token`;

export const CODE_TO_TOKEN = `${auth}/auth/realms/GEX/protocol/openid-connect/token`;

export const LOGOUT = `${auth}/auth/realms/GEX/protocol/openid-connect/logout`;

export const TRANSACTIONS_URL = `${core}/private/account/fetchTransactions`;

export const CURRENCIES_URL = `${core}/public/currencies`;

export const COUNTRIES_URL = `${core}/public/countries`;

export const TRADES_URL = `${core}/private/simpleTrade/trades`;

export const TRADES_URL_PAGED = `${core}/private/simpleTrade/fetchTrades`;

export const OFFERS_URL = `${core}/private/simpleTrade/offers`;

export const BALANCE_URL = `${core}/private/account/balance`;

export const CARDS_URL = `${core}/private/account/cards`;

export const CALCULATE_FEE_URL = `${core}/private/account/calculateFee`;

export const USER_INFO_URL = `${core}/private/account/userInfo`;

export const SUBSCRIBE_EMAIL_URL = `${core}/private/account/subscribeToEmailUpdates`;

export const UNSUBSCRIBE_EMAIL_URL = `${core}/private/account/unsubscribeFromEmailUpdates`;

export const UPDATE_USER_DATA = `${core}/private/users/updateUserData`;

export const UPDATE_PASSWORD = `${auth}/auth/realms/GEX/GEX-resource/updatePassword`;

export const VERIFY_PHONE_NUMBER = `${auth}/auth/realms/GEX/GEX-resource/verifyPhoneNumber`;

export const UPDATE_PHONE_NUMBER = `${auth}/auth/realms/GEX/GEX-resource/updatePhoneNumber`;

export const GO_TO_EXCHANGE = `${auth}/auth/realms/GEX/GEX-resource/getLoginActionLink`;

export const SEND_OTP = `${auth}/auth/realms/GEX/GEX-resource/sendOTP`;

export const OTP_CHANGE_TOKEN = `${auth}/auth/realms/GEX/GEX-resource/getOTPChangeParams`;

export const EMAIL_VERIFICATION = `${auth}/auth/realms/GEX/GEX-resource/sendEmailVerification`;

export const ACTIVATE_EMAIL_OTP = `${auth}/auth/realms/GEX/GEX-resource/enableEmailTwoFA`;

export const ACTIVATE_GOOGLE_OTP = `${auth}/auth/realms/GEX/GEX-resource/enableTotpTwoFA`;

export const WIRE_DEPOSIT = `${core}/private/account/wire/deposit`;

export const GENERATE_WIRE_PDF = `${core}/private/report/wire`;

export const GENERATE_TRANSACTIONS_FILE = `${core}/private/report/transactions/user`;

export const GET_CRYPTO_ADDRESSES = `${core}/private/account/deposit/crypto/getAddresses`;

export const GENERATE_CRYPTO_ADDRESS = `${core}/private/account/deposit/crypto`;

export const CRYPTO_WITHDRAWAL = `${core}/private/account/withdraw/crypto`;

export const CRYPTO_WHITELIST = `${core}/private/whitelist`;

export const WITHDRAWAL_TEMPLATES = `${core}/private/wire-template`;

export const MAX_WITHDRAWAL = `${core}/private/account/calculateMaxWithdrawal`;

export const BANKS_URL = `${core}/private/account/banks`;

export const WIRE_WITHDRAWAL = `${core}/private/account/wire`;

export const CARD_WITHDRAWAL = `${core}/private/account/card/transaction/withdraw`;

export const CARD_DEPOSIT = `${core}/private/account/card/transaction/deposit`;

export const ADD_CARD_URL = `${core}/private/account/card/addNewCard`;

export const DELETE_CARD_URL = `${core}/private/account/card/deleteCard`;

export const DICTIONARY = `${core}/public/dictionary`;

export const VERIFICATION_TOKEN = `${core}/private/users/verificationToken`;

export const CARD_VERIFICATION_TOKEN = `${core}/private/users/cardVerificationToken`;

export const COINS_URL_PNG = `https://static.cryptal.com/icons/png/coins/36x36`;

export const COINS_URL_SVG = `https://static.cryptal.com/icons/svg/coins`;

export const COUNTRIES_URL_PNG = `https://static.cryptal.com/icons/png/countries`;

export const COUNTRIES_URL_SVG = `https://static.cryptal.com/icons/svg/countries`;

export const ICONS_URL_PNG = `https://static.cryptal.com/icons/png`;
