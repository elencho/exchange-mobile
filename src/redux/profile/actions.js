export const actionTypes = {
  SWITCH_PERSONAL_SECURITY: 'SWITCH_PERSONAL_SECURITY',
  SAVE_COUNTRIES: 'SAVE_COUNTRIES',
  SAVE_COUNTRIES_CONSTANT: 'SAVE_COUNTRIES_CONSTANT',
  CHOOSE_COUNTRY: 'CHOOSE_COUNTRY',
  CHOOSE_CITIZENSHIP: 'CHOOSE_CITIZENSHIP',
  SAVE_USER_INFO: 'SAVE_USER_INFO',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // Security
  SET_GOOGLE_AUTH: 'SET_GOOGLE_AUTH',
  SET_EMAIL_AUTH: 'SET_EMAIL_AUTH',
  SET_SMS_AUTH: 'SET_SMS_AUTH',

  // FOR SAGAS
  FETCH_COUNTRIES_SAGA: 'FETCH_COUNTRIES_SAGA',
  FETCH_USER_INFO_SAGA: 'FETCH_USER_INFO_SAGA',
  SAVE_USER_INFO_SAGA: 'SAVE_USER_INFO_SAGA',
  TOGGLE_MAIL_SUBSCRIPTION_SAGA: 'TOGGLE_MAIL_SUBSCRIPTION_SAGA',
  UPDATE_PASSWORD_SAGA: 'UPDATE_PASSWORD_SAGA',
  SEND_VERIFICATION_CODE: 'SEND_VERIFICATION_CODE',
  UPDATE_PHONE_NUMBER: 'UPDATE_PHONE_NUMBER',
};

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

// FOR SAGAS
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
