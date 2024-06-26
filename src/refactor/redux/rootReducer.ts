import { combineReducers } from 'redux'
import common from '../store/redux/common/slice'
import auth from '../store/redux/auth/slice'
import errors from './errors/errorsSlice'
import modal from './modals/modalsSlice'
import modals from '@app/redux/modals/reducer'
import profile from './profile/profileSlice'
import profileOld from '../../redux/profile/reducer'
import trade from '@app/redux/trade/reducer'
import trades from './trade/tradeSlice'
import transactions from './transactions/transactionSlice'
import transaction from '@app/redux/transactions/reducer'
import wallet from '@app/redux/wallet/reducer'

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
