import { StyleSheet, View } from 'react-native';
import React, { useState, memo, useCallback } from 'react';
import TouchID from '../assets/images/TouchID-Purple';
import FaceID from '../assets/images/Face_ID-pruple';
import * as SecureStore from 'expo-secure-store';

import {
  authenticateAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication';
import colors from '../constants/colors';
import AppText from '../components/AppText';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';
import { fetchUserInfo } from '../redux/profile/actions';
import { useFocusEffect } from '@react-navigation/native';
import { logoutUtil } from '../utils/userProfileUtils';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleWebViewVisible } from '../redux/modals/actions';

const Resume = ({ navigation, route }) => {
  const state = useSelector((state) => state?.profile, shallowEqual);
  const { fromSplash, version, workingVersion } = route?.params;
  const dispatch = useDispatch();

  const { userInfo } = state;
  const [bioType, setBioType] = useState(null);

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

  const startAuth = useCallback(async (fromSplash) => {
    const result = await authenticateAsync({
      promptMessage: 'Log in with fingerprint or faceid',
      cancelLabel: 'Abort',
    });

    if (result.success) {
      if (version || workingVersion) {
        navigation.goBack();
      } else if (fromSplash) {
        navigation.navigate('Main');
      } else {
        navigation.goBack();
      }
      dispatch(toggleWebViewVisible(true));
      await AsyncStorage.setItem('isLoggedIn', 'true');
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
