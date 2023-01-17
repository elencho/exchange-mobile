import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import TwoFaInput from '../components/TwoFaInput';

import colors from '../constants/colors';
import images from '../constants/images';
import { startLoginAction } from '../redux/profile/actions';

export default function Login2Fa({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [value, setValue] = useState('');

  useEffect(() => {
    return () =>
      dispatch({ type: 'TOGGLE_FORGOT_PASS_MODE', forgotPassMode: false });
    setValue('');
  }, []);

  const {
    profile: { userAndPassInfo },
  } = state;

  const t = userAndPassInfo?.attributes?.otpType;
  const cellCount = t === 'SMS' ? 4 : 6;

  const goBack = () => dispatch(startLoginAction(navigation));
  const goToReset = () => dispatch({ type: 'RESET_OTP', navigation });

  const image = () => {
    if (t === 'TOTP') return images.Google_Auth;
    if (t === 'EMAIL') return images.E_mail_Auth;
    if (t === 'SMS') return images.SMS_Auth;
  };

  const type = () => {
    if (t === 'TOTP') return 'Google Authentication';
    if (t === 'EMAIL') return 'E-mail Authentication';
    if (t === 'SMS') return 'SMS Authentication';
  };

  const resend = () =>
    dispatch({
      type: 'RESEND_SAGA',
      login2Fa: true,
      url: userAndPassInfo.callbackUrl,
    });

  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <TouchableOpacity style={styles.back} onPress={goBack}>
          <Image source={images.Back} />
          <PurpleText text="Back to Log In" style={styles.backText} />
        </TouchableOpacity>
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
          {t !== 'TOTP' ? (
            <AppText style={[styles.secondary, { marginBottom: 20 }]}>
              Didn't receive code? <PurpleText text="Resend" onPress={resend} />
            </AppText>
          ) : null}
          {t !== 'EMAIL' ? (
            <PurpleText text="Reset OTP" onPress={goToReset} />
          ) : null}
        </View>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 24,
    marginTop: 28,
    width: '33%',
  },
  backText: {
    marginBottom: 2,
    marginLeft: 10,
  },
  bottom: {
    alignItems: 'center',
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
  twoFaInput: {
    marginTop: 40,
  },
});
