export const actionTypes = {
  SWITCH_PERSONAL_SECURITY: 'SWITCH_PERSONAL_SECURITY',
  SAVE_COUNTRIES: 'SAVE_COUNTRIES',
  SAVE_COUNTRIES_CONSTANT: 'SAVE_COUNTRIES_CONSTANT',
  CHOOSE_COUNTRY: 'CHOOSE_COUNTRY',
  CHOOSE_CITIZENSHIP: 'CHOOSE_CITIZENSHIP',
  SAVE_USER_INFO: 'SAVE_USER_INFO',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // FOR SAGAS
  FETCH_COUNTRIES_SAGA: 'FETCH_COUNTRIES_SAGA',
  FETCH_USER_INFO_SAGA: 'FETCH_USER_INFO_SAGA',
  TOGGLE_MAIL_SUBSCRIPTION_SAGA: 'TOGGLE_MAIL_SUBSCRIPTION_SAGA',
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
export const chooseCountry = (country) => ({
  type: actionTypes.CHOOSE_COUNTRY,
  country,
});
export const chooseCitizenship = (citizenship) => ({
  type: actionTypes.CHOOSE_CITIZENSHIP,
  citizenship,
});
export const saveUserInfo = (userInfo) => ({
  type: actionTypes.SAVE_USER_INFO,
  userInfo,
});

// FOR SAGAS
export const fetchCountries = () => ({
  type: actionTypes.FETCH_COUNTRIES_SAGA,
});
export const fetchUserInfo = () => ({
  type: actionTypes.FETCH_USER_INFO_SAGA,
});
export const toggleEmailSubscription = (value) => ({
  type: actionTypes.TOGGLE_MAIL_SUBSCRIPTION_SAGA,
  value,
});
