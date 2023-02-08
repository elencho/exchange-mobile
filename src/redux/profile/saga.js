import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { asyncPkceChallenge } from 'react-native-pkce-challenge';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

import {
  actionTypes,
  saveCountries,
  saveCountriesConstant,
  saveUserInfo,
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
  fetchUserInfo,
  toggleUserInfoLoading,
  switchPersonalSecurity,
} from './actions';
import { getUserData, registrationParams } from './selectors';
import {
  activateEmailOtp,
  activateGoogleOtp,
  codeToToken,
  fetchCountries,
  fetchUserInfo as fetchUserInfoUtil,
  forgotPassword,
  forgotPasswordCode,
  forgotPasswordEnterCode,
  getOtpChangeToken,
  loginOtp,
  loginStart,
  refreshToken,
  registrationForm,
  registrationStart,
  resendEmail,
  resetOtp,
  sendEmailOtp,
  sendOtp,
  setNewPassword,
  subscribeMail,
  unsubscribeMail,
  updatePassword,
  updatePhoneNumber,
  updateUserData,
  usernameAndPasswordForm,
  verifyAccount,
  verifyPhoneNumber,
} from '../../utils/userProfileUtils';
import launchSumsubSdk from '../../utils/sumsubMobileSdk';
import {
  toggleEmailAuthModal,
  toggleEmailVerificationModal,
  toggleGoogleAuthModal,
  toggleGoogleOtpModal,
  togglePersonalInfoModal,
  togglePhoneNumberModal,
  toggleSmsAuthModal,
} from '../modals/actions';
import { resetTradesState } from '../trade/actions';
import { resetTransactionsState, toggleLoading } from '../transactions/actions';
import { resetWalletState } from '../wallet/actions';

