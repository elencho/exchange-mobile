export const actionTypes = {
  SAVE_GENERAL_ERROR: 'SAVE_GENERAL_ERROR',

  // LOGIN
  SAVE_PKCE_INFO: 'SAVE_PKCE_INFO',
  SAVE_LOGIN_START_INFO: 'SAVE_LOGIN_START_INFO',
  SET_CREDENTIALS: 'SET_CREDENTIALS',
  SET_REGISTRATION_INPUTS: 'SET_REGISTRATION_INPUTS',
  SAVE_USER_AND_PASS_INFO: 'SAVE_USER_AND_PASS_INFO',

  // REGISTER
  SWITCH_PERSONAL_COMPANY: 'SWITCH_PERSONAL_COMPANY',
  SAVE_REGISTRATION_START_INFO: 'SAVE_REGISTRATION_START_INFO',
  SAVE_VERIFICATION_INFO: 'SAVE_VERIFICATION_INFO',

  SWITCH_PERSONAL_SECURITY: 'SWITCH_PERSONAL_SECURITY',
  SAVE_COUNTRIES: 'SAVE_COUNTRIES',
  SAVE_COUNTRIES_CONSTANT: 'SAVE_COUNTRIES_CONSTANT',
  CHOOSE_COUNTRY: 'CHOOSE_COUNTRY',
  CHOOSE_CITIZENSHIP: 'CHOOSE_CITIZENSHIP',
  SAVE_USER_INFO: 'SAVE_USER_INFO',
  SET_LANGUAGE: 'SET_LANGUAGE',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // Security
  SET_GOOGLE_AUTH: 'SET_GOOGLE_AUTH',
  SET_EMAIL_AUTH: 'SET_EMAIL_AUTH',
  SET_SMS_AUTH: 'SET_SMS_AUTH',
  CURRENT_SECURITY_ACTION: 'CURRENT_SECURITY_ACTION',
  SAVE_OTP_CHANGE_TOKEN: 'SAVE_OTP_CHANGE_TOKEN',
  SAVE_TOTP_SECRET_OBJ: 'SAVE_TOTP_SECRET_OBJ',

  // FOR SAGAS
  START_LOGIN_ACTION: 'START_LOGIN_ACTION',
  START_REGISTRATION_ACTION: 'START_REGISTRATION_ACTION',
  REGISTRATION_FORM_ACTION: 'REGISTRATION_FORM_ACTION',
  USERNAME_AND_PASSWORD_ACTION: 'USERNAME_AND_PASSWORD_ACTION',
  OTP_FOR_LOGIN_ACTION: 'OTP_FOR_LOGIN_ACTION',

  FETCH_COUNTRIES_SAGA: 'FETCH_COUNTRIES_SAGA',
  FETCH_USER_INFO_SAGA: 'FETCH_USER_INFO_SAGA',
  SAVE_USER_INFO_SAGA: 'SAVE_USER_INFO_SAGA',
  TOGGLE_MAIL_SUBSCRIPTION_SAGA: 'TOGGLE_MAIL_SUBSCRIPTION_SAGA',
  UPDATE_PASSWORD_SAGA: 'UPDATE_PASSWORD_SAGA',
  SEND_VERIFICATION_CODE: 'SEND_VERIFICATION_CODE',
  UPDATE_PHONE_NUMBER: 'UPDATE_PHONE_NUMBER',
  ACTIVATE_EMAIL_OTP: 'ACTIVATE_EMAIL_OTP',
  CREDENTIALS_FOR_EMAIL: 'CREDENTIALS_FOR_EMAIL',
  CREDENTIALS_FOR_GOOGLE: 'CREDENTIALS_FOR_GOOGLE',
  ACTIVATE_GOOGLE_OTP: 'ACTIVATE_GOOGLE_OTP',
};

export const saveGeneralError = (generalError) => ({
  type: actionTypes.SAVE_GENERAL_ERROR,
  generalError,
});

// Login
export const savePkceInfo = (pkceInfo) => ({
  type: actionTypes.SAVE_PKCE_INFO,
  pkceInfo,
});
export const saveLoginStartInfo = (loginStartInfo) => ({
  type: actionTypes.SAVE_LOGIN_START_INFO,
  loginStartInfo,
});
export const setCredentials = (credentials) => ({
  type: actionTypes.SET_CREDENTIALS,
  credentials,
});
export const saveUserAndPassInfo = (userAndPassInfo) => ({
  type: actionTypes.SAVE_USER_AND_PASS_INFO,
  userAndPassInfo,
});

