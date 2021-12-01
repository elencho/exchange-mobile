import { all } from 'redux-saga/effects';

import transactionSagas from './transactions/saga';
import tradeSagas from './trade/saga';

export default function* rootSaga() {
  yield all([transactionSagas(), tradeSagas()]);
}
