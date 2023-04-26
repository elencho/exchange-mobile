import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import WithKeyboard from '../components/WithKeyboard';
import PurpleText from '../components/PurpleText';
import Strong_Password from '../assets/images/User_profile/Strong_Password';
import Back from '../assets/images/Back';

import colors from '../constants/colors';
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={goToLogin}>
        <Back />
        <PurpleText
          numberOfLines={1}
          text="Back to Log In"
          style={styles.backText}
        />
      </TouchableOpacity>

      <WithKeyboard flexGrow padding contentContainerStyle={styles.middle}>
        <Strong_Password
          style={{ alignSelf: 'center', transform: [{ scaleY: 1.1 }] }}
        />

        <View style={{ alignItems: 'center' }}>
          <AppText header style={styles.primary}>
            Set New Password
          </AppText>
          <AppText style={styles.secondary}>
            Generate new password for your account
          </AppText>
        </View>

        <AppInput
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          style={styles.input}
          label="Enter New Password"
          autoCapitalize={'none'}
          onChangeText={(t) => setPass(t)}
          value={pass}
          secureTextEntry
          error={error && (!passwordCheck || !pass)}
        />

        <View>
          <Text style={styles.validations}>
            <Text style={!passLength && pass && red}>
              8 or more characters,{' '}
            </Text>
            <Text style={!hasUpperAndLower && pass && red}>
              Upper & lowercase letters,{' '}
            </Text>
            <Text style={!hasNumber && pass && red}>At least one number, </Text>
          </Text>
        </View>

        <AppInput
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          style={styles.input}
          label="Confirm New Password"
          autoCapitalize={'none'}
          onChangeText={(t) => setConfirmPass(t)}
          value={confirmPass}
          secureTextEntry
          error={error && pass !== confirmPass}
        />

        <AppButton text="Save" style={styles.button} onPress={setNewPassword} />
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
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  input: {
    width: '100%',
    marginVertical: 6,
  },
  middle: {
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
  validations: {
    color: colors.SECONDARY_TEXT,
    fontSize: 11,
    textAlign: 'justify',
    lineHeight: 15,
  },
});
