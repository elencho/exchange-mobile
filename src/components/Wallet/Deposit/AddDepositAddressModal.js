import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/colors';
import { toggleAddDepositAddressModal } from '../../../redux/modals/actions';
import AppInput from '../../AppInput';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import ChooseNetworkDropdown from './ChooseNetworkDropdown';

export default function AddDepositAddressModal() {
  const dispatch = useDispatch();
  const addDepositAddressModalVisble = useSelector(
    (state) => state.modals.addDepositAddressModalVisble
  );

  const hide = () => {
    dispatch(toggleAddDepositAddressModal(false));
  };

  const children = (
    <>
      <ChooseNetworkDropdown />
      <View style={styles.margin} />

      <AppInput placeholder="Enter Name" />
      <View style={styles.margin} />
      <AppInput placeholder="Enter Address" />

      <Pressable
        // onPress={handleSubmit}
        // disabled={!enabled()}
        style={[styles.button /* { opacity: enabled() ? 1 : 0.5, } */]}
      >
        <AppText medium style={styles.buttonText}>
          Add Address
        </AppText>
      </Pressable>
    </>
  );

  return (
    <AppModal
      visible={addDepositAddressModalVisble}
      hide={hide}
      fullScreen
      title="Deposit Address"
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.SECONDARY_PURPLE,

    position: 'absolute',
    right: 30,
    left: 30,
    bottom: 40,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  margin: {
    marginVertical: 10,
  },
});
