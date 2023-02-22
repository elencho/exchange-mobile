import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';

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
  } = state;

  const action =
    type === 'SMS' ? toggleSmsAuthModal(false) : toggleEmailAuthModal(false);
  const visible = type === 'SMS' ? smsAuthModalVisible : emailAuthModalVisible;
  const cellCount = type === 'SMS' ? 4 : 6;
  const email = currentSecurityAction === 'email';
  const google = currentSecurityAction === 'google';

  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [otpLoading, setOtpLoading] = useState(false);

  const reset = () => {
    dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
    setSeconds(30);
    return;
  };

  useEffect(() => {
    if (emailAuthModalVisible || smsAuthModalVisible) {
      dispatch({ type: 'TOGGLE_TIMER', timerVisible: true });
    }
  }, [emailAuthModalVisible, smsAuthModalVisible]);

  useEffect(() => {
    if (emailAuthModalVisible || smsAuthModalVisible) {
      if (!seconds || !timerVisible) reset();
      if (seconds && timerVisible) {
        setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);
      }
    } else {
      reset();
    }
  }, [seconds, timerVisible]);

  const handleHide = () => {
    setSeconds(30);
    setValue('');
    if (value.length === cellCount && email) {
      dispatch(setSmsAuth(false));
      dispatch(setGoogleAuth(false));
    }
  };

  const hide = () => {
    dispatch(action);
    if (email) dispatch(setEmailAuth(false));
    if (google) dispatch(setGoogleAuth(false));
  };

  const resend = () =>
    dispatch({
      type: 'RESEND_SAGA',
      smsEmailAuth: true,
      setOtpLoading,
    });

  const resendOrCountDown = () => {
    if (otpLoading) {
      return (
        <MaterialIndicator
          color="#6582FD"
          animationDuration={3000}
          size={16}
          style={styles.indicator}
        />
      );
    } else if (timerVisible) {
      return (
        <AppText style={{ color: colors.PRIMARY_TEXT }}>{seconds}</AppText>
      );
    } else {
      return <PurpleText text="resend purple" onPress={resend} />;
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

      <View style={styles.row}>
        <AppText body style={[styles.secondary, { marginRight: 5 }]}>
          Didn't receive code?
        </AppText>
        {resendOrCountDown()}
      </View>
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
  indicator: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    fontSize: 24,
  },
});
