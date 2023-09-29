import { all } from 'redux-saga/effects'
import profileSagas from './profile/saga'
import tradeSagas from './trade/saga'
import transactionSagas from './transactions/saga'
import walletSagas from './wallet/saga'

export default function* rootSaga() {
	yield all([transactionSagas(), tradeSagas(), profileSagas(), walletSagas()])
}
