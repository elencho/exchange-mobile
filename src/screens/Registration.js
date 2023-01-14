import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import CheckMarks from '../components/Registration/CheckMarks';
import PersonalCompanySwitcher from '../components/Registration/PersonalCompanySwitcher';
import RegistrationInputs from '../components/Registration/RegistrationInputs';
import EmailVerificationModal from '../components/Registration/EmailVerificationModal';
import colors from '../constants/colors';
import Logo from '../assets/images/Logo.svg';
import {
  registrationFormAction,
  setRegistrationInputs,
  startLoginAction,
} from '../redux/profile/actions';
import { useFocusEffect } from '@react-navigation/native';
import GeneralError from '../components/GeneralError';
import { errorHappenedHere } from '../utils/appUtils';
import WithKeyboard from '../components/WithKeyboard';

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

  const [error, setError] = useState(false);
  useEffect(() => {
    error && setError(false);
  }, [registrationInputs]);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    phoneCountry,
    acceptTerms,
    passwordNew,
    passwordConfirm,
  } = registrationInputs;

  const passLength = passwordNew?.length >= 8;
  const hasUpperAndLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(passwordNew);
  const hasNumber = /\d/.test(passwordNew);

  const o = {
    nameCheck:
      firstName?.trim() && /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]+$/g.test(firstName),
    lastNameCheck:
      lastName?.trim() && /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]+$/g.test(lastName),
    passwordCheck: passLength && hasNumber && hasUpperAndLower,
    isEmail: /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(email),
    similarPasswords: passwordNew === passwordConfirm,
    terms: acceptTerms === 'on',
    phoneNumberCheck: /^[0-9]+$/.test(phoneNumber),

    passLength,
    hasUpperAndLower,
    hasNumber,
  };

  const enabled =
    o.nameCheck &&
    o.lastNameCheck &&
    o.isEmail &&
    o.similarPasswords &&
    o.passwordCheck &&
    o.phoneNumberCheck &&
    firstName &&
    lastName &&
    phoneNumber &&
    phoneCountry &&
    o.terms;

  const handleRegistration = () => {
    if (!enabled) {
      setError(true);
    } else {
      dispatch(registrationFormAction());
    }
  };
  const signIn = () => dispatch(startLoginAction(navigation));

  return (
    <WithKeyboard padding style={styles.scrollview}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <AppText header style={styles.header}>
          Welcome to Cryptal
        </AppText>

        <PersonalCompanySwitcher />

        <GeneralError
          style={styles.error}
          show={errorHappenedHere('Registration')}
        />

        <RegistrationInputs error={error} validations={o} />
        <CheckMarks error={error} validations={o} />

        <AppButton text="Register" onPress={handleRegistration} />

        <AppText style={styles.subtext}>
          Have an account? <PurpleText text="Sign In" onPress={signIn} />
        </AppText>

        <EmailVerificationModal />
      </View>
    </WithKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 45,
  },
  scrollview: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  error: {
    marginTop: 20,
    marginBottom: -15,
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
