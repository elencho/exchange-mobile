import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import images from '../constants/images';
import { startLoginAction } from '../redux/profile/actions';

export default function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const startLogin = () => dispatch(startLoginAction(navigation));

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <ImageBackground source={images.Background} style={styles.container}>
        <Image source={images.Logo} style={styles.logo} />

        <AppText header style={styles.primary}>
          Welcome to Cryptal
        </AppText>

        <AppText style={styles.secondary}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </AppText>

        <AppButton text="Login" style={styles.button} onPress={startLogin} />
        <PurpleText text="Registration" />
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
