import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { asyncPkceChallenge } from 'react-native-pkce-challenge';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

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
  savePkceInfo,
  saveLoginStartInfo,
  saveUserAndPassInfo,
  setOtpType,
} from './actions';
import { getUserData } from './selectors';
import {
  activateEmailOtp,
  activateGoogleOtp,
  codeToToken,
  fetchCountries,
  fetchUserInfo as fetchUserInfoUtil,
  getOtpChangeToken,
  loginOtp,
  loginStart,
  sendEmailOtp,
  subscribeMail,
  unsubscribeMail,
  updatePassword,
  updatePhoneNumber,
  updateUserData,
  usernameAndPasswordForm,
  verifyPhoneNumber,
} from '../../utils/userProfileUtils';
import {
  toggleEmailAuthModal,
  toggleGoogleAuthModal,
  toggleLogin2FaModal,
} from '../modals/actions';

function* startLoginSaga(action) {
  const { navigation } = action;

  const pkceInfo = yield call(async () => await asyncPkceChallenge());
  yield put(savePkceInfo(pkceInfo));

  const code_challenge = yield select(
    (state) => state.profile.pkceInfo.codeChallenge
  );
  const loginStartInfo = yield call(loginStart, code_challenge);
  yield put(saveLoginStartInfo(loginStartInfo));

  if (loginStartInfo.execution === 'LOGIN_USERNAME_PASSWORD') {
    navigation.navigate('Login');
  }
}

function* usernameAndPasswordSaga(action) {
  const { navigation } = action;
  const credentials = yield select((state) => state.profile.credentials);
  const url = yield select((state) => state.profile.loginStartInfo.callbackUrl);
  const { login, password } = credentials;
  const userAndPassInfo = yield call(
    usernameAndPasswordForm,
    login,
    password,
    url
  );
  yield put(saveUserAndPassInfo(userAndPassInfo));

  if (userAndPassInfo.execution === 'LOGIN_OTP') {
    yield put(toggleLogin2FaModal(true));
  }
  if (userAndPassInfo.code) {
    const code = userAndPassInfo.code;
    const code_verifier = yield select(
      (state) => state.profile.pkceInfo.codeVerifier
    );

    const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
    yield call(() => {
      RCTNetworking.clearCookies(() => {});
    });

    const data = yield call(codeToToken, code, code_verifier);
    if (data.access_token) {
      yield call(async () => {
        await SecureStore.setItemAsync('accessToken', data.access_token);
      });
      const otpType = jwt_decode(data.access_token).otpType;
      yield put(setOtpType(otpType));
      yield call(() => navigation.navigate('Main'));
    }
  }
}

function* otpForLoginSaga(action) {
  const { otp } = action;
  const callbackUrl = yield select(
    (state) => state.profile.userAndPassInfo.callbackUrl
  );

  const data = yield call(loginOtp, otp, callbackUrl);
}

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
  yield put(saveOtpChangeToken(data.changeOTPToken));
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
  yield takeLatest(actionTypes.START_LOGIN_ACTION, startLoginSaga);
  yield takeLatest(
    actionTypes.USERNAME_AND_PASSWORD_ACTION,
    usernameAndPasswordSaga
  );
  yield takeLatest(actionTypes.OTP_FOR_LOGIN_ACTION, otpForLoginSaga);
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
