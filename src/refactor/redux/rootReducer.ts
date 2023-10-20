import { combineReducers } from 'redux'
import auth from '../store/redux/auth/slice'
import errors from './errors/errorsSlice'
import modals from './modals/modalsSlice'
import profile from './profile/profileSlice'
import trade from './trade/reducer'
import trades from './trade/tradeSlice'
import transactions from './transactions/transactionSlice'
import wallet from './wallet/reducer'

const reducers = {
	auth,
	transactions,
	trade,
	trades,
	modals,
	profile,
	wallet,
	errors,
}

export const reducer = combineReducers(reducers)

export type RootState = ReturnType<typeof reducer>
