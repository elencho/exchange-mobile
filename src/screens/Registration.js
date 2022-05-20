import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PurpleText from '../components/PurpleText';
import CheckMarks from '../components/Registration/CheckMarks';
import PersonalCompanySwitcher from '../components/Registration/PersonalCompanySwitcher';
import RegistrationInputs from '../components/Registration/RegistrationInputs';
import EmailVerificationModal from '../components/Registration/EmailVerificationModal';
import colors from '../constants/colors';
import images from '../constants/images';
import { toggleEmailVerificationModal } from '../redux/modals/actions';
import { registrationFormAction } from '../redux/profile/actions';

export default function Registration({ navigation }) {
  const dispatch = useDispatch();

  const handleRegistration = () => {
    dispatch(registrationFormAction(navigation));
  };

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
        <RegistrationInputs />
        <CheckMarks />

        <AppButton text="Register" onPress={handleRegistration} />

        <AppText style={styles.subtext}>
          Have an account? <PurpleText text="Sign In" />
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
