import { actionTypes } from './actions';

const INITIAL_STATE = {
  Personal_Security: 'Personal',
  userInfo: {},

  countries: [],
  countriesConstant: [],
  country: 'Georgia',
  citizenship: 'Georgia',

  // Query Params
  offset: 0,
  limit: 5,
};

export default (state = INITIAL_STATE, action) => {
  const {
    Personal_Security,
    countries,
    countriesConstant,
    country,
    citizenship,
    userInfo,
  } = action;
  switch (action.type) {
    case actionTypes.SWITCH_PERSONAL_SECURITY:
      return {
        ...state,
        Personal_Security,
      };
    case actionTypes.SAVE_COUNTRIES:
      return {
        ...state,
        countries,
      };
    case actionTypes.SAVE_COUNTRIES_CONSTANT:
      return {
        ...state,
        countriesConstant,
      };
    case actionTypes.CHOOSE_COUNTRY:
      return {
        ...state,
        country,
      };
    case actionTypes.CHOOSE_CITIZENSHIP:
      return {
        ...state,
        citizenship,
      };
    case actionTypes.SAVE_USER_INFO:
      return {
        ...state,
        userInfo,
      };
    default:
      return state;
  }
};
