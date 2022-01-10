import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import AppText from '../AppText';
import PasswordModal from './PasswordModal';
import SecurityRow from './SecurityRow';

export default function Security() {
  return (
    <ScrollView>
      <View style={styles.block}>
        <AppText subtext style={[styles.secondary, styles.marginBottom]}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 25,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 10,
  },
  marginBottom: { marginBottom: 30 },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});