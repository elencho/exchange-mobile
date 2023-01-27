import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

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
import { errorHappenedHere, fetchTranslations } from '../utils/appUtils';

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useFocusEffect(() => {
    dispatch(saveUserInfo({}));
    alert(`tokenis amogebamde laini`);
    SecureStore.getItemAsync('accessToken').then((token) => {
      alert(`token: ${token}`);
      if (token) navigation.navigate('Main');
      alert(`loading: ${loading}`);
    });
    setLoading(false);
  });

  useEffect(() => {
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
    alert('login start button pressed');
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
        {loading ? (
          <ActivityIndicator size="large" color="white" style={styles.loader} />
        ) : (
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

            <AppButton
              text="Login"
              style={styles.button}
              onPress={startLogin}
            />
            <PurpleText text="Registration" onPress={startRegistration} />
          </>
        )}
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
