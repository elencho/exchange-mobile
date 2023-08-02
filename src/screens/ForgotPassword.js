import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';
import WithKeyboard from '../components/WithKeyboard';
import Strong_Password from '../assets/images/User_profile/Strong_Password';
import GeneralError from '../components/GeneralError';

import colors from '../constants/colors';
import { startLoginAction } from '../redux/profile/actions';
import { errorHappenedHere } from '../utils/appUtils';

export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { forgotPassInfo, timerVisible },
    transactions: { loading },
  } = state;

  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState(false);

  useEffect(() => {
    error && setError(false);
  }, [forgotPassInfo]);

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
    return () => {
      dispatch({ type: 'SAVE_FORGOT_PASS_INFO', forgotPassInfo: {} });
      dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
      setSeconds(30);
    };
  }, []);

  const f = forgotPassInfo;
  const mailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
    f.username
  );

  const goToLogin = () => {
    navigation.navigate('Login');
    dispatch(startLoginAction(navigation));
  };

  const sendCode = () => {
    if (!mailValid) {
      setError(true);
    } else {
      dispatch({ type: 'SEND_FORGOT_PASS_CODE' });
    }
  };

  const Right = () => {
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
      return <PurpleText text="Send" onPress={sendCode} />;
    }
  };

  const saveUsername = (username) =>
    dispatch({
      type: 'SAVE_FORGOT_PASS_INFO',
      forgotPassInfo: { ...f, username },
    });

  const saveCode = (code) => {
    dispatch({
      type: 'SAVE_FORGOT_PASS_INFO',
      forgotPassInfo: { ...f, code },
    });
  };

  const next = () => {
    if (!f.code?.trim() || !f.username?.trim()) {
      setError(true);
    } else {
      dispatch({
        type: 'FORGOT_PASS_ENTER_CODE',
        navigation,
      });
    }
  };

  const errorText = () =>
    error && f.username?.trim() && !mailValid ? 'Enter Valid Email' : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={goToLogin}>
        <PurpleText
          numberOfLines={1}
          text="Back to Log In"
          style={styles.backText}
        />
      </TouchableOpacity>

      <WithKeyboard flexGrow padding contentContainerStyle={styles.middle}>
        <Strong_Password width={38} height={46} />

        <View style={{ alignItems: 'center' }}>
          <AppText header style={styles.primary}>
            Forgot Your Password?
          </AppText>
          <AppText style={styles.secondary}>
            Enter the code you will receive on your e-mail to recover the
            password
          </AppText>
        </View>

        <GeneralError show={errorHappenedHere('ForgotPassword')} />

        <AppInput
          labelBackgroundColor={colors.PRIMARY_BACKGROUND}
          style={styles.input}
          label="Enter Email"
          autoCapitalize={'none'}
          onChangeText={saveUsername}
          value={f.username}
          right={<Right />}
          error={!mailValid && error}
          errorText={errorText()}
        />
        <AppInput
          labelBackgroundColor={colors.PRIMARY_BACKGROUND}
          style={styles.input}
          label="Enter Code"
          autoCapitalize={'none'}
          onChangeText={saveCode}
          value={f.code}
          error={!f.code?.trim() && error}
        />

        <AppButton text="Next" style={styles.button} onPress={next} />
      </WithKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: 28,
    alignSelf: 'flex-start',
  },
  backText: {
    marginBottom: 2,
    marginLeft: 10,
    flex: 1,
  },
  button: {
    width: '100%',
    marginTop: 84,
  },
  container: {
    flex: 1,
    paddingHorizontal: '8%',
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  input: {
    width: '100%',
    marginVertical: 6,
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 23,
  },
});
