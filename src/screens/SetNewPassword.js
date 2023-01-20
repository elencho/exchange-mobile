import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';

import colors from '../constants/colors';
import images from '../constants/images';
import { startLoginAction } from '../redux/profile/actions';

export default function SetNewPassword({ navigation }) {
  const dispatch = useDispatch();

  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    error && setError(false);
  }, [pass, confirmPass]);

  const goToLogin = () => dispatch(startLoginAction(navigation));

  const passLength = pass?.length >= 8;
  const hasNumber = /\d/.test(pass);
  const hasUpperAndLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(pass);

  const passwordCheck = passLength && hasNumber && hasUpperAndLower;

  const red = { color: '#F45E8C' };

  const setNewPassword = () => {
    if (pass !== confirmPass || !passwordCheck) {
      setError(true);
    } else {
      dispatch({ type: 'SET_NEW_PASS_SAGA', pass, confirmPass, navigation });
    }
  };

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
            Set New Password
          </AppText>
          <AppText style={styles.secondary}>
            Generate new password for your account
          </AppText>

          <AppInput
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            style={styles.input}
            label="Enter New Password"
            onChangeText={(t) => setPass(t)}
            value={pass}
            secureTextEntry
            error={error && (!passwordCheck || !pass)}
          />

          <Text style={styles.validations}>
            <Text style={!passLength && pass && red}>
              8 or more characters,{' '}
            </Text>
            <Text style={!hasUpperAndLower && pass && red}>
              Upper & lowercase letters,{' '}
            </Text>
            <Text style={!hasNumber && pass && red}>At least one number, </Text>
          </Text>

          <AppInput
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            style={styles.input}
            label="Confirm New Password"
            onChangeText={(t) => setConfirmPass(t)}
            value={confirmPass}
            secureTextEntry
            error={error && pass !== confirmPass}
          />

          <AppButton
            text="Save"
            style={styles.button}
            onPress={setNewPassword}
          />
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
    width: '45%',
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
  validations: {
    color: colors.SECONDARY_TEXT,
    fontSize: 11,
    textAlign: 'justify',
  },
});
