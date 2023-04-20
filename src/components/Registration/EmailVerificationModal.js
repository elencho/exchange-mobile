import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialIndicator } from 'react-native-indicators';

import AppModal from '../AppModal';
import AppText from '../AppText';
import CloseModalIcon from '../InstantTrade/CloseModalIcon';
import PurpleText from '../PurpleText';
import TwoFaInput from '../TwoFaInput';
import WithKeyboard from '../WithKeyboard';
import EmailLoginAuth from '../../assets/images/User_profile/EmailLoginAuth.svg';

import colors from '../../constants/colors';
import { startRegistrationAction } from '../../redux/profile/actions';
import { toggleEmailVerificationModal } from '../../redux/modals/actions';
import { t } from 'i18next';

export default function EmailVerificationModal() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(30);

  const {
    modals: { emailVerificationModalVisible },
    profile: { verificationInfo, registrationInputs, timerVisible },
    transactions: { loading },
  } = state;

  useEffect(() => {
    if (emailVerificationModalVisible) {
      dispatch({ type: 'TOGGLE_TIMER', timerVisible: true });
    }
  }, [emailVerificationModalVisible]);

  useEffect(() => {
    if (!timerVisible) {
      setSeconds(30);
      return;
    }
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

  const hide = () => {
    dispatch(toggleEmailVerificationModal(false));
    dispatch(startRegistrationAction(navigation));
  };

  const onModalHide = () => {
    setValue('');
    setSeconds(30);
    dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
  };

  const resend = () => {
    const { callbackUrl } = verificationInfo;
    dispatch({
      type: 'RESEND_SAGA',
      url: callbackUrl,
      emailVerification: true,
    });
  };

  const checkMailText = () => {
    if (verificationInfo.attributes) {
      return (
        /* Animate */
        <View>
          <AppText style={[styles.secondary, { marginBottom: 36 }]}>
            {t('check your {{email}} after registration params[email]', {
              email: registrationInputs?.email,
            })}
          </AppText>
        </View>
      );
    }
    return null;
  };

  const resendOrCountDown = () => {
    if (loading) {
      return (
        <MaterialIndicator
          color="#6582FD"
          animationDuration={3000}
          size={16}
          style={{ flex: 0 }}
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
    <WithKeyboard flexGrow padding modal>
      <View style={styles.container}>
        <View style={styles.top}>
          <CloseModalIcon onPress={hide} />
        </View>

        <View style={styles.middle}>
          <EmailLoginAuth />

          {/* Animate */}
          <View>
            <AppText header style={styles.primary}>
              E-mail Has Been Sent
            </AppText>
          </View>
          {checkMailText()}

          <TwoFaInput
            value={value}
            setValue={setValue}
            registration
            indicatorStyle={{ top: '70%' }}
          />
        </View>

        {/* Animate */}
        <View style={styles.row}>
          <AppText style={[styles.secondary, { marginRight: 5 }]}>
            Didn't receive code?
          </AppText>
          {resendOrCountDown()}
        </View>
      </View>
    </WithKeyboard>
  );

  return (
    <AppModal
      custom
      children={children}
      hide={hide}
      onModalHide={onModalHide}
      visible={emailVerificationModalVisible}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 23,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 21,
  },
  top: {
    alignItems: 'flex-end',
  },
});
