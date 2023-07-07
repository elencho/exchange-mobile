import { StyleSheet, View } from 'react-native';
import React, { useState, memo, useCallback } from 'react';
import TouchID from '../assets/images/TouchID-Purple';
import FaceID from '../assets/images/Face_ID-pruple';
import * as SecureStore from 'expo-secure-store';

import {
  authenticateAsync,
  supportedAuthenticationTypesAsync,
  cancelAuthenticate,
} from 'expo-local-authentication';
import colors from '../constants/colors';
import AppText from '../components/AppText';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';
import {
  fetchUserInfo,
  switchPersonalSecurity,
} from '../redux/profile/actions';
import { useFocusEffect } from '@react-navigation/native';
import { logoutUtil } from '../utils/userProfileUtils';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
  toggleWebViewVisible,
} from '../redux/modals/actions';
import { IS_ANDROID } from '../constants/system';
import { t } from 'i18next';

const Resume = ({ navigation, route }) => {
  const state = useSelector((state) => state?.profile, shallowEqual);
  const withdrawalConfirmModalVisible = useSelector(
    (state) => state?.modals?.withdrawalConfirmModalVisible,
    shallowEqual
  );
  const { fromSplash, version, workingVersion } = route?.params;
  const dispatch = useDispatch();

  const { userInfo, Personal_Security } = state;
  const [bioType, setBioType] = useState(null);
  const resumed = route?.key === 'Resume-uniqueKey';

  useFocusEffect(
    useCallback(() => {
      dispatch(toggleWebViewVisible(false));
      SplashScreen.hide();
      dispatch(fetchUserInfo());
      handleBiometricIcon();
      startAuth(fromSplash);
    }, [fromSplash])
  );

  const handleBiometricIcon = useCallback(async () => {
    try {
      await supportedAuthenticationTypesAsync()
        .then((data) => {
          if (data[0] === 2) {
            setBioType('FACEID');
          } else {
            setBioType('TOUCHID');
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const startAuthActions = async () => {
    if (IS_ANDROID && withdrawalConfirmModalVisible) {
      dispatch(toggleGoogleOtpModal(false));
      dispatch(toggleEmailAuthModal(false));
      dispatch(toggleSmsAuthModal(false));
    }
    if (Personal_Security === 'Security') {
      dispatch(switchPersonalSecurity('Security'));
    }
    dispatch(toggleWebViewVisible(true));
    await AsyncStorage.setItem('isLoggedIn', 'true');
  };

  const startAuth = useCallback(async (fromSplash) => {
    if (IS_ANDROID) await cancelAuthenticate();
    const result = await authenticateAsync({
      promptMessage: t('Log in with fingerprint or faceid'),
      cancelLabel: t('Abort'),
    });

    if (result?.success) {
      if (version || workingVersion || resumed) {
        navigation.goBack();
      } else if (fromSplash) {
        navigation.navigate('Main');
      } else {
        navigation.goBack();
      }
      startAuthActions();
    } else if (
      result?.error === 'passcode_not_set' ||
      result?.error === 'not_enrolled'
    ) {
      startLogin();
    }
  }, []);

  const startLogin = async () => {
    const refresh_token = await SecureStore.getItemAsync('refreshToken');
    const status = await logoutUtil(refresh_token);
    if (status === 204) {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      navigation.navigate('Welcome');

      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <View style={styles.container}>
      {bioType === 'FACEID' ? <FaceID /> : <TouchID />}
      <AppText header style={styles.primary}>
        Welcome Back, {userInfo?.firstName}!
      </AppText>
      <AppText calendarDay style={styles.second}>
        {bioType === 'FACEID'
          ? 'face id subtitle description'
          : 'touch id subtitle description'}
      </AppText>
      <AppButton
        text={
          bioType === 'FACEID' ? 'Login with Face ID' : 'Login with Touch ID'
        }
        style={styles.button}
        onPress={startAuth}
      />
      <PurpleText text="Standard Log In" onPress={startLogin} />
    </View>
  );
};

export default memo(Resume);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 25,
    marginBottom: 12,
    textAlign: 'center',
  },
  second: {
    color: colors.SECONDARY_TEXT,

    marginBottom: 80,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 44,
    marginBottom: 38,
  },
});
