import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import WithKeyboard from '../components/WithKeyboard';
import GeneralError from '../components/GeneralError';
import PurpleText from '../components/PurpleText';
import Logo from '../assets/images/Logo.svg';

import colors from '../constants/colors';
import images from '../constants/images';
import {
  setCredentials,
  startRegistrationAction,
  usernameAndPasswordAction,
} from '../redux/profile/actions';
import { errorHappenedHere } from '../utils/appUtils';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { credentials, userProfileLoading },
  } = state;
  const login = credentials.login;
  const password = credentials.password;

  const [error, setError] = useState(false);
  const validate = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
    login
  );

  useEffect(() => {
    error && setError(false);
  }, [credentials]);

  useFocusEffect(
    useCallback(() => {
      return () =>
        setTimeout(() => {
          dispatch(setCredentials({}));
        }, 400);
    }, [])
  );

  const typePassword = (t) =>
    dispatch(setCredentials({ ...credentials, password: t }));
  const typeLogin = (t) =>
    dispatch(setCredentials({ ...credentials, login: t }));

  const handleLogin = () => {
    if (!login || !password || !validate) {
      setError(true);
    } else {
      dispatch(usernameAndPasswordAction(navigation));
    }
  };
  const forgotPassword = () =>
    dispatch({ type: 'FORGOT_PASSWORD_SAGA', navigation });

  const register = () => dispatch(startRegistrationAction(navigation));

  const errorText = () =>
    error && login?.trim() && !validate ? 'Enter Valid Email' : null;

  return (
    <ImageBackground source={images.Background} style={{ flex: 1 }}>
      <WithKeyboard padding flexGrow contentContainerStyle={styles.container}>
        <Logo style={styles.logo} />
        <View>
          <AppText header style={styles.primary}>
            Welcome to Cryptal
          </AppText>
        </View>

        <View style={styles.height42}>
          <GeneralError show={errorHappenedHere('Login')} />
        </View>

        <AppInput
          style={styles.email}
          onChangeText={typeLogin}
          value={login}
          error={error && (!login || !validate)}
          errorText={errorText()}
          label={'Enter Email'}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        />
        <AppInput
          secureTextEntry
          onChangeText={typePassword}
          value={password}
          style={styles.password}
          error={error && !password}
          right={
            <PurpleText
              text="Forgot?"
              style={{ marginLeft: 10 }}
              onPress={forgotPassword}
            />
          }
          label={'Enter Password'}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        />

        <AppButton
          text="Login"
          style={styles.button}
          onPress={handleLogin}
          loading={userProfileLoading}
        />

        <View style={{ marginBottom: 20 }}>
          <AppText style={styles.secondary}>
            {t('New User?')}{' '}
            <PurpleText text={t('Register')} onPress={register} />
          </AppText>
        </View>
      </WithKeyboard>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 84,
    marginBottom: 40,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20%',
  },
  email: {
    marginBottom: 22,
    width: '100%',
  },
  height42: {
    marginBottom: 14,
    marginTop: 20,
    width: '100%',
  },
  logo: {
    width: 48,
    height: 54,
  },
  password: {
    width: '100%',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 30,
    textAlign: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 21,
  },
});
