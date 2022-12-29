import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import GeneralError from '../components/GeneralError';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import images from '../constants/images';
import {
  setCredentials,
  startRegistrationAction,
  usernameAndPasswordAction,
} from '../redux/profile/actions';
import { errorHappenedHere } from '../utils/appUtils';
import Logo from '../assets/images/Logo.svg';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { credentials, userProfileLoading },
  } = state;
  const login = credentials.login;
  const password = credentials.password;

  const [error, setError] = useState(false);

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
    if (!login || !password) {
      setError(true);
    } else {
      dispatch(usernameAndPasswordAction(navigation));
    }
  };
  const forgotPassword = () =>
    dispatch({ type: 'FORGOT_PASSWORD_SAGA', navigation });

  const register = () => dispatch(startRegistrationAction(navigation));

  const errorText = (type) => {
    if (error && !login && type === 'Login') return 'Enter Email';
    if (error && !password && type === 'Password') return 'Enter Password';
  };

  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <Logo style={styles.logo} />
      <AppText header style={styles.primary}>
        Welcome to Cryptal
      </AppText>

      <View style={styles.height42}>
        <GeneralError show={errorHappenedHere('Login')} />
      </View>

      <AppInput
        placeholder="Enter Email"
        style={styles.email}
        onChangeText={typeLogin}
        value={login}
        error={error && !login}
        errorText={errorText('Login')}
      />
      <AppInput
        secureTextEntry
        placeholder="Enter Password"
        onChangeText={typePassword}
        value={password}
        style={styles.password}
        error={error && !password}
        errorText={errorText('Password')}
        right={
          <PurpleText
            text="Forgot?"
            style={{ marginLeft: 10 }}
            onPress={forgotPassword}
          />
        }
      />

      <AppButton
        text="Login"
        style={styles.button}
        onPress={handleLogin}
        loading={userProfileLoading}
      />
      <AppText style={styles.secondary}>
        New User? <PurpleText text="Register" onPress={register} />
      </AppText>
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
    flex: 1,
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
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
});