// Register
export const switchPersonalCompany = (Personal_Company) => ({
  type: actionTypes.SWITCH_PERSONAL_COMPANY,
  Personal_Company,
});
export const saveRegistrationStartInfo = (registrationStartInfo) => ({
  type: actionTypes.SAVE_REGISTRATION_START_INFO,
  registrationStartInfo,
});
export const setRegistrationInputs = (registrationInputs) => ({
  type: actionTypes.SET_REGISTRATION_INPUTS,
  registrationInputs,
});
export const saveVerificationInfo = (verificationInfo) => ({
  type: actionTypes.SAVE_VERIFICATION_INFO,
  verificationInfo,
});

// PERSONAL
export const switchPersonalSecurity = (Personal_Security) => ({
  type: actionTypes.SWITCH_PERSONAL_SECURITY,
  Personal_Security,
});
export const saveCountries = (countries) => ({
  type: actionTypes.SAVE_COUNTRIES,
  countries,
});
export const saveCountriesConstant = (countriesConstant) => ({
  type: actionTypes.SAVE_COUNTRIES_CONSTANT,
  countriesConstant,
});
export const saveUserInfo = (userInfo) => ({
  type: actionTypes.SAVE_USER_INFO,
  userInfo,
});
export const setLanguage = (language) => ({
  type: actionTypes.SET_LANGUAGE,
  language,
});

// SECURITY
export const setGoogleAuth = (googleAuth) => ({
  type: actionTypes.SET_GOOGLE_AUTH,
  googleAuth,
});
export const setEmailAuth = (emailAuth) => ({
  type: actionTypes.SET_EMAIL_AUTH,
  emailAuth,
});
export const setSmsAuth = (smsAuth) => ({
  type: actionTypes.SET_SMS_AUTH,
  smsAuth,
});
export const setCurrentSecurityAction = (currentSecurityAction) => ({
  type: actionTypes.CURRENT_SECURITY_ACTION,
  currentSecurityAction,
});
export const saveOtpChangeToken = (otpChangeToken) => ({
  type: actionTypes.SAVE_OTP_CHANGE_TOKEN,
  otpChangeToken,
});
export const saveTotpSecretObj = (totpSecretObj) => ({
  type: actionTypes.SAVE_TOTP_SECRET_OBJ,
  totpSecretObj,
});

// FOR SAGAS
export const startLoginAction = (navigation) => ({
  type: actionTypes.START_LOGIN_ACTION,
  navigation,
});
export const startRegistrationAction = (navigation) => ({
  type: actionTypes.START_REGISTRATION_ACTION,
  navigation,
});
export const registrationFormAction = () => ({
  type: actionTypes.REGISTRATION_FORM_ACTION,
});
export const usernameAndPasswordAction = (navigation) => ({
  type: actionTypes.USERNAME_AND_PASSWORD_ACTION,
  navigation,
});
export const otpForLoginAction = (otp, navigation) => ({
  type: actionTypes.OTP_FOR_LOGIN_ACTION,
  otp,
  navigation,
});

export const fetchCountries = () => ({
  type: actionTypes.FETCH_COUNTRIES_SAGA,
});
export const fetchUserInfo = () => ({
  type: actionTypes.FETCH_USER_INFO_SAGA,
});
export const saveUserInfoSaga = () => ({
  type: actionTypes.SAVE_USER_INFO_SAGA,
});
export const toggleEmailSubscription = (value) => ({
  type: actionTypes.TOGGLE_MAIL_SUBSCRIPTION_SAGA,
  value,
});
export const updatePassword = (
  curentPassword,
  newPassword,
  repeatPassword
) => ({
  type: actionTypes.UPDATE_PASSWORD_SAGA,
  curentPassword,
  newPassword,
  repeatPassword,
});
export const sendVerificationCode = (phoneNumber, phoneCountry) => ({
  type: actionTypes.SEND_VERIFICATION_CODE,
  phoneNumber,
  phoneCountry,
});
export const updatePhoneNumber = (
  phoneNumber,
  phoneCountry,
  verificationNumber
) => ({
  type: actionTypes.UPDATE_PHONE_NUMBER,
  phoneNumber,
  phoneCountry,
  verificationNumber,
});

// 2FA SAGAS
export const credentialsForEmail = (OTP) => ({
  type: actionTypes.CREDENTIALS_FOR_EMAIL,
  OTP,
});
export const activateEmailOtp = (OTP) => ({
  type: actionTypes.ACTIVATE_EMAIL_OTP,
  OTP,
});
export const credentialsForGoogle = (OTP) => ({
  type: actionTypes.CREDENTIALS_FOR_GOOGLE,
  OTP,
});
export const activateGoogleOtp = (OTP) => ({
  type: actionTypes.ACTIVATE_GOOGLE_OTP,
  OTP,
});
