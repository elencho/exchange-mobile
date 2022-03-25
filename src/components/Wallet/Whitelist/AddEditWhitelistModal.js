import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppInput from '../../AppInput';
import {
  toggleAddWhitelistModal,
  toggleEditWhitelistModal,
  toggleEmailAuthModal,
  toggleGoogleAuthModal,
  toggleSmsAuthModal,
} from '../../../redux/modals/actions';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import {
  chooseWhitelist,
  editWhitelistAction,
  setNewWhitelist,
} from '../../../redux/wallet/actions';
import { sendOtp } from '../../../utils/userProfileUtils';

export default function AddEditWhitelistModal({ add, edit }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { addWhitelistModalVisble, editWhitelistModalVisble },
    wallet: { newWhitelist, currentWhitelistObj },
    profile: { googleAuth, emailAuth, smsAuth },
  } = state;

  const hide = () => {
    if (add) dispatch(toggleAddWhitelistModal(false));
    if (edit) dispatch(toggleEditWhitelistModal(false));
  };

  const handleHide = () => {
    hide();
    if (add) {
      setTimeout(() => {
        if (googleAuth) dispatch(toggleGoogleAuthModal(true));
        if (emailAuth) dispatch(toggleEmailAuthModal(true));
        if (smsAuth) dispatch(toggleSmsAuthModal(true));
      }, 1000);
      sendOtp();
    }
    if (edit) {
      dispatch(editWhitelistAction());
    }
  };

  let enabled = true;
  if (add) enabled = newWhitelist.address && newWhitelist.name;

  const handleChange = (name) => {
    if (add) {
      dispatch(setNewWhitelist({ ...newWhitelist, name }));
    }
    if (edit) {
      dispatch(chooseWhitelist({ ...currentWhitelistObj, name }));
    }
  };

  const children = (
    <>
      <AppInput
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={[styles.input, { opacity: add ? 1 : 0.5 }]}
        onChangeText={(address) =>
          dispatch(setNewWhitelist({ ...newWhitelist, address }))
        }
        value={add ? newWhitelist.address : currentWhitelistObj.address}
        label="Destination Address"
        editable={add ? true : false}
        focusable={add ? true : false}
      />
      <AppInput
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(name) => handleChange(name)}
        value={add ? newWhitelist.name : currentWhitelistObj.name}
        label="Enter Address Name"
      />

      <Pressable style={styles.button} onPress={handleHide} disabled={!enabled}>
        <AppText medium style={styles.buttonText}>
          {add ? 'Add' : 'Edit'} Address
        </AppText>
      </Pressable>
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      bottom
      visible={add ? addWhitelistModalVisble : editWhitelistModalVisble}
      title={`${add ? 'Add' : 'Edit'} Whitelist`}
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
