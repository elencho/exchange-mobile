import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import colors from '../constants/colors';

import images from '../constants/images';
import Logo from '../assets/images/Logo';
import TwoFaInput from '../components/TwoFaInput';
import WithKeyboard from '../components/WithKeyboard';

export default function ResetOtpInstructions({ navigation, route }) {
  const ex = route?.params?.execution;
  const [url, setUrl] = useState('');
  const [value, setValue] = useState('');

  const goBack = () => navigation.goBack();
  const openSupport = () => Linking.openURL(url);

  useEffect(() => {
    AsyncStorage.getItem('language')
      .then((l) => setUrl(`https://support.cryptal.com/hc/${l}`))
      .catch((err) => console.log(err));

    return () => setValue('');
  }, []);

  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <WithKeyboard padding flexGrow>
        <TouchableOpacity style={styles.back} onPress={goBack}>
          <Image source={images.Back} />
          <PurpleText text="Go Back" style={styles.backText} />
        </TouchableOpacity>

        <View style={styles.middle}>
          <Logo style={styles.logo} />
          <AppText header style={styles.primary}>
            Reset One Time Password
          </AppText>
          {ex === 'OTP_RESET_INSTRUCTIONS' && (
            <AppText style={styles.secondary}>
              Contact Our{' '}
              <PurpleText text="Support Team" onPress={openSupport} /> for
              instructions
            </AppText>
          )}
          {ex === 'RESET_OTP' && (
            <>
              <AppText style={[styles.secondary, { marginBottom: 40 }]}>
                Enter the code you received on the email
              </AppText>
              <TwoFaInput value={value} setValue={setValue} login />
            </>
          )}
        </View>

        {ex === 'OTP_RESET_INSTRUCTIONS' && (
          <View style={styles.bottom}>
            <AppText style={[styles.secondary, { marginHorizontal: '15%' }]}>
              Note: After OTP reset, withdrawals will not be available for{' '}
              <AppText medium style={{ color: '#8D92AD' }}>
                48 hours
              </AppText>
            </AppText>
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
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 21,
  },
});
