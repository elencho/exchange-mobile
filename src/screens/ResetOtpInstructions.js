import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';

import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';

import images from '../constants/images';
import Logo from '../assets/images/Logo';
import TwoFaInput from '../components/TwoFaInput';
import WithKeyboard from '../components/WithKeyboard';

export default function ResetOtpInstructions({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { userAndPassInfo, timerVisible },
    transactions: { loading },
  } = state;

  const ex = route?.params?.execution;
  const [url, setUrl] = useState('');
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(30);

  const goBack = () => navigation.goBack();
  const openSupport = () => Linking.openURL(url);

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

  useEffect(() => {
    dispatch({ type: 'TOGGLE_TIMER', timerVisible: true });

    SecureStore.getItemAsync('language')
      .then((l) => setUrl(`https://support.cryptal.com/hc/${l}`))
      .catch((err) => console.log(err));

    return () => {
      setValue('');
      dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
      setSeconds(30);
    };
  }, []);

  const resend = () =>
    dispatch({
      type: 'RESEND_SAGA',
      login2Fa: true,
      url: userAndPassInfo.callbackUrl,
    });

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

  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <WithKeyboard padding flexGrow>
        <TouchableOpacity style={styles.back} onPress={goBack}>
          <Image source={images.Back} />
          <PurpleText text="Go Back" style={styles.backText} />
        </TouchableOpacity>

        <View style={styles.middle}>
          <Logo style={styles.logo} />

          <View>
            <AppText header style={styles.primary}>
              Reset One Time Password
            </AppText>
          </View>

          {ex === 'OTP_RESET_INSTRUCTIONS' && (
            <AppText style={styles.secondary}>
              Contact Our{' '}
              <PurpleText text="Support Team" onPress={openSupport} /> for
              instructions
            </AppText>
          )}
          {ex === 'RESET_OTP' && (
            <View>
              <AppText style={[styles.secondary, { marginBottom: 40 }]}>
                Enter the code you received on the email
              </AppText>
              <TwoFaInput
                value={value}
                setValue={setValue}
                login
                fromResetOtp
                indicatorStyle={{ top: '70%' }}
              />
            </View>
          )}
        </View>

        {ex === 'OTP_RESET_INSTRUCTIONS' ? (
          <View style={styles.bottom}>
            <AppText style={[styles.secondary, { marginHorizontal: '15%' }]}>
              Note: After OTP reset, withdrawals will not be available for{' '}
              <AppText medium style={{ color: '#8D92AD' }}>
                48 hours
              </AppText>
            </AppText>
          </View>
        ) : (
          <View style={styles.row}>
            <AppText style={[styles.secondary, { marginRight: 5 }]}>
              Didn't receive code?
            </AppText>
            {resendOrCountDown()}
          </View>
        )}
      </WithKeyboard>
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
  logo: {
    width: 47,
    height: 53,
    resizeMode: 'contain',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 44,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 21,
  },
});
