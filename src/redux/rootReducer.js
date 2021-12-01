import { combineReducers } from 'redux';

import transactions from './transactions/reducer';
import trade from './trade/reducer';

const reducers = {
  transactions,
  trade,
};

export const reducer = combineReducers(reducers);
