import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import AppModal from '../AppModal';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import CodeInput from '../CodeInput';
import {
  toggleEmailAuthModal,
  toggleGoogleAuthModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import { setEmailAuth, setSmsAuth } from '../../redux/profile/actions';
import {
  addWhitelistAction,
  deleteWhitelistAction,
  withdrawalAction,
} from '../../redux/wallet/actions';

export default function SmsEmailAuthModal({ type, withdrawal, whitelist }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { smsAuthModalVisible, emailAuthModalVisible },
    profile: { currentSecurityAction },
    wallet: { newWhitelist, currentWhitelistObj },
  } = state;

  const action =
    type === 'SMS' ? toggleSmsAuthModal(false) : toggleEmailAuthModal(false);
  const visible = type === 'SMS' ? smsAuthModalVisible : emailAuthModalVisible;
  const cellCount = type === 'SMS' ? 4 : 6;

  const [value, setValue] = useState('');

  useEffect(() => {
    if (value.length === cellCount) {
      if (withdrawal) {
        dispatch(withdrawalAction(value)); // value = OTP
      }
      if (whitelist) {
        if (newWhitelist.name && newWhitelist.address) {
          dispatch(addWhitelistAction(value)); // value = OTP
        } else {
          // delete whitelist
          dispatch(deleteWhitelistAction(value)); // value = OTP
        }
      }
      dispatch(toggleSmsAuthModal(false));
      dispatch(toggleEmailAuthModal(false));
    }
  }, [value]);

  const handleChange = (text) => setValue(text);

  const handleHide = () => {
    if (value.length === cellCount) {
      if (currentSecurityAction === 'google') {
        dispatch(toggleGoogleAuthModal(true));
      }
      if (currentSecurityAction === 'email') {
        dispatch(setEmailAuth(true));
        dispatch(setSmsAuth(false));
      }
      if (currentSecurityAction === 'sms') {
        dispatch(setSmsAuth(true));
        dispatch(setEmailAuth(false));
      }
    }
  };

  const hide = () => dispatch(action);

  const children = (
    <View style={styles.container}>
      <AppText style={styles.header} header>
        {type} Authentication
      </AppText>
      <AppText style={styles.secondary} body>
        Enter One Time Password
      </AppText>

      <View style={styles.codeInput}>
        <CodeInput
          cellCount={cellCount}
          value={value}
          setValue={handleChange}
        />
      </View>

      <AppText body style={styles.secondary}>
        Didn't receive code? <PurpleText text="Resend" />
      </AppText>
    </View>
  );

  return (
    <AppModal
      children={children}
      bottom
      hide={hide}
      visible={visible}
      onModalHide={handleHide}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  codeInput: {
    marginVertical: 35,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 10,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    fontSize: 24,
  },
});
