import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import TwoFaInput from '../TwoFaInput';
import PurpleText from '../PurpleText';

import colors from '../../constants/colors';
import {
  toggleEmailAuthModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import {
  setEmailAuth,
  setGoogleAuth,
  setSmsAuth,
} from '../../redux/profile/actions';

export default function SmsEmailAuthModal({ type, withdrawal, whitelist }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { smsAuthModalVisible, emailAuthModalVisible },
    profile: { currentSecurityAction, timerVisible },
    transactions: { loading },
  } = state;

  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!seconds) {
      dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
      setSeconds(30);
    }
    if (seconds && timerVisible) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds, timerVisible]);

  const action =
    type === 'SMS' ? toggleSmsAuthModal(false) : toggleEmailAuthModal(false);
  const visible = type === 'SMS' ? smsAuthModalVisible : emailAuthModalVisible;
  const cellCount = type === 'SMS' ? 4 : 6;
  const email = currentSecurityAction === 'email';
  const google = currentSecurityAction === 'google';

  const handleHide = () => {
    if (value.length === cellCount && email) {
      dispatch(setSmsAuth(false));
      dispatch(setGoogleAuth(false));
    }
  };

  const hide = () => {
    dispatch(action);
    if (email) dispatch(setEmailAuth(false));
    if (google) dispatch(setGoogleAuth(false));
    dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
    setSeconds(30);
    setValue('');
  };

  const resend = () => dispatch({ type: 'RESEND_SAGA', smsEmailAuth: true });

  const resendOrCountDown = () => {
    if (loading) {
      return <ActivityIndicator style={{ marginTop: -5 }} />;
    } else if (timerVisible) {
      return (
        <AppText style={{ color: colors.PRIMARY_TEXT }}>{seconds}</AppText>
      );
    } else {
      return <PurpleText text="Resend" onPress={resend} />;
    }
  };

  const children = (
    <View style={styles.container}>
      <AppText style={styles.header} header>
        {type} Authentication
      </AppText>
      <AppText style={styles.secondary} body>
        Enter One Time Password
      </AppText>

      <View style={styles.codeInput}>
        <TwoFaInput
          withdrawal={withdrawal}
          whitelist={whitelist}
          value={value}
          cellCount={cellCount}
          setValue={setValue}
        />
      </View>

      <AppText body style={styles.secondary}>
        Didn't receive code? {resendOrCountDown()}
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
