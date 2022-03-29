import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import colors from '../../constants/colors';
import AppText from '../AppText';
import GoogleAuthModal from './GoogleAuthModal';
import GoogleOtpModal from './GoogleOtpModal';
import PasswordModal from './PasswordModal';
import SecurityRow from './SecurityRow';
import SmsEmailAuthModal from './SmsEmailAuthModal';
import { bearer } from '../../constants/api';
import {
  setEmailAuth,
  setGoogleAuth,
  setSmsAuth,
} from '../../redux/profile/actions';

export default function Security() {
  const dispatch = useDispatch();

  useEffect(() => {
    const type = jwt_decode(bearer.split(' ')[1]).otpType;
    if (type === 'SMS') dispatch(setSmsAuth(true));
    if (type === 'TOTP') dispatch(setGoogleAuth(true));
    if (type === 'EMAIL') dispatch(setEmailAuth(true));
  }, []);

  return (
    <ScrollView>
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
    </ScrollView>
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
