import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppInput from '../../AppInput';
import { toggleAddWhitelistModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import colors from '../../../constants/colors';

export default function AddWhitelistModal() {
  const dispatch = useDispatch();
  const addWhitelistModalVisble = useSelector(
    (state) => state.modals.addWhitelistModalVisble
  );

  const hide = () => dispatch(toggleAddWhitelistModal(false));

  const children = (
    <>
      <AppInput style={styles.input} label="Destination Address" />
      <AppInput style={styles.input} label="Enter Address Name" />

      <Pressable style={styles.button}>
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
