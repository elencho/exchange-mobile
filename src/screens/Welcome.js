import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import images from '../constants/images';
import Logo from '../assets/images/Logo.svg';
import {
  fetchCountries,
  saveUserInfo,
  setLanguage,
  startLoginAction,
  startRegistrationAction,
} from '../redux/profile/actions';
import { addResources, switchLanguage } from '../utils/i18n';
import GeneralError from '../components/GeneralError';
import {
  checkReadiness,
  errorHappenedHere,
  fetchTranslations,
} from '../utils/appUtils';
import {
  getCountryName,
  APP_ID,
  packageName,
  currentVersion,
} from '../constants/system';

import SplashScreen from 'react-native-splash-screen';

import VersionCheck from 'react-native-version-check';

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();

  const checkVersion = async () => {
    try {
      const countryName = await getCountryName;

      const storeData = await VersionCheck.getLatestVersion({
        forceUpdate: true,
        appID: APP_ID,
        packageName: packageName,
        country: countryName.toLowerCase() || 'ge',
      });

      const latestVersion = await storeData;
      const updateNeeded = await VersionCheck.needUpdate({
        currentVersion: currentVersion,
        latestVersion: latestVersion,
      });

      if (updateNeeded && updateNeeded.isNeeded) {
        navigation.navigate('UpdateAvailable');
        SplashScreen.hide();
      }
      SplashScreen.hide();
    } catch (error) {
      console.log(error);
    }
  };

  const isWorkingVersion = async () => {
    const version = DeviceInfo.getVersion();

    const { status } = await checkReadiness(version);
    if (status === 'DOWN') {
      navigation.navigate('Maintanance');
      return false;
    } else return true;
  };

  useFocusEffect(() => {
    checkVersion();
    if (isWorkingVersion()) {
      SecureStore.getItemAsync('accessToken').then((t) => {
        if (t) navigation.navigate('Main');
        else SplashScreen.hide();
      });
    } else SplashScreen.hide();

    dispatch(saveUserInfo({}));
  });

  useEffect(() => {
    changeNavigationBarColor(colors.PRIMARY_BACKGROUND, true);

    fetchTranslations()
      .then((res) => {
        const languages = Object.keys(res);
        for (let i = 0; i < languages.length; i++) {
          addResources(
            languages[i],
            'translation',
            res[languages[i]].translation
          );
        }
      })
      .catch((err) => console.log(err));
    SecureStore.getItemAsync('language')
      .then((l) => {
        switchLanguage(l ? l : 'en');
        dispatch(setLanguage(l ? l : 'en'));
      })
      .catch((err) => console.log(err));

    dispatch(fetchCountries());
  }, []);

  const startLogin = () => {
    dispatch(startLoginAction(navigation));
  };
  const startRegistration = () => dispatch(startRegistrationAction(navigation));

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <ImageBackground source={images.Background} style={styles.container}>
        <>
          <Logo style={styles.logo} />
          <AppText header style={styles.primary}>
            Welcome to Cryptal
          </AppText>

          {/* <AppText style={styles.secondary}>{auth}</AppText> */}

          <GeneralError
            style={styles.error}
            show={errorHappenedHere('Welcome')}
          />

          <AppButton text="Login" style={styles.button} onPress={startLogin} />
          <PurpleText text="Registration" onPress={startRegistration} />
        </>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    marginTop: 66,
    marginBottom: 32,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20%',
  },
  error: {
    marginTop: 20,
  },
  flex: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
  logo: {
    width: 48,
    height: 54,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 30,
    marginBottom: 12,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
});
