import { all } from 'redux-saga/effects';

import transactionSagas from './transactions/saga';
import tradeSagas from './trade/saga';
import modalSagas from './modals/saga';
import profileSagas from './profile/saga';
import walletSagas from './wallet/saga';

export default function* rootSaga() {
  yield all([
    transactionSagas(),
    tradeSagas(),
    modalSagas(),
    profileSagas(),
    walletSagas(),
  ]);
}
