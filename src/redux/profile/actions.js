export const actionTypes = {
  SWITCH_PERSONAL_SECURITY: 'SWITCH_PERSONAL_SECURITY',

  // PURE VISUALS
  TOGGLE_DATEPICKER: 'TOGGLE_DATEPICKER',

  // FOR SAGAS
  FETCH_TRADES: 'FETCH_TRADES',
};

export const switchPersonalSecurity = (Personal_Security) => ({
  type: actionTypes.SWITCH_PERSONAL_SECURITY,
  Personal_Security,
});

// FOR SAGAS
export const fetchTrades = () => ({
  type: actionTypes.FETCH_TRADES,
});
