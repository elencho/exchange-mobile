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
  saveRegistrationStartInfo,
  saveResendLink,
  resetProfileState,
} from './actions';
import { getUserData, registrationParams } from './selectors';
import {
  activateEmailOtp,
  activateGoogleOtp,
  codeToToken,
  fetchCountries,
  fetchUserInfo as fetchUserInfoUtil,
  getOtpChangeToken,
  loginOtp,
  loginStart,
  refreshToken,
  registrationForm,
  registrationStart,
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
  toggleEmailVerificationModal,
  toggleGoogleAuthModal,
  toggleLogin2FaModal,
} from '../modals/actions';
import { resetTradesState } from '../trade/actions';
import { resetTransactionsState } from '../transactions/actions';
import { resetWalletState } from '../wallet/actions';

//  START LOGIN
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

//  START REGISTRATION
function* startRegistrationSaga(action) {
  const { navigation } = action;

  const registrationStartInfo = yield call(registrationStart);
  yield put(saveRegistrationStartInfo(registrationStartInfo));

  if (registrationStartInfo.execution === 'REGISTRATION_START') {
    navigation.navigate('Registration');
  }
}

//  REGISTRATION FORM
function* registrationFormSaga(action) {
  const { navigation } = action;
  const params = yield select(registrationParams);
  const url = yield select(
    (state) => state.profile.registrationStartInfo.callbackUrl
  );

  const data = yield call(registrationForm, params, url);
  if (data.execution === 'EMAIL_VERIFICATION') {
    yield put(toggleEmailVerificationModal(true));
    yield put(saveResendLink(data.callbackUrl));
  }
}

//  USERNAME AND PASSWORD
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

  // Sometimes OTP is disabled, therefore code block below should be executed
  if (userAndPassInfo.code) {
    const code = userAndPassInfo.code;
    const code_verifier = yield select(
      (state) => state.profile.pkceInfo.codeVerifier
    );

    const data = yield call(codeToToken, code, code_verifier);
    if (data.refresh_token) {
      yield call(async () => {
        await SecureStore.setItemAsync('refreshToken', data.refresh_token);
      });
    }

    if (data.access_token) {
      yield call(async () => {
        await SecureStore.setItemAsync('accessToken', data.access_token);
      });

      yield put({ type: 'OTP_SAGA', token: data.access_token });
      yield call(() => navigation.navigate('Main'));
    }
  }
  // Till here
}

//  O T P    F O R    L O G I N
function* otpForLoginSaga(action) {
  const { otp, navigation } = action;
  const callbackUrl = yield select(
    (state) => state.profile.userAndPassInfo.callbackUrl
  );
  const code_verifier = yield select(
    (state) => state.profile.pkceInfo.codeVerifier
  );

  const code = yield call(loginOtp, otp, callbackUrl);
  const data = yield call(codeToToken, code, code_verifier);
  if (data.refresh_token) {
    yield call(async () => {
      await SecureStore.setItemAsync('refreshToken', data.refresh_token);
    });
  }

  if (data.access_token) {
    yield call(async () => {
      await SecureStore.setItemAsync('accessToken', data.access_token);
    });

    yield put({ type: 'OTP_SAGA', token: data.access_token });
    yield call(() => navigation.navigate('Main'));
  }
}

//  FETCH COUNTRIES
function* fetchCountriesSaga() {
  const countries = yield call(fetchCountries);
  yield put(saveCountries(countries));
  yield put(saveCountriesConstant(countries));
}

//  FETCH USER INFO
function* fetchUserInfoSaga() {
  const userInfo = yield call(fetchUserInfoUtil);
  yield put(saveUserInfo(userInfo));
}

//  UPDATE USER INFO
function* saveUserInfoSaga() {
  const userData = yield select(getUserData);
  yield call(updateUserData, userData);
}

//  UPDATE PASSWORD
function* updatePasswordSaga(action) {
  const { curentPassword, newPassword, repeatPassword } = action;
  yield call(updatePassword, curentPassword, newPassword, repeatPassword);
}

//  VERIFY PHONE NUMBER
function* verifyPhoneNumberSaga(action) {
  const { phoneNumber, phoneCountry } = action;
  yield call(verifyPhoneNumber, phoneNumber, phoneCountry);
}

//  UPDATE PHONE NUMBER
function* updatePhoneNumberSaga(action) {
  const { phoneNumber, phoneCountry, verificationNumber } = action;
  yield call(updatePhoneNumber, phoneNumber, phoneCountry, verificationNumber);
}

//  TOGLE SUBSCRIPTION
function* toggleSubscriptionSaga(action) {
  const { value } = action;
  yield call(value ? subscribeMail : unsubscribeMail);
  yield put(fetchUserInfoAction());
}

//  CREDENTIALS FOR EMAIL
function* credentialsForEmailSaga(action) {
  const { OTP } = action;
  const data = yield call(getOtpChangeToken, OTP, 'EMAIL');
  if (data) {
    yield call(sendEmailOtp);
    yield put(saveOtpChangeToken(data.changeOTPToken));
    yield put(toggleEmailAuthModal(true));
  }
}

//  CREDENTIALS FOR GOOGLE
function* credentialsForGoogleSaga(action) {
  const { OTP } = action;
  const data = yield call(getOtpChangeToken, OTP, 'TOTP');

  if (data) {
    yield put(saveOtpChangeToken(data.changeOTPToken));
    yield put(saveTotpSecretObj(data.totp));
    yield delay(1000);
    yield put(toggleGoogleAuthModal(true));
  }
}

//  ACTIVATE EMAIL
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
    const token = yield call(refreshToken);
    yield put({ type: 'OTP_SAGA', token });
  }
}

//  ACTIVATE GOOGLE
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
    const token = yield call(refreshToken);
    yield put({ type: 'OTP_SAGA', token });
  }
}

// OTP SAGA
function* otpSaga(action) {
  const { token } = action;
  const otpType = jwt_decode(token).otpType;
  if (otpType === 'EMAIL') {
    yield put(setEmailAuth(true));
  }
  if (otpType === 'TOTP') {
    yield put(setGoogleAuth(true));
  }
  if (otpType === 'SMS') {
    yield put(setSmsAuth(true));
  }
}

function* logoutSaga() {
  yield put(resetTradesState());
  yield put(resetTransactionsState());
  yield put(resetWalletState());
}

export default function* () {
  yield takeLatest(actionTypes.START_LOGIN_ACTION, startLoginSaga);
  yield takeLatest(
    actionTypes.START_REGISTRATION_ACTION,
    startRegistrationSaga
  );
  yield takeLatest(actionTypes.REGISTRATION_FORM_ACTION, registrationFormSaga);
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
  yield takeLatest('OTP_SAGA', otpSaga);
  yield takeLatest('LOGOUT', logoutSaga);
}
