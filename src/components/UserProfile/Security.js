import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import { checkIsCompatable } from '../../utils/biometricsAuth';

import AppText from '../AppText';
import GoogleAuthModal from './GoogleAuthModal';
import GoogleOtpModal from './GoogleOtpModal';
import PasswordModal from './PasswordModal';
import PersonalSecuritySkeleton from './PersonalSecuritySkeleton';
import SecurityRow from './SecurityRow';
import SmsEmailAuthModal from './SmsEmailAuthModal';

export default function Security({ loading, bioAvailable }) {
  return !loading ? (
    <>
      <View style={styles.block}>
        <AppText subtext style={[styles.secondary, styles.margin]}>
          2FA is specific type of multi-factor authentication that strengthens
          access security
        </AppText>
        {['Google_Auth', 'E_mail_Auth', 'SMS_Auth'].map((r, i, a) => (
          <SecurityRow key={r} text={r} i={i} a={a} />
        ))}
        <View style={styles.line} />
      </View>

      {/* <View style={styles.block}>
        {['Pin', 'Biometric'].map((r, i, a) => (
          <SecurityRow key={r} text={r} i={i} a={a} />
        ))}
      </View> */}

      <View style={styles.block}>
        {bioAvailable && <SecurityRow text="Biometric" />}
        <SecurityRow text="Strong_Password" />
      </View>

      <PasswordModal />
      <GoogleAuthModal />
      <SmsEmailAuthModal type="Email" />
      <SmsEmailAuthModal type="SMS" />
      <GoogleOtpModal />
    </>
  ) : (
    <PersonalSecuritySkeleton />
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 5,
    paddingTop: 15,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  margin: { marginBottom: 20, marginTop: 10 },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  line: {
    marginTop: 15,
    height: 1,
    flex: 1,
    backgroundColor: colors.BUTTON_DISABLED,
  },
});
