import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';

import colors from '../constants/colors';
import images from '../constants/images';

export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { forgotPassInfo, timerVisible },
    transactions: { loading },
  } = state;

  const [code, setCode] = useState('');
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

  const secondsFormat = seconds < 10 ? `00 : 0${seconds}` : `00 : ${seconds}`;

  const goToLogin = () => navigation.navigate('Login');
  const sendCode = () => dispatch({ type: 'SEND_FORGOT_PASS_CODE' });
  const Right = () => {
    if (loading) {
      return <ActivityIndicator />;
    } else if (timerVisible) {
      return <AppText style={{ color: '#C0C5E0' }}>{secondsFormat}</AppText>;
    } else {
      return <PurpleText text="Send" onPress={sendCode} />;
    }
  };

  const saveUsername = (username) =>
    dispatch({
      type: 'SAVE_FORGOT_PASS_INFO',
      forgotPassInfo: { ...forgotPassInfo, username },
    });

  const next = () =>
    dispatch({ type: 'FORGOT_PASS_ENTER_CODE', code, navigation });

  return (
    <ImageBackground source={images.Background} style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={goToLogin}>
        <Image source={images.Back} />
        <PurpleText text="Back to Log In" style={styles.backText} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ android: undefined, ios: 'padding' })}
        keyboardVerticalOffset={Platform.select({ ios: 50, android: 500 })}
      >
        <ScrollView
          contentContainerStyle={styles.middle}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Image source={images.Strong_Password} />
          <AppText header style={styles.primary}>
            Forgot Your Password?
          </AppText>
          <AppText style={styles.secondary}>
            Enter the code you will receive on your e-mail to recover the
            password
          </AppText>

          <AppInput
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            style={styles.input}
            label="Enter Email"
            onChangeText={saveUsername}
            value={forgotPassInfo.username}
            right={<Right />}
          />
          <AppInput
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            style={styles.input}
            label="Enter Code"
            onChangeText={setCode}
            value={code}
          />

          <AppButton text="Next" style={styles.button} onPress={next} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: 28,
    width: '33%',
  },
  backText: {
    marginBottom: 2,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    marginTop: 84,
  },
  container: {
    flex: 1,
    paddingHorizontal: '12%',
  },
  input: {
    width: '100%',
    marginVertical: 6,
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height - 100,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 18,
    marginBottom: 12,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 23,
  },
});
