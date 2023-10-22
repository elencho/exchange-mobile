import { all } from 'redux-saga/effects'
import profileSagas from '@app/redux/profile/saga'
import tradeSagas from '@app/redux/trade/saga'
import transactionSagas from '@app/redux/transactions/saga'
import walletSagas from '@app/redux/wallet/saga'

export default function* rootSaga() {
	yield all([transactionSagas(), tradeSagas(), profileSagas(), walletSagas()])
}
