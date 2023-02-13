import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AppModal from '../AppModal';
import AppText from '../AppText';
import CloseModalIcon from '../InstantTrade/CloseModalIcon';
import PurpleText from '../PurpleText';
import images from '../../constants/images';
import { toggleEmailVerificationModal } from '../../redux/modals/actions';
import colors from '../../constants/colors';
import TwoFaInput from '../TwoFaInput';
import { startRegistrationAction } from '../../redux/profile/actions';
import WithKeyboard from '../WithKeyboard';

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
            Check your E-mail {registrationInputs.email} and enter the code
            account
          </AppText>
        </View>
      );
    }
    return null;
  };

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
    <WithKeyboard flexGrow padding modal>
      <ImageBackground source={images.Background} style={styles.container}>
        <View style={styles.top}>
          <CloseModalIcon onPress={hide} />
        </View>

        <View style={styles.middle}>
          <Image source={images.E_mail_Auth} />

          {/* Animate */}
          <View>
            <AppText header style={styles.primary}>
              E-mail Has Been Sent
            </AppText>
          </View>
          {checkMailText()}

          <TwoFaInput value={value} setValue={setValue} registration />
        </View>

        {/* Animate */}
        <View>
          <AppText style={styles.secondary}>
            Didn't receive link? {resendOrCountDown()}
          </AppText>
        </View>
      </ImageBackground>
    </WithKeyboard>
  );

  return (
    <AppModal
      custom
      children={children}
      hide={hide}
      visible={emailVerificationModalVisible}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 18,
    marginBottom: 12,
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
