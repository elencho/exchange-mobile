import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
} from '../../../redux/modals/actions';
import {
  chooseWhitelist,
  editWhitelistAction,
  setNewWhitelist,
} from '../../../redux/wallet/actions';
import { sendOtp } from '../../../utils/userProfileUtils';
import GeneralError from '../../GeneralError';
import SmsEmailAuthModal from '../../UserProfile/SmsEmailAuthModal';
import GoogleOtpModal from '../../UserProfile/GoogleOtpModal';
import { errorHappenedHere } from '../../../utils/appUtils';

export default function AddEditWhitelistModal({ add, edit }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { addWhitelistModalVisble, editWhitelistModalVisble },
    wallet: {
      newWhitelist,
      currentWhitelistObj,
      whitelist,
      network,
      hasMultipleNetworks,
    },
    profile: { googleAuth, emailAuth, smsAuth },
    trade: { currentBalanceObj },
  } = state;

  const hide = () => {
    if (add) dispatch(toggleAddWhitelistModal(false));
    if (edit) dispatch(toggleEditWhitelistModal(false));
    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  };

  const [error, setError] = useState(false);
  useEffect(() => {
    error && setError(false);
  }, [
    network,
    currentWhitelistObj,
    newWhitelist,
    addWhitelistModalVisble,
    editWhitelistModalVisble,
  ]);

  const tag = () => {
    if (currentBalanceObj.infos) {
      const type = currentBalanceObj?.infos[network]?.transactionRecipientType;

      if (whitelist[0]?.tag) {
        return whitelist[0].tag;
      }
      return type === 'ADDRESS_AND_TAG';
    }
  };

  const handleAdd = () => {
    const condition = () => {
      const obj = add ? newWhitelist : currentWhitelistObj;
      if (tag()) {
        return !network || !obj?.name || !obj?.address || !obj?.tag;
      } else {
        return !network || !obj?.name || !obj?.address;
      }
    };

    if (condition()) {
      setError(true);
    } else {
      if (add) {
        if (googleAuth) dispatch(toggleGoogleOtpModal(true));
        if (emailAuth) dispatch(toggleEmailAuthModal(true));
        if (smsAuth) dispatch(toggleSmsAuthModal(true));
        if (!googleAuth) sendOtp();
      }
      if (edit) {
        dispatch(editWhitelistAction());
      }
    }
  };

  const clearInputs = () => dispatch(setNewWhitelist({}));

  const handleChange = (name) => {
    if (add) dispatch(setNewWhitelist({ ...newWhitelist, name }));
    if (edit) dispatch(chooseWhitelist({ ...currentWhitelistObj, name }));
  };

  const tagStyle = {
    opacity: add ? 1 : 0.5,
    borderColor: error && !currentWhitelistObj?.tag && '#F45E8C',
  };
  const addressStyle = {
    opacity: add ? 1 : 0.5,
    borderColor: error && !currentWhitelistObj?.address && '#F45E8C',
  };
  const nameStyle = {
    borderColor: error && !currentWhitelistObj?.name && '#F45E8C',
  };
  const nameError = add ? !newWhitelist?.name : !currentWhitelistObj?.name;
  const addressError = add ? !newWhitelist?.address : false;
  const tagError = add ? !newWhitelist?.tag : false;

  const children = (
    <>
      <GeneralError
        style={styles.error}
        show={errorHappenedHere('AddEditWhitelistModal')}
      />

      {hasMultipleNetworks && (
        <View style={styles.input}>
          <ChooseNetworkDropdown disabled={!!edit} whitelist error={error} />
          <ChooseNetworkModal />
        </View>
      )}

      <AppInput
        style={[styles.input, nameStyle]}
        onChangeText={(name) => handleChange(name)}
        value={add ? newWhitelist.name : currentWhitelistObj.name}
        label="Enter Address Name"
        error={error && nameError}
      />
      <AppInput
        style={[styles.input, addressStyle]}
        onChangeText={(address) =>
          dispatch(setNewWhitelist({ ...newWhitelist, address }))
        }
        value={add ? newWhitelist.address : currentWhitelistObj.address}
        label="Destination Address"
        editable={add ? true : false}
        focusable={add ? true : false}
        error={error && addressError}
      />
      {tag() && (
        <AppInput
          style={[styles.input, tagStyle]}
          onChangeText={(tag) =>
            dispatch(setNewWhitelist({ ...newWhitelist, tag }))
          }
          value={add ? newWhitelist.tag : currentWhitelistObj.tag}
          label="Address Tag"
          editable={add ? true : false}
          focusable={add ? true : false}
          error={error && tagError}
        />
      )}

      <AppButton
        text={add ? 'Add Address' : 'Edit Address'}
        style={styles.button}
        onPress={handleAdd}
      />

      <SmsEmailAuthModal type="SMS" whitelist />
      <SmsEmailAuthModal type="Email" whitelist />
      <GoogleOtpModal whitelist />
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      fullScreen
      visible={add ? addWhitelistModalVisble : editWhitelistModalVisble}
      title={`${add ? 'Add' : 'Edit'} Whitelist`}
      onModalHide={clearInputs}
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
  error: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
  },
});
