import React from 'react';
import { ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';

import Logo from '../assets/images/Logo';
import Gear from '../assets/images/Gear';
import AppText from '../components/AppText';

import images from '../constants/images';
import colors from '../constants/colors';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';

export default function Maintanance() {
  const goToSupport = () =>
    Linking.openURL('https://support.cryptal.com/hc/en-us/requests/new');

  const Margin = ({ margin }) => (
    <View style={{ marginVertical: margin / 2 }} />
  );

  return (
    <ImageBackground
      resizeMode="contain"
      source={images.Stars}
      style={styles.background}
    >
      <Logo />

      <Margin margin={80} />
      <Gear />

      <Text style={styles.header}>Hey there!</Text>
      <AppText style={styles.secondary}>
        We've been hard at work bringing new improvements to the platform. Soon
        the platform will be fully operational.
      </AppText>

      <Margin margin={22} />
      <AppText style={styles.secondary}>
        Thanks for your patience and understanding.
      </AppText>

      <AppButton text="Refresh" style={styles.button} />

      <View style={styles.footer}>
        <AppText style={styles.supportText}>
          Need Help? Contact <PurpleText text="Support" onPress={goToSupport} />
        </AppText>
        <Margin margin={14} />
        <AppText style={styles.contactText}>
          +995 322 053 253 | Support@cryptal.com
        </AppText>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: 30,
  },
  button: {
    width: '50%',
    marginTop: 64,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 60,
    right: 60,
  },
  supportText: {
    textAlign: 'center',
    color: '#838BB2CC',
  },
  contactText: {
    textAlign: 'center',
    color: 'rgba(131, 139, 178, 0.8)',
  },
  header: {
    color: colors.PRIMARY_TEXT,
    fontFamily: 'Ubuntu_Medium',
    fontSize: 24,
    marginTop: 22,
    marginBottom: 15,
  },
  secondary: {
    color: '#838BB2',
    textAlign: 'center',
    marginHorizontal: 30,
    lineHeight: 21,
  },
});