//  START LOGIN
function* startLoginSaga(action) {
  const { navigation } = action;

  const pkceInfo = yield call(async () => await asyncPkceChallenge());
  yield put(savePkceInfo(pkceInfo));

  const loginStartInfo = yield call(loginStart, pkceInfo?.codeChallenge);

  yield put(saveLoginStartInfo(loginStartInfo));
  if (loginStartInfo?.execution === 'LOGIN_USERNAME_PASSWORD') {
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
  const params = yield select(registrationParams);
  const state = yield select((state) => state.profile);
  const { registrationStartInfo } = state;
  yield put(toggleUserInfoLoading(true));

  const data = yield call(
    registrationForm,
    params,
    registrationStartInfo?.callbackUrl
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
  yield put(toggleUserInfoLoading(false));
}

// VERIFY REGISTRATION
function* verifyAccountSaga(action) {
  const { otp, navigation } = action;

  const state = yield select((state) => state.profile);
  const {
    verificationInfo,
    pkceInfo: { codeVerifier },
    userInfo,
  } = state;
  yield put(toggleUserInfoLoading(true));

  const verified = yield call(
    verifyAccount,
    verificationInfo?.callbackUrl,
    otp
  );
  if (verified?.code) {
    yield put({
      type: 'CODE_TO_TOKEN_SAGA',
      code: verified.code,
      codeVerifier,
      navigation,
    });

    yield put(toggleEmailVerificationModal(false));
    yield delay(800);
    yield call(() =>
      navigation.navigate('UserProfile', { fromRegistration: true })
    );
    yield put(toggleLoading(false));
  } else {
    yield put(saveVerificationInfo(verified));
  }
  yield put(toggleUserInfoLoading(false));
}

function* codeToTokenSaga(action) {
  const { code, codeVerifier, navigation, fromResetOtp } = action;

  const data = yield call(codeToToken, code, codeVerifier);

  if (data) {
    yield call(async () => {
      await SecureStore.setItemAsync('accessToken', data?.access_token);
      await SecureStore.setItemAsync('refreshToken', data?.refresh_token);
    });
    yield put({ type: 'OTP_SAGA', token: data?.access_token });
    yield call(() =>
      navigation.navigate(fromResetOtp ? 'UserProfile' : 'Main')
    );
    if (fromResetOtp) yield put(switchPersonalSecurity('Security'));
  } else {
    yield put(saveUserAndPassInfo(data));
  }
}

//  USERNAME AND PASSWORD
function* usernameAndPasswordSaga(action) {
  const { navigation } = action;
  const credentials = yield select((state) => state.profile.credentials);
  const loginStartInfo = yield select((state) => state.profile.loginStartInfo);
  const { login, password } = credentials;

  yield put(toggleUserInfoLoading(true));

  const userAndPassInfo = yield call(
    usernameAndPasswordForm,
    login,
    password,
    loginStartInfo?.callbackUrl
  );
  yield put(saveUserAndPassInfo(userAndPassInfo));

  if (userAndPassInfo?.execution === 'LOGIN_OTP') {
    navigation.navigate('Login2Fa');
  }
  yield put(
    saveLoginStartInfo({
      ...loginStartInfo,
      callbackUrl: userAndPassInfo?.callbackUrl,
    })
  );

  // Sometimes OTP is disabled, therefore code block below should be executed
  if (userAndPassInfo?.code) {
    const code = userAndPassInfo?.code;
    const codeVerifier = yield select(
      (state) => state.profile.pkceInfo.codeVerifier
    );

    yield put({ type: 'CODE_TO_TOKEN_SAGA', code, codeVerifier, navigation });
  }
  yield put(toggleUserInfoLoading(false));

  // Till here
}

//  O T P    F O R    L O G I N
function* otpForLoginSaga(action) {
  const { otp, navigation, fromResetOtp } = action;
  const profile = yield select((state) => state.profile);
  const {
    userAndPassInfo,
    pkceInfo: { codeVerifier },
    forgotPassMode,
  } = profile;

  const loginData = yield call(loginOtp, otp, userAndPassInfo.callbackUrl);
  yield put(
    saveUserAndPassInfo({
      ...userAndPassInfo,
      callbackUrl: loginData?.callbackUrl,
    })
  );

  if (!forgotPassMode && !loginData?.errors?.length) {
    yield put({
      type: 'CODE_TO_TOKEN_SAGA',
      code: loginData?.code,
      codeVerifier,
      navigation,
      fromResetOtp,
    });
  } else {
    yield put({
      type: 'SAVE_FORGOT_PASS_INFO',
      forgotPassInfo: loginData,
    });
    if (loginData?.execution === 'UPDATE_PASSWORD') {
      navigation.navigate('SetNewPassword');
    }
  }
}

// RESET OTP
function* resetOtpSaga(action) {
  const { navigation } = action;
  const userAndPassInfo = yield select(
    (state) => state.profile.userAndPassInfo
  );
  const data = yield call(resetOtp, userAndPassInfo?.callbackUrl);
  if (data) {
    yield put(
      saveUserAndPassInfo({
        ...userAndPassInfo,
        callbackUrl: data?.callbackUrl,
      })
    );
    navigation.navigate('ResetOtpInstructions', { execution: data?.execution });
  }
}

// FORGOT PASSWORD
function* forgotPasswordSaga(action) {
  const { navigation } = action;
  const url = yield select(
    (state) => state.profile.loginStartInfo.passwordResetUrl
  );
  const forgotPassInfo = yield select((state) => state.profile.forgotPassInfo);
  const data = yield call(forgotPassword, url);
  if (data?.execution === 'RESET_PASSWORD_WITH_CODE') {
    yield put({
      type: 'SAVE_FORGOT_PASS_INFO',
      forgotPassInfo: { ...forgotPassInfo, ...data },
    });
    navigation.navigate('ForgotPassword');
  }
}

// SEND FORGOT PASSWORD CODE
function* forgotPasswordCodeSaga() {
  yield put(toggleLoading(true));

  const url = yield select((state) => state.profile.forgotPassInfo.callbackUrl);
  const forgotPassInfo = yield select((state) => state.profile.forgotPassInfo);
  const data = yield call(forgotPasswordCode, url, forgotPassInfo?.username);
  if (data?.execution === 'RESET_PASSWORD_WITH_CODE' && !data?.errors?.length) {
    yield put({ type: 'TOGGLE_TIMER', timerVisible: true });
  }
  yield put(toggleLoading(false));

  yield put({
    type: 'SAVE_FORGOT_PASS_INFO',
    forgotPassInfo: { ...forgotPassInfo, ...data },
  });
}

// FORGOT PASSWORD ENTER CODE
function* forgotPassEnterCodeSaga(action) {
  const { navigation } = action;
  const forgotPassInfo = yield select((state) => state.profile.forgotPassInfo);
  let { callbackUrl, username, code } = forgotPassInfo;
  username = username.toLowerCase();

  const data = yield call(forgotPasswordEnterCode, callbackUrl, username, code);
  if (data?.execution === 'LOGIN_OTP') {
    yield put(saveUserAndPassInfo(data));
    yield put({ type: 'TOGGLE_FORGOT_PASS_MODE', forgotPassMode: true });
    navigation.navigate('Login2Fa', { type: 'forgotPassword' });
  }
  yield put({
    type: 'SAVE_FORGOT_PASS_INFO',
    forgotPassInfo: { ...forgotPassInfo, ...data },
  });
}

// SET NEW PASSWORD SAGA
function* setNewPassSaga(action) {
  const { pass, confirmPass, navigation } = action;
  const url = yield select((state) => state.profile.forgotPassInfo.callbackUrl);
  const codeVerifier = yield select(
    (state) => state.profile.pkceInfo.codeVerifier
  );

  const data = yield call(setNewPassword, url, pass, confirmPass);
  if (data?.code) {
    yield put({
      type: 'CODE_TO_TOKEN_SAGA',
      code: data?.code,
      codeVerifier,
      navigation,
    });
  }
}

//  FETCH COUNTRIES
function* fetchCountriesSaga() {
  const countries = yield call(fetchCountries);
  yield put(saveCountries(countries));
  yield put(saveCountriesConstant(countries));
}

//  FETCH USER INFO
function* fetchUserInfoSaga(action) {
  const { fromRegistration } = action;
  yield put(toggleUserInfoLoading(true));

  const userInfo = yield call(fetchUserInfoUtil);
  if (userInfo) yield put(saveUserInfo(userInfo));

  const token = yield call(refreshToken);
  if (typeof token === 'string') {
    yield put({ type: 'OTP_SAGA', token });
  }

  if (fromRegistration && userInfo?.verificationToolEnabled) {
    yield call(launchSumsubSdk);
  }
  yield put(toggleUserInfoLoading(false));
}

//  UPDATE USER INFO
function* saveUserInfoSaga() {
  const userData = yield select(getUserData);
  const data = yield call(updateUserData, userData);
  if (data?.status >= 200 && data?.status < 300) {
    yield put(fetchUserInfo());
    yield put(togglePersonalInfoModal(false));
  }
}

//  UPDATE PASSWORD
function* updatePasswordSaga(action) {
  const { curentPassword, newPassword, repeatPassword, hide } = action;
  const data = yield call(
    updatePassword,
    curentPassword,
    newPassword,
    repeatPassword
  );
  if (data?.status >= 200 && data?.status < 300) {
    yield call(hide);
  }
}

//  VERIFY PHONE NUMBER
function* verifyPhoneNumberSaga(action) {
  const { phoneNumber, phoneCountry } = action;
  yield call(verifyPhoneNumber, phoneNumber, phoneCountry);
}

//  UPDATE PHONE NUMBER
function* updatePhoneNumberSaga(action) {
  const {
    phoneNumber,
    phoneCountry,
    verificationNumber,
    setCode,
    setUserInfoVariable,
  } = action;
  const data = yield call(
    updatePhoneNumber,
    phoneNumber,
    phoneCountry,
    verificationNumber
  );
  if (data?.status >= 200 && data?.status < 300) {
    yield call(() => setCode(null));
    yield call(() => setUserInfoVariable(null));
    yield put(fetchUserInfo());
    yield put(togglePhoneNumberModal(false));
  }
}

//  TOGGLE SUBSCRIPTION
function* toggleSubscriptionSaga(action) {
  const { value } = action;
  const userInfo = yield select((state) => state.profile.userInfo);

  yield put(saveUserInfo({ ...userInfo, emailUpdates: value }));
  const data = yield call(value ? subscribeMail : unsubscribeMail);
  if (!(data?.status >= 200 && data?.status < 300)) {
    yield put(saveUserInfo({ ...userInfo, emailUpdates: !value }));
  }
}

//  CREDENTIALS FOR EMAIL
function* credentialsForEmailSaga(action) {
  const { OTP } = action;
  const sms = yield select((state) => state.modals.smsAuthModalVisible);
  const google = yield select((state) => state.modals.googleOtpModalVisible);

  const data = yield call(getOtpChangeToken, OTP, 'EMAIL');
  if (data) {
    yield call(sendEmailOtp);
    yield put(saveOtpChangeToken(data?.changeOTPToken));

    if (sms) yield put(toggleSmsAuthModal(false));
    if (google) yield put(toggleGoogleOtpModal(false));
    yield delay(1000);
    yield put(toggleEmailAuthModal(true));
  }
}

//  CREDENTIALS FOR GOOGLE
function* credentialsForGoogleSaga(action) {
  const { OTP } = action;
  const data = yield call(getOtpChangeToken, OTP, 'TOTP');

  if (data) {
    yield put(toggleEmailAuthModal(false));
    yield put(saveOtpChangeToken(data?.changeOTPToken));
    yield put(saveTotpSecretObj(data?.totp));
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
    yield put(toggleEmailAuthModal(false));
    const token = yield call(refreshToken);
    if (typeof token === 'string') {
      yield put({ type: 'OTP_SAGA', token });
    }
  }
}

//  ACTIVATE GOOGLE
function* activateGoogleSaga(action) {
  const { OTP, setGoogleAuthLoading } = action;
  yield call(() => setGoogleAuthLoading(true));

  const otpChangeToken = yield select((state) => state.profile.otpChangeToken);
  const totpSecret = yield select(
    (state) => state.profile.totpSecretObj.totpSecret
  );
  const status = yield call(activateGoogleOtp, otpChangeToken, OTP, totpSecret);

  if (status >= 200 && status < 300) {
    yield put(saveOtpChangeToken(null));
    yield put(setCurrentSecurityAction(null));
    yield put(toggleGoogleAuthModal(false));
    const token = yield call(refreshToken);
    if (typeof token === 'string') {
      yield put({ type: 'OTP_SAGA', token });
    }
  }
  yield call(() => setGoogleAuthLoading(false));
}

// OTP SAGA
function* otpSaga(action) {
  const { token } = action;
  const otpType = jwt_decode(token)?.otpType;
  yield put(setEmailAuth(otpType === 'EMAIL'));
  yield put(setGoogleAuth(otpType === 'TOTP'));
  yield put(setSmsAuth(otpType === 'SMS'));
}

// RESEND SAGA
function* resendSaga(action) {
  const state = yield select((state) => state.profile);
  const { url, emailVerification, smsEmailAuth, login2Fa } = action;
  const { googleAuth } = state;

  // Email Verification After Registration
  if (emailVerification) {
    const data = yield call(resendEmail, url);
    if (data) yield put(saveVerificationInfo(data));
  }

  // Little bottomsheet for sms/email otp
  if (smsEmailAuth) yield call(googleAuth ? sendEmailOtp : sendOtp);

  // Login 2FA
  if (login2Fa) {
    const data = yield call(resendEmail, url);
    if (data) yield put(saveUserAndPassInfo(data));
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
  yield takeLatest('CODE_TO_TOKEN_SAGA', codeToTokenSaga);
  yield takeLatest('FORGOT_PASSWORD_SAGA', forgotPasswordSaga);
  yield takeLatest('SEND_FORGOT_PASS_CODE', forgotPasswordCodeSaga);
  yield takeLatest('FORGOT_PASS_ENTER_CODE', forgotPassEnterCodeSaga);
  yield takeLatest('SET_NEW_PASS_SAGA', setNewPassSaga);

  yield takeLatest('RESET_OTP', resetOtpSaga);
  yield takeLatest('LOGOUT', logoutSaga);
  yield takeLatest('VERIFY_ACCOUNT', verifyAccountSaga);
  yield takeLatest('RESEND_SAGA', resendSaga);
}
