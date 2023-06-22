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

const Splash = ({ navigation }) => {
  //TODO: REMOVE
  return <View />;
};

export default Splash;
