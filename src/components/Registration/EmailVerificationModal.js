import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import CloseModalIcon from '../InstantTrade/CloseModalIcon';
import PurpleText from '../PurpleText';
import images from '../../constants/images';
import { toggleEmailVerificationModal } from '../../redux/modals/actions';
import colors from '../../constants/colors';
import { resendEmail } from '../../utils/userProfileUtils';
import TwoFaInput from '../TwoFaInput';

export default function EmailVerificationModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [value, setValue] = useState('');

  const {
    modals: { emailVerificationModalVisible },
    profile: { resendLink },
  } = state;

  const hide = () => dispatch(toggleEmailVerificationModal(false));
  const resend = () => resendEmail(resendLink);

  const children = (
    <ImageBackground source={images.Background} style={styles.container}>
      <View style={styles.top}>
        <CloseModalIcon onPress={hide} />
      </View>

      <View style={styles.middle}>
        <Image source={images.E_mail_Auth} />
        <AppText header style={styles.primary}>
          E-mail Has Been Sent
        </AppText>
        <AppText style={[styles.secondary, { marginBottom: 36 }]}>
          Check your E-mail ##მეილის ცვლადი## and enter the code account
        </AppText>

        <TwoFaInput value={value} setValue={setValue} registration />
      </View>

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
