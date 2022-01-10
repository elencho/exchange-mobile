import React from 'react';
import { Image, StyleSheet, Switch, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { togglePasswordModal } from '../../redux/modals/actions';

export default function SecurityRow({ text, i = 0, a = [] }) {
  const dispatch = useDispatch();

  const handleChange = () => {
    switch (text) {
      case 'Strong_Password':
        dispatch(togglePasswordModal(true));
        break;
      default:
        break;
    }
  };

  const textCond = () => {
    switch (text) {
      case 'Google_Auth':
        return 'Google Authentication';
      case 'E_mail_Auth':
        return 'E-mail Authentication';
      case 'SMS_Auth':
        return 'SMS Authentication';
      case 'Pin':
        return 'Set a PIN Code';
      case 'Biometric':
        return 'Biometric';
      case 'Strong_Password':
        return 'Set a Strong Password';
      default:
        break;
    }
  };

  const secondaryTextCond = () => {
    switch (text) {
      case 'Google_Auth':
        return 'Some description here';
      case 'E_mail_Auth':
        return 'ntsikl@cryptx.com';
      case 'SMS_Auth':
        return '+995 98 204060';
      case 'Pin':
        return 'Changing password periodically';
      case 'Biometric':
        return 'Set Face ID, or Fingerprint';
      case 'Strong_Password':
        return 'Change password periodically';
      default:
        break;
    }
  };

  return (
    <View
      style={[styles.row, i < a.length - 1 && styles.marginBottom]}
      key={text}
    >
      <View style={styles.imageContainer}>
        <Image source={images[text]} />
      </View>

      <View style={styles.justify}>
        <AppText medium style={styles.white}>
          {textCond()}
        </AppText>
        <AppText subtext style={styles.secondary}>
          {secondaryTextCond()}
        </AppText>
      </View>

      <Switch style={styles.switch} onChange={handleChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 35,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  justify: {
    justifyContent: 'space-between',
    flex: 1,
    height: 38,
    marginHorizontal: 20,
  },
  marginBottom: { marginBottom: 30 },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  row: {
    flexDirection: 'row',
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    right: -7,
    top: -5,
  },
  white: {
    color: colors.PRIMARY_TEXT,
  },
});