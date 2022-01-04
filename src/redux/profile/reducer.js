import { actionTypes } from './actions';

const INITIAL_STATE = {
  Personal_Security: 'Security',

  // Query Params
  offset: 0,
  limit: 5,
};

export default (state = INITIAL_STATE, action) => {
  const { Personal_Security } = action;
  switch (action.type) {
    case actionTypes.SWITCH_PERSONAL_SECURITY:
      return {
        ...state,
        Personal_Security,
      };
    default:
      return state;
  }
};
