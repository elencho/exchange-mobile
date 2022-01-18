import React, { useReducer } from 'react';
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

export default function PasswordModal() {
  const array = [
    '8 or more characters',
    'At least one number',
    'One symbol',
    'Upper & lowercase letters',
  ];

  const dispatchToRedux = useDispatch();

  const state = useSelector((state) => state);
  const {
    modals: { passwordModalVisible },
  } = state;

  const initialState = {
    secure: true,
    eightChars: false,
    hasNumber: false,
    hasSymbol: false,
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
      case 'checkSymbol':
        return { ...state, hasSymbol: check };
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
        return { initialState };
      default:
        throw new Error();
    }
  };

  const [passwordState, dispatch] = useReducer(reducer, initialState);

  const readyToSave = () => {
    const {
      eightChars,
      hasNumber,
      hasSymbol,
      hasUpperAndLower,
      newPassword,
      repeatPassword,
      curentPassword,
    } = passwordState;
    return (
      eightChars &&
      hasNumber &&
      hasSymbol &&
      hasUpperAndLower &&
      newPassword === repeatPassword &&
      curentPassword !== newPassword &&
      curentPassword
    );
  };

  const hide = () => {
    dispatchToRedux(togglePasswordModal(false));
    dispatch({ type: 'hide' });
  };

  const handleSave = () => {
    const { curentPassword, newPassword, repeatPassword } = passwordState;
    hide();
    dispatchToRedux(
      updatePassword(curentPassword, newPassword, repeatPassword)
    );
  };

  const toggle = () => dispatch({ type: 'toggleSecure' });

  const handleCurrentPass = (password) =>
    dispatch({ type: 'currentPassword', password });
  const handleNewPass = (password) => {
    validate(password);
    dispatch({ type: 'newPassword', password });
  };
  const handleRepeatPass = (password) =>
    dispatch({ type: 'repeatPassword', password });

  const validate = (pass) => {
    dispatch({ type: 'checkEightChars', check: pass.length >= 8 });
    dispatch({ type: 'checkNumber', check: /\d/.test(pass) });
    dispatch({ type: 'checkSymbol', check: /[$-/:-?{-~!"^_`\[\]]/.test(pass) });
    dispatch({
      type: 'checkUpperAndLower',
      check: /\b(?![a-z]+\b|[A-Z]+\b)[a-zA-Z]+/.test(pass),
    });
  };

  const background = (i) => {
    const { eightChars, hasNumber, hasSymbol, hasUpperAndLower } =
      passwordState;
    switch (i) {
      case 0:
        return { backgroundColor: eightChars ? '#F83974' : '#25D8D1' };
      case 1:
        return { backgroundColor: hasNumber ? '#F83974' : '#25D8D1' };
      case 2:
        return { backgroundColor: hasSymbol ? '#F83974' : '#25D8D1' };
      case 3:
        return { backgroundColor: hasUpperAndLower ? '#F83974' : '#25D8D1' };
      default:
        break;
    }
  };

  const color = (i) => {
    const { eightChars, hasNumber, hasSymbol, hasUpperAndLower } =
      passwordState;
    switch (i) {
      case 0:
        return { color: eightChars ? '#969CBF' : colors.SECONDARY_TEXT };
      case 1:
        return { color: hasNumber ? '#969CBF' : colors.SECONDARY_TEXT };
      case 2:
        return { color: hasSymbol ? '#969CBF' : colors.SECONDARY_TEXT };
      case 3:
        return { color: hasUpperAndLower ? '#969CBF' : colors.SECONDARY_TEXT };
      default:
        break;
    }
  };

  const hideIcon = (
    <TouchableOpacity onPress={toggle}>
      <Image source={passwordState.secure ? images.Hide : images.Show} />
    </TouchableOpacity>
  );

  const children = () => {
    const { secure, newPassword, curentPassword, repeatPassword } =
      passwordState;
    return (
      <>
        <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={0.99}>
            <AppInput
              style={styles.inputContainer}
              label="Current Password"
              secureTextEntry={secure}
              onChangeText={(text) => handleCurrentPass(text)}
              value={curentPassword}
            />
            <AppInput
              style={styles.inputContainer}
              label="New Password"
              secureTextEntry={secure}
              onChangeText={(text) => handleNewPass(text)}
              value={newPassword}
              right={hideIcon}
            />
            <AppInput
              style={styles.inputContainer}
              label="Repeat Password"
              secureTextEntry={secure}
              onChangeText={(text) => handleRepeatPass(text)}
              value={repeatPassword}
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

        <Pressable
          onPress={handleSave}
          style={[styles.button, readyToSave() && styles.opacity]}
          disabled={!readyToSave()}
        >
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
    opacity: 0.5,
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
