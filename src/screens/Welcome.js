import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';
import images from '../constants/images';

export default function Welcome() {
  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <Image source={images.Logo} style={styles.logo} />

      <AppText header style={styles.primary}>
        Welcome to Cryptal
      </AppText>

      <AppText style={styles.secondary}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </AppText>

      <AppButton text="Login" style={styles.button} />
      <PurpleText text="Registration" />
    </ImageBackground>
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
