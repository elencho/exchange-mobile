import { combineReducers } from 'redux'
import modals from './modals/reducer'
import profile from './profile/reducer'
import trade from './trade/reducer'
import transactions from './transactions/reducer'
import wallet from './wallet/reducer'
import errorsReducer from './errors/errorsSlice'
import authReducer from './auth/authSlice'

const reducers = {
	authReducer,
	transactions,
	trade,
	modals,
	profile,
	wallet,
	errorsReducer,
}

export const reducer = combineReducers(reducers)
