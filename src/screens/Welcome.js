import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import Logo from '../assets/images/Logo.svg';
import {
  startLoginAction,
  startRegistrationAction,
} from '../redux/profile/actions';
import GeneralError from '../components/GeneralError';
import { errorHappenedHere } from '../utils/appUtils';
import { useNavigation } from '@react-navigation/native';

export default function Welcome({}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <AppText header style={styles.primary}>
          Welcome to Cryptal
        </AppText>
        <AppText body style={styles.subtext}>
          Secure and Simple · Your Gateway to the Global Crypto Universe
        </AppText>

        <GeneralError
          style={styles.error}
          show={errorHappenedHere('Welcome')}
        />

        <AppButton text="Login" style={styles.button} onPress={startLogin} />
        <PurpleText text="Registration" onPress={startRegistration} />
      </View>
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
    paddingHorizontal: '12%',
    backgroundColor: colors.SECONDARY_BACKGROUND,
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
    textAlign: 'center',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginTop: 12,
    textAlign: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
});
