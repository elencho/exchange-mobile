import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppButton from '../../AppButton';
import AppInput from '../../AppInput';
import ChooseNetworkDropdown from '../../Wallet/Deposit/ChooseNetworkDropdown';
import ChooseNetworkModal from '../../Wallet/Deposit/ChooseNetworkModal';
import {
  toggleAddWhitelistModal,
  toggleEditWhitelistModal,
  toggleEmailAuthModal,
  toggleGoogleAuthModal,
  toggleSmsAuthModal,
} from '../../../redux/modals/actions';
import {
  chooseWhitelist,
  editWhitelistAction,
  setNewWhitelist,
} from '../../../redux/wallet/actions';
import { sendOtp } from '../../../utils/userProfileUtils';
import GeneralError from '../../GeneralError';

export default function AddEditWhitelistModal({ add, edit }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { addWhitelistModalVisble, editWhitelistModalVisble },
    wallet: { newWhitelist, currentWhitelistObj, whitelist },
    profile: { googleAuth, emailAuth, smsAuth, generalError },
    trade: { currentBalanceObj },
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
    if (add) dispatch(setNewWhitelist({ ...newWhitelist, name }));
    if (edit) dispatch(chooseWhitelist({ ...currentWhitelistObj, name }));
  };

  const tag = () => {
    if (whitelist[0]) {
      return whitelist[0].tag;
    }
    return;
  };

  const networks = () => {
    if (currentBalanceObj.withdrawalMethods.WALLET) {
      return currentBalanceObj.withdrawalMethods.WALLET.length > 1;
    }
    return;
  };

  const children = (
    <>
      {generalError ? (
        <View style={{ marginBottom: 10 }}>
          <GeneralError />
        </View>
      ) : null}

      {networks() && (
        <View style={styles.input}>
          <ChooseNetworkDropdown disabled={edit ? true : false} />
          <ChooseNetworkModal />
        </View>
      )}

      <AppInput
        style={styles.input}
        onChangeText={(name) => handleChange(name)}
        value={add ? newWhitelist.name : currentWhitelistObj.name}
        label="Enter Address Name"
      />
      <AppInput
        style={[styles.input, { opacity: add ? 1 : 0.5 }]}
        onChangeText={(address) =>
          dispatch(setNewWhitelist({ ...newWhitelist, address }))
        }
        value={add ? newWhitelist.address : currentWhitelistObj.address}
        label="Destination Address"
        editable={add ? true : false}
        focusable={add ? true : false}
      />
      {tag() && (
        <AppInput
          style={[styles.input, { opacity: add ? 1 : 0.5 }]}
          onChangeText={(tag) =>
            dispatch(setNewWhitelist({ ...newWhitelist, tag }))
          }
          value={add ? newWhitelist.tag : currentWhitelistObj.tag}
          label="Address Tag"
          editable={add ? true : false}
          focusable={add ? true : false}
        />
      )}

      <AppButton
        text={add ? 'Add Address' : 'Edit Address'}
        style={[styles.button, { opacity: enabled ? 1 : 0.5 }]}
        onPress={handleHide}
        disabled={!enabled}
      />
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      fullScreen
      visible={add ? addWhitelistModalVisble : editWhitelistModalVisble}
      title={`${add ? 'Add' : 'Edit'} Whitelist`}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    left: 15,
  },
  input: {
    marginBottom: 16,
  },
});
