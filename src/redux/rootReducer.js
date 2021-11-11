import { combineReducers } from 'redux';

import transactions from './transactions/reducer';

const reducers = {
  transactions,
};

export const reducer = combineReducers(reducers);
