import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import AppText from '../AppText';
import GoogleAuthModal from './GoogleAuthModal';
import GoogleOtpModal from './GoogleOtpModal';
import PasswordModal from './PasswordModal';
import SecurityRow from './SecurityRow';
import SmsEmailAuthModal from './SmsEmailAuthModal';

export default function Security() {
  return (
    <>
      <View style={styles.block}>
        <AppText subtext style={[styles.secondary, styles.margin]}>
          2FA is specific type of multi-factor authentication that strengthens
          access security
        </AppText>
        {['Google_Auth', 'E_mail_Auth', 'SMS_Auth'].map((r, i, a) => (
          <SecurityRow key={r} text={r} i={i} a={a} />
        ))}
      </View>

      <View style={styles.block}>
        {['Pin', 'Biometric'].map((r, i, a) => (
          <SecurityRow key={r} text={r} i={i} a={a} />
        ))}
      </View>

      <View style={styles.block}>
        <SecurityRow text="Strong_Password" />
      </View>

      <PasswordModal />
      <GoogleAuthModal />
      <SmsEmailAuthModal type="E-mail" />
      <SmsEmailAuthModal type="SMS" />
      <GoogleOtpModal />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 10,
  },
  margin: { marginBottom: 20, marginTop: 10 },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
