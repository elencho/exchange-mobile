import { StyleSheet, View } from 'react-native';
import React, { useState, memo, useCallback } from 'react';
import TouchID from '../assets/images/TouchID-Purple';
import FaceID from '../assets/images/Face_ID-pruple';

import {
  authenticateAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication';
import colors from '../constants/colors';
import AppText from '../components/AppText';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';
import { fetchUserInfo } from '../redux/profile/actions';
import { useFocusEffect } from '@react-navigation/native';
import { logout } from '../utils/userProfileUtils';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Resume = ({ navigation, route }) => {
  const state = useSelector((state) => state?.profile);

  const dispatch = useDispatch();

  const { userInfo } = state;
  const [bioType, setBioType] = useState(null);
  const { fromSplash, version, workingVersion } = route?.params;

  useFocusEffect(
    useCallback(() => {
      SplashScreen.hide();
      dispatch(fetchUserInfo());
      handleBiometricIcon();
      startAuth(fromSplash);
    }, [fromSplash])
  );

  const handleBiometricIcon = async () => {
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
  };

  const startAuth = async () => {
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
      await AsyncStorage.setItem('isLoggedIn', 'true');
    }
  };

  const startLogin = async () => {
    logout(dispatch);
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
