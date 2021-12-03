import { combineReducers } from 'redux';

import transactions from './transactions/reducer';
import trade from './trade/reducer';
import modals from './modals/reducer';

const reducers = {
  transactions,
  trade,
  modals,
};

export const reducer = combineReducers(reducers);
