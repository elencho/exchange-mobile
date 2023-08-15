import { combineReducers } from 'redux'

import transactions from './transactions/reducer'
import trade from './trade/reducer'
import modals from './modals/reducer'
import profile from './profile/reducer'
import wallet from './wallet/reducer'

const ERRORS_STATE = {
	generalError: null,
	requestName: null,
}

const errors = (state = ERRORS_STATE, action) => {
	const { generalError, requestName } = action
	switch (action.type) {
		case 'SAVE_GENERAL_ERROR':
			return { ...state, generalError }
		case 'SET_REQUEST_NAME':
			return { ...state, requestName }
		default:
			return state
	}
}

const reducers = {
	transactions,
	trade,
	modals,
	profile,
	wallet,
	errors,
}

export const reducer = combineReducers(reducers)
