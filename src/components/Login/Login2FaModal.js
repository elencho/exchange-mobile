import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import CloseModalIcon from '../InstantTrade/CloseModalIcon';
import PurpleText from '../PurpleText';
import TwoFaInput from '../TwoFaInput';

import { toggleLogin2FaModal } from '../../redux/modals/actions';
import images from '../../constants/images';
import colors from '../../constants/colors';

export default function Login2FaModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [value, setValue] = useState('');

  const {
    modals: { login2FaModalVisible },
    profile: { googleAuth, emailAuth, smsAuth, userAndPassInfo },
  } = state;

  const cellCount = smsAuth ? 4 : 6;

  const hide = () => dispatch(toggleLogin2FaModal(false));

  const image = () => {
    if (userAndPassInfo.attributes) {
      switch (userAndPassInfo.attributes.otpType) {
        case 'TOTP':
          return images.Google_Auth;
        case 'EMAIL':
          return images.E_mail_Auth;
        case 'SMS':
          return images.SMS_Auth;
        default:
          break;
      }
    }
  };
  const type = () => {
    if (googleAuth) return 'Google Authentication';
    if (emailAuth) return 'E-mail Authentication';
    if (smsAuth) return 'SMS Authentication';
  };

  const children = (
    <ImageBackground source={images.Background} style={styles.container}>
      <View style={styles.top}>
        <CloseModalIcon onPress={hide} />
      </View>

      <View style={styles.middle}>
        <Image source={image()} />
        <AppText header style={styles.primary}>
          {type()}
        </AppText>
        <AppText style={styles.secondary}>Enter One Time Password</AppText>
        <View style={styles.twoFaInput}>
          <TwoFaInput
            cellCount={cellCount}
            value={value}
            setValue={setValue}
            login
          />
        </View>
      </View>

      <View style={styles.bottom}>
        <AppText style={styles.secondary}>
          Didn't receive code? <PurpleText text="Resend" />
        </AppText>
        <PurpleText text="Reset OTP" />
      </View>
    </ImageBackground>
  );

  return (
    <AppModal
      custom
      children={children}
      hide={hide}
      visible={login2FaModalVisible}
    />
  );
}

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    height: 52,
    justifyContent: 'space-between',
    marginBottom: 44,
  },
  container: {
    flex: 1,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 27,
    marginBottom: 12,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  top: {
    alignItems: 'flex-end',
    marginTop: 36,
    marginRight: 32,
  },
  twoFaInput: {
    marginTop: 40,
  },
});
