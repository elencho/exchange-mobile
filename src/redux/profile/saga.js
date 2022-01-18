import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveCountries,
  saveCountriesConstant,
  saveUserInfo,
  fetchUserInfo as fetchUserInfoAction,
} from './actions';
import { getUserData } from './selectors';
import {
  fetchCountries,
  fetchUserInfo as fetchUserInfoUtil,
  subscribeMail,
  unsubscribeMail,
  updatePassword,
  updateUserData,
} from '../../utils/userProfileUtils';

function* fetchCountriesSaga() {
  const countries = yield call(fetchCountries);
  yield put(saveCountries(countries));
  yield put(saveCountriesConstant(countries));
}

function* fetchUserInfoSaga() {
  const userInfo = yield call(fetchUserInfoUtil);
  yield put(saveUserInfo(userInfo));
}

function* saveUserInfoSaga() {
  const userData = yield select(getUserData);
  yield call(updateUserData, userData);
}

function* updatePasswordSaga(action) {
  const { curentPassword, newPassword, repeatPassword } = action;
  yield call(updatePassword, curentPassword, newPassword, repeatPassword);
}

function* toggleSubscriptionSaga(action) {
  const { value } = action;
  if (value) {
    yield call(subscribeMail);
  }
  if (!value) {
    yield call(unsubscribeMail);
  }
  yield put(fetchUserInfoAction());
}

export default function* () {
  yield takeLatest(actionTypes.FETCH_COUNTRIES_SAGA, fetchCountriesSaga);
  yield takeLatest(actionTypes.FETCH_USER_INFO_SAGA, fetchUserInfoSaga);
  yield takeLatest(actionTypes.SAVE_USER_INFO_SAGA, saveUserInfoSaga);
  yield takeLatest(actionTypes.UPDATE_PASSWORD_SAGA, updatePasswordSaga);
  yield takeLatest(
    actionTypes.TOGGLE_MAIL_SUBSCRIPTION_SAGA,
    toggleSubscriptionSaga
  );
}
