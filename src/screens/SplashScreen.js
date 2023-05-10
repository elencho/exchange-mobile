import React, { useEffect, useState, useCallback } from 'react';

import { BackHandler, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import VersionCheck from 'react-native-version-check';
import * as SecureStore from 'expo-secure-store';
import DeviceInfo from 'react-native-device-info';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getCountryName,
  APP_ID,
  packageName,
  currentVersion,
} from '../constants/system';
import colors from '../constants/colors';

import {
  fetchCountries,
  fetchUserInfo,
  saveUserInfo,
  setLanguage,
} from '../redux/profile/actions';
import { checkReadiness, fetchTranslations } from '../utils/appUtils';
import { addResources, switchLanguage } from '../utils/i18n';
import { useFocusEffect } from '@react-navigation/native';

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { userInfo } = state;
  const [loadedUser, setLoadedUser] = useState({});

  useEffect(() => {}, [userInfo]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserInfo());
      userInfo && setLoadedUser(userInfo);
      startApp();
    }, [])
  );

  const startApp = async () => {
    await checkVersion();
    if (isWorkingVersion()) {
      SecureStore.getItemAsync('accessToken').then((t) => {
        if (t) {
          getBiometricEnabled(loadedUser?.email);
        } else {
          dispatch(saveUserInfo({}));
          navigation.navigate('Welcome');
        }
      });
    }
    await changeNavigationBarColor(colors.PRIMARY_BACKGROUND, true);
    await fetchData();
    SplashScreen.hide();
  };

  const getBiometricEnabled = async (user) => {
    const enabled = await AsyncStorage.getItem('BiometricEnabled');

    let parsedUsers = JSON.parse(enabled);
    const userIndex = parsedUsers?.find(
      (u) => u?.user === user && u?.enabled === true
    );
    if (userIndex) {
      navigation.navigate('Resume');
    } else {
      navigation.navigate('Main');
    }
  };

  BackHandler.addEventListener('hardwareBackPress', () => true);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isWorkingVersion = async () => {
    const version = DeviceInfo.getVersion();

    const { status } = await checkReadiness(version, Platform.OS);
    if (status === 'DOWN') {
      navigation.navigate('Maintanance');
      return false;
    } else return true;
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

  return (
    <View>
      {/* REMOVE WHEN TESTED */}
      <Text>SplashScreen</Text>
    </View>
  );
};

export default Splash;
