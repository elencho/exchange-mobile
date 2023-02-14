import React from 'react';
import { Linking, Platform, StyleSheet } from 'react-native';

import Background from '../components/Background';
import Update from '../assets/images/Update';
import AppText from '../components/AppText';
import colors from '../constants/colors';
import AppButton from '../components/AppButton';

export default function UpdateAvailable() {
  const isIos = Platform.OS === 'ios';
  const androidLink = 'https://play.google.com/';
  const iosLink = 'https://apps.apple.com/';

  const update = () =>
    Linking.openURL(isIos ? iosLink : androidLink)
      .then(() => {})
      .catch((err) => console.log(err));

  return (
    <Background style={styles.container}>
      <Update />

      <AppText header style={styles.header}>
        Update Available
      </AppText>
      <AppText style={styles.secondary}>
        We recommended you to update app to have better experience
      </AppText>

      <AppButton text="Update" style={styles.button} onPress={update} />
    </Background>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    marginTop: 56,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '21%',
    paddingBottom: '41%',
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginTop: 5,
    marginBottom: 12,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginHorizontal: '10%',
    textAlign: 'center',
    lineHeight: 22,
  },
});
