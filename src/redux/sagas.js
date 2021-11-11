import { all } from 'redux-saga/effects';

import userSagas from './transactions/saga';

export default function* rootSaga() {
  yield all([userSagas()]);
}
