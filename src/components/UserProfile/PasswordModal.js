import React, { useState } from 'react';
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
import colors from '../../constants/colors';
import images from '../../constants/images';

export default function PasswordModal() {
  const array = [
    '8 or more characters',
    'At least one number',
    'One symbol',
    'Upper & lowercase letters',
  ];

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const {
    modals: { passwordModalVisible },
  } = state;

  const [secure, setSecure] = useState(true);
  const [eightChars, setEightChars] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);

  const hide = () => {
    dispatch(togglePasswordModal(false));
    setEightChars(false);
    setHasNumber(false);
    setHasSymbol(false);
    setHasUpperAndLower(false);
    setHasUpperAndLower(true);
  };

  const handleSave = () => {
    hide();
  };

  const toggle = () => setSecure(!secure);

  const validate = (pass) => {
    setEightChars(pass.length >= 8 ? true : false);
    setHasNumber(/\d/.test(pass) ? true : false);
    setHasSymbol(/[$-/:-?{-~!"^_`\[\]]/.test(pass) ? true : false);
    setHasUpperAndLower(
      /\b(?![a-z]+\b|[A-Z]+\b)[a-zA-Z]+/.test(pass) ? true : false
    );
  };

  const background = (i) => {
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
      <Image source={secure ? images.Hide : images.Show} />
    </TouchableOpacity>
  );

  const children = (
    <>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.99}>
          <AppInput
            style={styles.inputContainer}
            label="Current Password"
            secureTextEntry={secure}
          />
          <AppInput
            style={styles.inputContainer}
            label="New Password"
            secureTextEntry={secure}
            onChangeText={(text) => validate(text)}
            right={hideIcon}
          />
          <AppInput
            style={styles.inputContainer}
            label="Repeat Password"
            secureTextEntry={secure}
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

  return (
    <AppModal
      visible={passwordModalVisible}
      hide={hide}
      fullScreen
      title="Set a Strong Password"
      children={children}
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
  flex: {
    flex: 1,
    paddingTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  validation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
});
