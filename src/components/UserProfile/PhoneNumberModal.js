import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { togglePhoneNumberModal } from '../../redux/modals/actions';
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

  const hide = () => dispatch(togglePhoneNumberModal(false));

  const handleSave = () => {
    hide();
  };

  const send = <PurpleText text="Send" />;

  const children = (
    <>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.99}>
          <AppInput
            style={styles.inputContainer}
            placeholder="Phone Number"
            right={send}
          />
          <AppInput
            style={styles.inputContainer}
            placeholder="Verification Code"
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

  return (
    <AppModal
      visible={phoneNumberModalVisible}
      hide={hide}
      fullScreen
      title="My Phone Number"
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
  flex: {
    flex: 1,
    paddingTop: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
