import React, { useState } from 'react';
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
import { resendEmail } from '../../utils/userProfileUtils';
import TwoFaInput from '../TwoFaInput';
import { startRegistrationAction } from '../../redux/profile/actions';

export default function EmailVerificationModal() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [value, setValue] = useState('');

  const {
    modals: { emailVerificationModalVisible },
    profile: { verificationInfo, registrationInputs },
    transactions: { loading },
  } = state;

  const hide = () => {
    dispatch(toggleEmailVerificationModal(false));
    dispatch(startRegistrationAction(navigation));
    setValue('');
  };

  const resend = () => resendEmail(verificationInfo.callbackUrl);
  const checkMailText = () => {
    if (verificationInfo.attributes) {
      return (
        <AppText style={[styles.secondary, { marginBottom: 36 }]}>
          Check your E-mail {registrationInputs.email} and enter the code
          account
        </AppText>
      );
    }
    return null;
  };

  const children = (
    <ImageBackground source={images.Background} style={styles.container}>
      <View style={styles.top}>
        <CloseModalIcon onPress={hide} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.middle} />
      ) : (
        <View style={styles.middle}>
          <Image source={images.E_mail_Auth} />
          <AppText header style={styles.primary}>
            E-mail Has Been Sent
          </AppText>
          {checkMailText()}

          <TwoFaInput value={value} setValue={setValue} registration />
        </View>
      )}

      <AppText style={styles.secondary}>
        Didn't receive link? <PurpleText text="Resend" onPress={resend} />
      </AppText>
    </ImageBackground>
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
