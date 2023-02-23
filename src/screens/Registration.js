import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import CheckMarks from '../components/Registration/CheckMarks';
import PersonalCompanySwitcher from '../components/Registration/PersonalCompanySwitcher';
import RegistrationInputs from '../components/Registration/RegistrationInputs';
import EmailVerificationModal from '../components/Registration/EmailVerificationModal';
import WithKeyboard from '../components/WithKeyboard';
import Logo from '../assets/images/Logo.svg';
import GeneralError from '../components/GeneralError';

import {
  registrationFormAction,
  setRegistrationInputs,
  startLoginAction,
  switchPersonalCompany,
} from '../redux/profile/actions';
import { errorHappenedHere } from '../utils/appUtils';
import colors from '../constants/colors';

export default function Registration({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { registrationInputs, userProfileLoading } = state;

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setRegistrationInputs({}));
        dispatch(switchPersonalCompany('Personal'));
      };
    }, [])
  );

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email),
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

  const handleRegistration = async () => {
    await setLoading(true);
    if (!enabled) {
      setError(true);
      setLoading(false);
    } else {
      await dispatch(registrationFormAction());
      setLoading(false);
    }
  };
  const signIn = () => dispatch(startLoginAction(navigation));

  return (
    <WithKeyboard scrollUp padding style={styles.scrollview}>
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

        <AppButton
          text="Register"
          onPress={handleRegistration}
          loading={userProfileLoading}
        />

        <AppText style={styles.subtext}>
          {t('Have an Account?')}{' '}
          <PurpleText text={t('Sign In')} onPress={signIn} />
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
