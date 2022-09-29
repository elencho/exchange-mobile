import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import CheckMarks from '../components/Registration/CheckMarks';
import PersonalCompanySwitcher from '../components/Registration/PersonalCompanySwitcher';
import RegistrationInputs from '../components/Registration/RegistrationInputs';
import EmailVerificationModal from '../components/Registration/EmailVerificationModal';
import colors from '../constants/colors';
import images from '../constants/images';
import {
  registrationFormAction,
  setRegistrationInputs,
  startLoginAction,
} from '../redux/profile/actions';
import { useFocusEffect } from '@react-navigation/native';
import GeneralError from '../components/GeneralError';

export default function Registration({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { registrationInputs } = state;

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setRegistrationInputs({}));
      };
    }, [])
  );

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    acceptTerms,
    passwordNew,
    passwordConfirm,
  } = registrationInputs;

  const passwordCheck =
    passwordNew?.length >= 8 && // 8 symbols
    /\d/.test(passwordNew) && // number
    /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(passwordNew); // upper and lower case

  const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(email);
  const similarPasswords = passwordNew === passwordConfirm;
  const terms = acceptTerms === 'on';

  const enabled =
    isEmail &&
    similarPasswords &&
    passwordCheck &&
    firstName &&
    lastName &&
    phoneNumber &&
    terms;

  const handleRegistration = () => dispatch(registrationFormAction());
  const signIn = () => dispatch(startLoginAction(navigation));

  return (
    // <TouchableWithoutFeedback
    //   style={styles.flex}
    //   onPress={Keyboard.dismiss}
    //   accessible={false}
    // >
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ android: undefined, ios: 'padding' })}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 500 })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollview}
      >
        <Image source={images.Logo} style={styles.logo} />
        <AppText header style={styles.header}>
          Welcome to Cryptal
        </AppText>

        <PersonalCompanySwitcher />

        <GeneralError style={{ marginTop: 20, marginBottom: -15 }} />

        <RegistrationInputs />
        <CheckMarks />

        <AppButton
          text="Register"
          onPress={handleRegistration}
          disabled={!enabled}
        />

        <AppText style={styles.subtext}>
          Have an account? <PurpleText text="Sign In" onPress={signIn} />
        </AppText>

        <EmailVerificationModal />
      </ScrollView>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 45,
  },
  scrollview: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  flex: {
    flex: 1,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  logo: {
    width: 40,
    height: 45,
    alignSelf: 'center',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginTop: 40,
    alignSelf: 'center',
  },
});
