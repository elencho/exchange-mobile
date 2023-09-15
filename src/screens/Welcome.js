import React, { useCallback, useEffect } from 'react';

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import Logo from '../assets/images/LogoWhite.svg';
import {
  startLoginAction,
  startRegistrationAction,
} from '../redux/profile/actions';
import GeneralError from '../components/GeneralError';
import { errorHappenedHere } from '../utils/appUtils';

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

import { fetchCountries, setLanguage } from '../redux/profile/actions';
import { checkReadiness, fetchTranslations } from '../utils/appUtils';
import { addResources, switchLanguage } from '../utils/i18n';
import { useFocusEffect } from '@react-navigation/native';
import useNotificationsAndroid from './useNotificationsAndroid';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();
  useNotificationsAndroid();

  useFocusEffect(
    useCallback(() => {
      startApp();
    }, [])
  );

  const startApp = async () => {
    dispatch({ type: 'RESET_STATE' });
    await AsyncStorage.removeItem('webViewVisible');

    const workingVersion = await isWorkingVersion();
    const updateNeeded = await checkVersion();

    await SecureStore.getItemAsync('accessToken').then((t) => {
      if (t) {
        const email = jwt_decode(t)?.email;
        getBiometricEnabled(email, updateNeeded, workingVersion);
      } else {
        if (updateNeeded) {
          navigation.navigate('UpdateAvailable');
        } else if (workingVersion) {
          navigation.navigate('Maintanance');
        } else if (!updateNeeded && !workingVersion) {
          navigation.navigate('Welcome');
        }
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
    const timeDifference = lastTimeOpen
      ? Date.now() - JSON.parse(lastTimeOpen)
      : false;
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

    let parsedUsers = JSON.parse(enabled);
    const userIndex = parsedUsers?.find(
      (u) => u?.user === user && u?.enabled === true
    );
    if (workingVersion) {
      navigation.navigate('Maintanance');
    }

    if (updateNeeded) {
      navigation.navigate('UpdateAvailable');
    }

    if (userIndex && timeDifference >= 30000 && !isLoggedIn) {
      navigation.navigate('Resume', {
        fromSplash: true,
        version: updateNeeded,
        workingVersion: workingVersion,
      });
    } else if (!updateNeeded && !workingVersion) {
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const isWorkingVersion = async () => {
    try {
      const version = '2.534.0';
      // const version = DeviceInfo.getVersion();
      const { status } = await checkReadiness(version, Platform.OS);
      if (status !== 'UP') {
        return true;
      } else {
        return false;
      }
    } catch {
      return true;
    }
  };

  const fetchData = async () => {
    await fetchTranslations()
      .then((res) => {
        const languages = Object.keys(res);
        for (let i = 0; i < languages.length; i++) {
          const translations = res[languages[i]].translation;
          Object.keys(translations).forEach((key) => {
            if (translations[key] === null) translations[key] = '';
          });
          addResources(languages[i], 'translation', translations);
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
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require('../assets/images/WelcomeBackground.png')}
      >
        <View style={styles.container}>
          <Logo style={styles.logo} />
          <AppText header style={styles.primary}>
            Welcome to Cryptal
          </AppText>
          <AppText body style={styles.subtext}>
            Secure and Simple · Your Gateway to the Global Crypto Universe
          </AppText>
          <View style={styles.paddingHorizontal}>
            <GeneralError
              style={styles.error}
              show={errorHappenedHere('Welcome')}
            />

            <AppButton
              text="Login"
              style={styles.button}
              onPress={startLogin}
            />
            <PurpleText
              style={{ fontSize: 16 }}
              text="Registration"
              onPress={startRegistration}
            />
          </View>
        </View>
        <LanguageSwitcher />
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

    justifyContent: 'center',
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

  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 30,
    marginBottom: 11,
    textAlign: 'center',
    width: '100%',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
  imageBackground: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
});
