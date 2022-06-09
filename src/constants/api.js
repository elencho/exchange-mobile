import Constants from 'expo-constants';

const auth = Constants.manifest.extra.auth;
const core = Constants.manifest.extra.core;

export const LOGIN_START_URL = `${auth}/auth/realms/GEX/protocol/openid-connect/auth`;

export const REGISTRATION_START_URL = `${auth}/auth/realms/GEX/protocol/openid-connect/registrations`;

export const REGISTRATION_FORM = `${auth}/auth/realms/GEX/login-actions/registration`;

export const EMAIL_VERIFY_REGISTER = `${auth}/auth/realms/GEX/login-actions/action-token`;

export const CODE_TO_TOKEN = `${auth}/auth/realms/GEX/protocol/openid-connect/token`;

export const LOGOUT = `${auth}/auth/realms/GEX/protocol/openid-connect/logout`;

export const TRANSACTIONS_URL = `${core}/exchange/api/v1/mobile/private/account/transactions`;

export const CURRENCIES_URL = `${core}/exchange/api/v1/mobile/public/currencies`;

export const COUNTRIES_URL = `${core}/exchange/api/v1/public/countries`;

export const TRADES_URL = `${core}/exchange/api/v1/mobile/private/simpleTrade/trades`;

export const OFFERS_URL = `${core}/exchange/api/v1/mobile/private/simpleTrade/offers`;

export const BALANCE_URL = `${core}/exchange/api/v1/mobile/private/account/balance`;

export const CARDS_URL = `${core}/exchange/api/v1/mobile/private/account/cards`;

export const CALCULATE_FEE_URL = `${core}/exchange/api/v1/private/account/calculateFee`;

export const USER_INFO_URL = `${core}/exchange/api/v1/private/account/userInfo`;

export const SUBSCRIBE_EMAIL_URL = `${core}/exchange/api/v1/private/account/subscribeToEmailUpdates`;

export const UNSUBSCRIBE_EMAIL_URL = `${core}/exchange/api/v1/private/account/unsubscribeFromEmailUpdates`;

export const UPDATE_USER_DATA = `${core}/exchange/api/v1/private/users/updateUserData`;

export const UPDATE_PASSWORD = `${auth}/auth/realms/GEX/GEX-resource/updatePassword`;

export const VERIFY_PHONE_NUMBER = `${auth}/auth/realms/GEX/GEX-resource/verifyPhoneNumber`;

export const UPDATE_PHONE_NUMBER = `${auth}/auth/realms/GEX/GEX-resource/updatePhoneNumber`;

export const SEND_OTP = `${auth}/auth/realms/GEX/GEX-resource/sendOTP`;

export const OTP_CHANGE_TOKEN = `${auth}/auth/realms/GEX/GEX-resource/getOTPChangeParams`;

export const EMAIL_VERIFICATION = `${auth}/auth/realms/GEX/GEX-resource/sendEmailVerification`;

export const ACTIVATE_EMAIL_OTP = `${auth}/auth/realms/GEX/GEX-resource/enableEmailTwoFA`;

export const ACTIVATE_GOOGLE_OTP = `${auth}/auth/realms/GEX/GEX-resource/enableTotpTwoFA`;

export const WIRE_DEPOSIT = `${core}/exchange/api/v1/mobile/private/account/wire/deposit`;

export const GENERATE_WIRE_PDF = `${core}/exchange/api/v1/mobile/private/report/wire`;

export const GET_CRYPTO_ADDRESSES = `${core}/exchange/api/v1/mobile/private/account/deposit/crypto/getAddresses`;

export const GENERATE_CRYPTO_ADDRESS = `${core}/exchange/api/v1/mobile/private/account/deposit/crypto`;

export const CRYPTO_WITHDRAWAL = `${core}/exchange/api/v1/mobile/private/account/withdraw/crypto`;

export const CRYPTO_WHITELIST = `${core}/exchange/api/v1/mobile/private/whitelist`;

export const WITHDRAWAL_TEMPLATES = `${core}/exchange/api/v1/mobile/private/wire-template`;

export const BANKS_URL = `${core}/exchange/api/v1/mobile/private/account/banks`;

export const WIRE_WITHDRAWAL = `${core}/exchange/api/v1/mobile/private/account/wire`;

export const CARD_WITHDRAWAL = `${core}/exchange/api/v1/mobile/private/account/card/transaction/withdraw`;

export const DICTIONARY = `${core}/exchange/api/v1/mobile/public/dictionary`;
