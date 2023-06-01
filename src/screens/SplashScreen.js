import React, { useCallback } from 'react';

import { BackHandler, View } from 'react-native';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import VersionCheck from 'react-native-version-check';
import * as SecureStore from 'expo-secure-store';
import DeviceInfo from 'react-native-device-info';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import {
  getCountryName,
  APP_ID,
  packageName,
  currentVersion,
} from '../constants/system';
import colors from '../constants/colors';

import { fetchCountries, setLanguage } from '../redux/profile/actions';
import { checkReadiness, fetchTranslations } from '../utils/appUtils';
import { addResources, switchLanguage } from '../utils/i18n';
import { useFocusEffect } from '@react-navigation/native';
import useNotifications from './useNotifications';

const Splash = ({ navigation }) => {
  useNotifications();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      startApp();
    }, [])
  );

  const startApp = async () => {
    const workingVersion = await isWorkingVersion();
    const updateNeeded = await checkVersion();

    await SecureStore.getItemAsync('accessToken').then((t) => {
      if (t) {
        const email = jwt_decode(t)?.email;
        getBiometricEnabled(email, updateNeeded, workingVersion);
      } else if (!workingVersion && !updateNeeded) {
        navigation.navigate('Welcome');
      }
    });

    await changeNavigationBarColor(colors.PRIMARY_BACKGROUND, true);
    await fetchData();

    SplashScreen.hide();
  };

  const getBiometricEnabled = async (email, updateNeeded, workingVersion) => {
    const enabled = await AsyncStorage.getItem('BiometricEnabled');
    const user = email;
    const lastTimeOpen = await AsyncStorage.getItem('isOpenDate');
    const timeDifference = Date.now() - JSON.parse(lastTimeOpen);

    let parsedUsers = JSON.parse(enabled);
    const userIndex = parsedUsers?.find(
      (u) => u?.user === user && u?.enabled === true
    );
    if (userIndex && timeDifference >= 30000) {
      navigation.navigate('Resume', {
        fromSplash: true,
        version: updateNeeded,
        workingVersion: workingVersion,
      });
    } else {
      navigation.navigate('Main');
    }
  };

  BackHandler.addEventListener('hardwareBackPress', () => true);

  const checkVersion = useCallback(async () => {
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const isWorkingVersion = async () => {
    const version = DeviceInfo.getVersion();
    const { status } = await checkReadiness(version, Platform.OS);
    if (status !== 'DOWN') {
      navigation.navigate('Maintanance');
      return true;
    }
  };

  const fetchData = async () => {
    await fetchTranslations()
      .then((res) => {
        const languages = Object.keys(res);
        for (let i = 0; i < languages.length; i++) {
          addResources(
            languages[i],
            'translation',
            res[languages[i]].translation
          );
        }
        SecureStore.getItemAsync('language')
          .then((l) => {
            switchLanguage(l ? l : 'en');
            dispatch(setLanguage(l ? l : 'en'));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    await dispatch(fetchCountries());
  };
  const onStateChange = (state) => {
    dispatch({
      type: 'SET_STACK_NAVIGATION_ROUTE',
      stackRoute: state.routes[state.routes.length - 1].name,
    });
    if (generalError)
      dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  };

  return <View />;
};

export default Splash;
