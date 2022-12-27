import React, { useEffect, useReducer, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppInput from '../AppInput';
import AppText from '../AppText';
import { togglePasswordModal } from '../../redux/modals/actions';
import { updatePassword } from '../../redux/profile/actions';
import colors from '../../constants/colors';
import images from '../../constants/images';
import GeneralError from '../GeneralError';
import { errorHappenedHere } from '../../utils/appUtils';

export default function PasswordModal() {
  const array = [
    '8 or more characters',
    'At least one number',
    'Upper & lowercase letters',
  ];

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const {
    modals: { passwordModalVisible },
  } = state;

  const [error, setError] = useState(false);

  const initialState = {
    secure: true,
    eightChars: false,
    hasNumber: false,
    hasUpperAndLower: false,
    curentPassword: null,
    newPassword: null,
    repeatPassword: null,
  };

  const reducer = (state, action) => {
    const { type, check, password } = action;
    switch (type) {
      case 'checkEightChars':
        return { ...state, eightChars: check };
      case 'checkNumber':
        return { ...state, hasNumber: check };
      case 'checkUpperAndLower':
        return { ...state, hasUpperAndLower: check };
      case 'toggleSecure':
        return { ...state, secure: !state.secure };
      case 'currentPassword':
        return { ...state, curentPassword: password };
      case 'newPassword':
        return { ...state, newPassword: password };
      case 'repeatPassword':
        return { ...state, repeatPassword: password };
      case 'hide':
        return initialState;
      default:
        throw new Error();
    }
  };

  const [passwordState, dispatchToReducer] = useReducer(reducer, initialState);

  const {
    eightChars,
    hasNumber,
    hasUpperAndLower,
    newPassword,
    repeatPassword,
    curentPassword,
    secure,
  } = passwordState;
  const newPassCond =
    newPassword && eightChars && hasUpperAndLower && hasNumber;

  useEffect(() => {
    error && setError(false);
  }, [passwordModalVisible, passwordState]);

  const hide = () => {
    dispatch(togglePasswordModal(false));
    dispatchToReducer({ type: 'hide' });
  };

  const handleSave = () => {
    const condition =
      error ||
      !curentPassword ||
      !newPassword ||
      !repeatPassword ||
      !eightChars ||
      !hasNumber ||
      !hasUpperAndLower ||
      newPassword !== repeatPassword;
    if (condition) {
      setError(true);
    } else {
      dispatch(
        updatePassword(curentPassword, newPassword, repeatPassword, hide)
      );
    }
  };

  const toggle = () => dispatchToReducer({ type: 'toggleSecure' });

  const handleCurrentPass = (password) =>
    dispatchToReducer({ type: 'currentPassword', password });
  const handleNewPass = (password) => {
    validate(password);
    dispatchToReducer({ type: 'newPassword', password });
  };
  const handleRepeatPass = (password) =>
    dispatchToReducer({ type: 'repeatPassword', password });

  const validate = (pass) => {
    dispatchToReducer({ type: 'checkEightChars', check: pass.length >= 8 });
    dispatchToReducer({ type: 'checkNumber', check: /\d/.test(pass) });
    dispatchToReducer({
      type: 'checkUpperAndLower',
      check: /^(?=.*[a-z])(?=.*[A-Z])\S+$/.test(pass),
    });
  };

  const background = (i) => {
    switch (i) {
      case 0:
        return { backgroundColor: eightChars ? '#25D8D1' : '#F83974' };
      case 1:
        return { backgroundColor: hasNumber ? '#25D8D1' : '#F83974' };
      case 2:
        return { backgroundColor: hasUpperAndLower ? '#25D8D1' : '#F83974' };
      default:
        break;
    }
  };

  const color = (i) => {
    switch (i) {
      case 0:
        return { color: eightChars ? colors.SECONDARY_TEXT : '#969CBF' };
      case 1:
        return { color: hasNumber ? colors.SECONDARY_TEXT : '#969CBF' };
      case 2:
        return { color: hasUpperAndLower ? colors.SECONDARY_TEXT : '#969CBF' };
      default:
        break;
    }
  };

  const hideIcon = (
    <Pressable onPress={toggle}>
      <Image source={secure ? images.Hide : images.Show} />
    </Pressable>
  );

  const children = () => {
    return (
      <>
        <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={0.99}>
            <GeneralError
              style={styles.error}
              show={errorHappenedHere('PasswordModal')}
            />

            <AppInput
              style={styles.inputContainer}
              label="Current Password"
              secureTextEntry={secure}
              onChangeText={(text) => handleCurrentPass(text)}
              value={curentPassword}
              error={error && !curentPassword}
            />
            <AppInput
              style={styles.inputContainer}
              label="New Password"
              secureTextEntry={secure}
              onChangeText={(text) => handleNewPass(text)}
              value={newPassword}
              right={hideIcon}
              error={error && !newPassCond}
            />
            <AppInput
              style={styles.inputContainer}
              label="Repeat Password"
              secureTextEntry={secure}
              onChangeText={(text) => handleRepeatPass(text)}
              value={repeatPassword}
              error={error && newPassword !== repeatPassword}
            />

            {array.map((v, i) => (
              <View key={v} style={styles.validation}>
                <View style={[styles.dot, background(i)]} />
                <AppText subtext style={color(i)}>
                  {v}
                </AppText>
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>

        <Pressable onPress={handleSave} style={styles.button}>
          <AppText medium style={styles.buttonText}>
            Save
          </AppText>
        </Pressable>
      </>
    );
  };

  return (
    <AppModal
      visible={passwordModalVisible}
      hide={hide}
      fullScreen
      title="Set a Strong Password"
      children={children()}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: colors.PRIMARY_PURPLE,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    marginRight: 15,
  },
  error: {
    marginBottom: 15,
  },
  flex: {
    flex: 1,
    paddingTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  opacity: {
    opacity: 1,
  },
  validation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
});
