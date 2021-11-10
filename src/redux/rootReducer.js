import { combineReducers } from "redux";

import modal from "./modal/reducer";

const reducers = {
  approve_reject: modal,
};

export const reducer = combineReducers(reducers);
