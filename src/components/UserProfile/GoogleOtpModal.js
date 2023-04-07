import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { toggleGoogleOtpModal } from '../../redux/modals/actions';
import { setEmailAuth } from '../../redux/profile/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';
import TwoFaInput from '../TwoFaInput';

export default function GoogleOtpModal({ withdrawal, whitelist }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { googleOtpModalVisible },
    profile: { currentSecurityAction },
  } = state;

  const [value, setValue] = useState('');

  const email = currentSecurityAction === 'email';

  const hide = () => {
    dispatch(toggleGoogleOtpModal(false));
    if (email) dispatch(setEmailAuth(false));
    setValue('');
  };

  const children = (
    <View style={styles.container}>
      <AppText style={styles.header} header>
        Google Authentication
      </AppText>
      <AppText style={styles.secondary} body>
        Enter One Time Password
      </AppText>

      <View style={styles.codeInput}>
        <TwoFaInput
          withdrawal={withdrawal}
          whitelist={whitelist}
          value={value}
          cellCount={6}
          setValue={setValue}
        />
      </View>
    </View>
  );

  return (
    <AppModal
      children={children}
      bottom
      hide={hide}
      visible={googleOtpModalVisible}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  codeInput: {
    marginTop: 35,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 10,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    fontSize: 24,
    lineHeight: 28,
  },
});
