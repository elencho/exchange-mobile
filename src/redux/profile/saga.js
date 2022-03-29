import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import {
  actionTypes,
  saveCountries,
  saveCountriesConstant,
  saveUserInfo,
  fetchUserInfo as fetchUserInfoAction,
  saveOtpChangeToken,
  setCurrentSecurityAction,
  setSmsAuth,
  setGoogleAuth,
  setEmailAuth,
  saveTotpSecretObj,
} from './actions';
import { getUserData } from './selectors';
import {
  activateEmailOtp,
  activateGoogleOtp,
  fetchCountries,
  fetchUserInfo as fetchUserInfoUtil,
  getOtpChangeToken,
  sendEmailOtp,
  subscribeMail,
  unsubscribeMail,
  updatePassword,
  updatePhoneNumber,
  updateUserData,
  verifyPhoneNumber,
} from '../../utils/userProfileUtils';
import { toggleEmailAuthModal, toggleGoogleAuthModal } from '../modals/actions';

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

function* verifyPhoneNumberSaga(action) {
  const { phoneNumber, phoneCountry } = action;
  yield call(verifyPhoneNumber, phoneNumber, phoneCountry);
}

function* updatePhoneNumberSaga(action) {
  const { phoneNumber, phoneCountry, verificationNumber } = action;
  yield call(updatePhoneNumber, phoneNumber, phoneCountry, verificationNumber);
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

function* credentialsForEmailSaga(action) {
  const { OTP } = action;
  const data = yield call(getOtpChangeToken, OTP, 'EMAIL');
  yield call(sendEmailOtp);
  yield put(saveOtpChangeToken(data.otpChangeToken));
  yield put(toggleEmailAuthModal(true));
}

function* activateEmailSaga(action) {
  const { OTP } = action;
  const otpChangeToken = yield select((state) => state.profile.otpChangeToken);
  const status = yield call(activateEmailOtp, otpChangeToken, OTP);

  if (status === 200) {
    yield put(saveOtpChangeToken(null));
    yield put(setCurrentSecurityAction(null));
    yield put(setSmsAuth(false));
    yield put(setGoogleAuth(false));
    yield put(setEmailAuth(true));
  }
}

function* credentialsForGoogleSaga(action) {
  const { OTP } = action;
  const data = yield call(getOtpChangeToken, OTP, 'TOTP');

  yield put(saveOtpChangeToken(data.changeOTPToken));
  yield put(saveTotpSecretObj(data.totp));
  yield delay(1000);
  yield put(toggleGoogleAuthModal(true));
}

function* activateGoogleSaga(action) {
  const { OTP } = action;
  const otpChangeToken = yield select((state) => state.profile.otpChangeToken);
  const totpSecret = yield select(
    (state) => state.profile.totpSecretObj.totpSecret
  );
  const status = yield call(activateGoogleOtp, otpChangeToken, OTP, totpSecret);

  if (status === 200) {
    yield put(saveOtpChangeToken(null));
    yield put(setCurrentSecurityAction(null));
    yield put(setSmsAuth(false));
    yield put(setGoogleAuth(true));
    yield put(setEmailAuth(false));
  }
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
  yield takeLatest(actionTypes.SEND_VERIFICATION_CODE, verifyPhoneNumberSaga);
  yield takeLatest(actionTypes.UPDATE_PHONE_NUMBER, updatePhoneNumberSaga);
  yield takeLatest(actionTypes.CREDENTIALS_FOR_EMAIL, credentialsForEmailSaga);
  yield takeLatest(actionTypes.ACTIVATE_EMAIL_OTP, activateEmailSaga);
  yield takeLatest(actionTypes.ACTIVATE_GOOGLE_OTP, activateGoogleSaga);
  yield takeLatest(
    actionTypes.CREDENTIALS_FOR_GOOGLE,
    credentialsForGoogleSaga
  );
}
