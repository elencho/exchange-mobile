import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import Login2FaModal from '../components/Login/Login2FaModal';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import images from '../constants/images';
import { toggleLogin2FaModal } from '../redux/modals/actions';
import {
  setCredentials,
  usernameAndPasswordAction,
} from '../redux/profile/actions';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.profile.credentials);

  const typePassword = (t) =>
    dispatch(setCredentials({ ...credentials, password: t }));
  const typeLogin = (t) =>
    dispatch(setCredentials({ ...credentials, login: t }));

  const handleLogin = () => {
    // dispatch(toggleLogin2FaModal(true));
    dispatch(usernameAndPasswordAction(navigation));
  };

  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <Image source={images.Logo} style={styles.logo} />

      <AppText header style={styles.primary}>
        Welcome to Cryptal
      </AppText>

      <AppInput
        placeholder="Enter Email"
        style={styles.email}
        onChangeText={typeLogin}
        value={credentials.login}
      />
      <AppInput
        placeholder="Enter Password"
        onChangeText={typePassword}
        value={credentials.password}
        style={styles.password}
        right={<PurpleText text="Forgot?" style={{ marginLeft: 10 }} />}
      />

      <AppButton text="Login" style={styles.button} onPress={handleLogin} />
      <AppText style={styles.secondary}>
        New User? <PurpleText text="Register" />
      </AppText>

      <Login2FaModal />
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
    marginBottom: 42,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
});
