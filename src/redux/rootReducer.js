import { combineReducers } from 'redux';

import transactions from './transactions/reducer';
import trade from './trade/reducer';
import modals from './modals/reducer';
import profile from './profile/reducer';
import wallet from './wallet/reducer';

const reducers = {
  transactions,
  trade,
  modals,
  profile,
  wallet,
};

export const reducer = combineReducers(reducers);
