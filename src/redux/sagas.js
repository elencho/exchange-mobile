import { all } from 'redux-saga/effects';

import transactionSagas from './transactions/saga';

export default function* rootSaga() {
  yield all([transactionSagas()]);
}
