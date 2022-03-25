import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppInput from '../../AppInput';
import {
  toggleAddWhitelistModal,
  toggleEmailAuthModal,
  toggleGoogleAuthModal,
  toggleSmsAuthModal,
} from '../../../redux/modals/actions';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { setNewWhitelist } from '../../../redux/wallet/actions';
import { sendOtp } from '../../../utils/userProfileUtils';

export default function AddWhitelistModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { addWhitelistModalVisble },
    wallet: { newWhitelist },
    profile: { googleAuth, emailAuth, smsAuth },
  } = state;

  const hide = () => dispatch(toggleAddWhitelistModal(false));

  const handleHide = () => {
    hide();
    setTimeout(() => {
      if (googleAuth) dispatch(toggleGoogleAuthModal(true));
      if (emailAuth) dispatch(toggleEmailAuthModal(true));
      if (smsAuth) dispatch(toggleSmsAuthModal(true));
    }, 1000);
    sendOtp();
  };

  const children = (
    <>
      <AppInput
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(address) =>
          dispatch(setNewWhitelist({ ...newWhitelist, address }))
        }
        value={newWhitelist.address}
        label="Destination Address"
      />
      <AppInput
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(name) =>
          dispatch(setNewWhitelist({ ...newWhitelist, name }))
        }
        value={newWhitelist.name}
        label="Enter Address Name"
      />

      <Pressable style={styles.button} onPress={handleHide}>
        <AppText medium style={styles.buttonText}>
          Add Address
        </AppText>
      </Pressable>
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      bottom
      visible={addWhitelistModalVisble}
      title="Add Whitelist"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: '100%',
    backgroundColor: colors.SECONDARY_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  input: {
    marginBottom: 16,
  },
});
