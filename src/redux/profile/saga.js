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
  saveVerificationInfo,
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
  resetOtp,
  sendEmailOtp,
  subscribeMail,
  unsubscribeMail,
  updatePassword,
  updatePhoneNumber,
  updateUserData,
  usernameAndPasswordForm,
  verifyAccount,
  verifyPhoneNumber,
} from '../../utils/userProfileUtils';
import {
  toggleEmailAuthModal,
  toggleEmailVerificationModal,
  toggleGoogleAuthModal,
  togglePasswordModal,
} from '../modals/actions';
import { resetTradesState } from '../trade/actions';
import { resetTransactionsState, toggleLoading } from '../transactions/actions';
import { resetWalletState } from '../wallet/actions';

//  START LOGIN
function* startLoginSaga(action) {
  const { navigation } = action;

  const pkceInfo = yield call(async () => await asyncPkceChallenge());
  yield put(savePkceInfo(pkceInfo));

  const loginStartInfo = yield call(loginStart, pkceInfo.codeChallenge);
  yield put(saveLoginStartInfo(loginStartInfo));

  if (loginStartInfo.execution === 'LOGIN_USERNAME_PASSWORD') {
    navigation.navigate('Login');
  }
}

//  START REGISTRATION
function* startRegistrationSaga(action) {
  const { navigation } = action;

  const pkceInfo = yield call(async () => await asyncPkceChallenge());
  yield put(savePkceInfo(pkceInfo));

  const registrationStartInfo = yield call(registrationStart);
  yield put(saveRegistrationStartInfo(registrationStartInfo));

  if (registrationStartInfo?.execution === 'REGISTRATION_START') {
    navigation.navigate('Registration');
  }
}

//  REGISTRATION FORM
function* registrationFormSaga(action) {
  const { navigation } = action;
  const params = yield select(registrationParams);
  const state = yield select((state) => state.profile);
  const { registrationStartInfo, verificationInfo } = state;

  const data = yield call(
    registrationForm,
    params,
    registrationStartInfo.callbackUrl
  );
  if (data?.execution === 'EMAIL_VERIFICATION_OTP') {
    yield put(toggleEmailVerificationModal(true));
    yield put(saveVerificationInfo(data));
  }
  yield put(
    saveRegistrationStartInfo({
      ...registrationStartInfo,
      callbackUrl: data?.callbackUrl,
    })
  );
}

// VERIFY REGISTRATION
function* verifyAccountSaga(action) {
  const { otp, navigation } = action;
  yield put(toggleLoading(true));

  const state = yield select((state) => state.profile);
  const {
    verificationInfo,
    pkceInfo: { codeVerifier },
  } = state;

  const verified = yield call(verifyAccount, verificationInfo.callbackUrl, otp);
  if (verified?.code) {
    const data = yield call(codeToToken, verified.code, codeVerifier);
    yield call(async () => {
      await SecureStore.setItemAsync('accessToken', data?.access_token);
      await SecureStore.setItemAsync('refreshToken', data?.refresh_token);
    });

    yield put({ type: 'OTP_SAGA', token: data?.access_token });
    yield call(() => navigation.navigate('Main'));
    yield put(toggleEmailVerificationModal(false));
    yield put(toggleLoading(false));
  } else {
    yield put(toggleLoading(false));
    yield put(saveVerificationInfo(verified));
  }
}

//  USERNAME AND PASSWORD
function* usernameAndPasswordSaga(action) {
  const { navigation } = action;
  const credentials = yield select((state) => state.profile.credentials);
  const loginStartInfo = yield select((state) => state.profile.loginStartInfo);
  const { login, password } = credentials;
  const userAndPassInfo = yield call(
    usernameAndPasswordForm,
    login,
    password,
    loginStartInfo?.callbackUrl
  );
  yield put(saveUserAndPassInfo(userAndPassInfo));

  if (userAndPassInfo.execution === 'LOGIN_OTP') {
    navigation.navigate('Login2Fa');
  }
  yield put(
    saveLoginStartInfo({
      ...loginStartInfo,
      callbackUrl: userAndPassInfo.callbackUrl,
    })
  );

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

// RESET OTP
function* resetOtpSaga(action) {
  const { navigation } = action;
  const userAndPassInfo = yield select(
    (state) => state.profile.userAndPassInfo
  );
  const data = yield call(resetOtp, userAndPassInfo.callbackUrl);
  if (data) {
    yield put(
      saveUserAndPassInfo({ ...userAndPassInfo, callbackUrl: data.callbackUrl })
    );
    navigation.navigate('ResetOtpInstructions', { execution: data?.execution });
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
  yield put(toggleLoading(true));
  yield delay(1000);

  const userInfo = yield call(fetchUserInfoUtil);
  if (userInfo) yield put(saveUserInfo(userInfo));

  yield put(toggleLoading(false));
}

//  UPDATE USER INFO
function* saveUserInfoSaga() {
  const userData = yield select(getUserData);
  yield call(updateUserData, userData);
}

//  UPDATE PASSWORD
function* updatePasswordSaga(action) {
  const { curentPassword, newPassword, repeatPassword } = action;
  const data = yield call(
    updatePassword,
    curentPassword,
    newPassword,
    repeatPassword
  );
  if (data?.status >= 200 && data?.status < 300) {
    yield put(togglePasswordModal(false));
  }
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
  yield takeLatest('RESET_OTP', resetOtpSaga);
  yield takeLatest('LOGOUT', logoutSaga);
  yield takeLatest('VERIFY_ACCOUNT', verifyAccountSaga);
}
