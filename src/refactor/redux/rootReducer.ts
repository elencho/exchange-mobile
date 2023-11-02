import { combineReducers } from 'redux'
import common from '../store/redux/common/slice'
import auth from '../store/redux/auth/slice'
import errors from './errors/errorsSlice'
import modal from './modals/modalsSlice'
import modals from '@app/redux/modals/reducer'
import profile from './profile/profileSlice'
import profileOld from './profile/reducer'
import trade from './trade/reducer'
import trades from './trade/tradeSlice'
import transactions from './transactions/transactionSlice'
import transaction from './transactions/reducer'
import wallet from './wallet/reducer'

const reducers = {
	common,
	auth,
	transactions,
	transactionsOld: transaction,
	trade,
	trades,
	modals,
	modalState: modal,
	profile,
	profileOld,
	wallet,
	errors,
}

export const reducer = combineReducers(reducers)

export type RootState = ReturnType<typeof reducer>
