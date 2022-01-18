import React, { useReducer } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { togglePhoneNumberModal } from '../../redux/modals/actions';
import {
  sendVerificationCode,
  updatePhoneNumber,
} from '../../redux/profile/actions';
import AppInput from '../AppInput';
import AppModal from '../AppModal';
import AppText from '../AppText';
import PurpleText from '../PurpleText';

export default function PhoneNumberModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { phoneNumberModalVisible },
  } = state;

  const initialState = {
    phoneNumber: '',
    phoneCountry: 'GEO',
    verificationNumber: '',
  };

  const reducer = (state, action) => {
    const { type, verificationNumber, phoneNumber } = action;
    switch (type) {
      case 'phoneNumber':
        return { ...state, phoneNumber };
      case 'verificationNumber':
        return { ...state, verificationNumber };
      case 'hide':
        return initialState;
      default:
        throw new Error();
    }
  };

  const [phoneNumberState, dispatchToReducer] = useReducer(
    reducer,
    initialState
  );

  const hide = () => {
    dispatchToReducer({ type: 'hide' });
    dispatch(togglePhoneNumberModal(false));
  };

  const validate = (number) => /^\d+$/.test(number) || !number;

  const handlePhoneNumber = (phoneNumber) => {
    if (validate(phoneNumber)) {
      dispatchToReducer({ type: 'phoneNumber', phoneNumber });
    }
  };

  const handleVerificationNumber = (verificationNumber) => {
    if (validate(verificationNumber)) {
      dispatchToReducer({ type: 'verificationNumber', verificationNumber });
    }
  };

  const handleSend = () => {
    const { phoneNumber, phoneCountry } = phoneNumberState;
    dispatch(sendVerificationCode(phoneNumber, phoneCountry));
  };

  const handleSave = () => {
    const { phoneNumber, phoneCountry, verificationNumber } = phoneNumberState;
    dispatch(updatePhoneNumber(phoneNumber, phoneCountry, verificationNumber));
    hide();
  };

  const send = <PurpleText text="Send" onPress={handleSend} />;

  const children = () => {
    const { phoneNumber, verificationNumber } = phoneNumberState;
    return (
      <>
        <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={0.99}>
            <AppInput
              style={styles.inputContainer}
              placeholder="Phone Number"
              right={send}
              onChangeText={(text) => handlePhoneNumber(text)}
              value={phoneNumber}
            />
            <AppInput
              style={styles.inputContainer}
              placeholder="Verification Code"
              onChangeText={(text) => handleVerificationNumber(text)}
              value={verificationNumber}
            />
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
      visible={phoneNumberModalVisible}
      hide={hide}
      fullScreen
      title="My Phone Number"
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
  flex: {
    flex: 1,
    paddingTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
