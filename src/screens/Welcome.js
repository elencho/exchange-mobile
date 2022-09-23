import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import images from '../constants/images';
import {
  fetchCountries,
  setLanguage,
  startLoginAction,
  startRegistrationAction,
} from '../redux/profile/actions';
import { switchLanguage } from '../utils/i18n';
import GeneralError from '../components/GeneralError';

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const { generarError } = state;

  useFocusEffect(() => {
    SecureStore.getItemAsync('accessToken').then((token) => {
      if (token) {
        navigation.navigate('Main');
      } else setLoading(false);
    });
  });

  useEffect(() => {
    SecureStore.getItemAsync('language')
      .then((l) => {
        if (!l) {
          switchLanguage('en');
          dispatch(setLanguage('en'));
        } else {
          dispatch(setLanguage(l));
        }
      })
      .catch((err) => console.log(err));

    dispatch(fetchCountries());
  }, []);

  const startLogin = () => dispatch(startLoginAction(navigation));
  const startRegistration = () => dispatch(startRegistrationAction(navigation));

  const auth = Constants.manifest.extra.auth;

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
            <Image source={images.Logo} style={styles.logo} />

            <AppText header style={styles.primary}>
              Welcome to Cryptal
            </AppText>

            <AppText style={styles.secondary}>{auth}</AppText>

            {generarError ? (
              <View style={{ marginTop: 20 }}>
                <GeneralError />
              </View>
            ) : null}

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
