import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveCountries,
  saveCountriesConstant,
  saveUserInfo,
} from './actions';
import { getParams } from './selectors';
import { fetchCountries, fetchUserInfo } from '../../utils/userProfileUtils';

function* fetchCountriesSaga() {
  const countries = yield call(fetchCountries);
  yield put(saveCountries(countries));
  yield put(saveCountriesConstant(countries));
}

function* fetchUserInfoSaga() {
  const userInfo = yield call(fetchUserInfo);
  yield put(saveUserInfo(userInfo));
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_COUNTRIES_SAGA, fetchCountriesSaga);
  yield takeLatest(actionTypes.FETCH_USER_INFO_SAGA, fetchUserInfoSaga);
}
