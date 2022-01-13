export const actionTypes = {
  SWITCH_PERSONAL_SECURITY: 'SWITCH_PERSONAL_SECURITY',
  SAVE_COUNTRIES: 'SAVE_COUNTRIES',
  SAVE_COUNTRIES_CONSTANT: 'SAVE_COUNTRIES_CONSTANT',
  CHOOSE_COUNTRY: 'CHOOSE_COUNTRY',
  CHOOSE_CITIZENSHIP: 'CHOOSE_CITIZENSHIP',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // FOR SAGAS
  FETCH_COUNTRIES_SAGA: 'FETCH_COUNTRIES_SAGA',
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

// FOR SAGAS
export const fetchCountries = () => ({
  type: actionTypes.FETCH_COUNTRIES_SAGA,
});
