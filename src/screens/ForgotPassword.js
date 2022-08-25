import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import PurpleText from '../components/PurpleText';

import colors from '../constants/colors';
import images from '../constants/images';

export default function ForgotPassword({ navigation }) {
  const goToLogin = () => navigation.navigate('Login');

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
        <ScrollView contentContainerStyle={styles.middle}>
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
          />
          <AppInput
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            style={styles.input}
            label="Enter Code"
          />

          <AppButton text="Next" style={styles.button} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'row',
    alignItems: 'center',

    position: 'absolute',
    left: 24,
    top: 28,
    width: '33%',
  },
  backText: {
    marginBottom: 2,
    marginLeft: 10,
  },
  button: {
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: '12%',
  },
  input: {
    width: '100%',
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'yellow',
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
  },
});
