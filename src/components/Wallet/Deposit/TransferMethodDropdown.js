import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { ICONS_URL_PNG } from '../../../constants/api';
import { toggleTransferMethodModal } from '../../../redux/modals/actions';

import Arrow from '../../../assets/images/Arrow';

export default function TransferMethodDropdown() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const { network, walletTab, methodsToDisplay } = wallet;

  const show = () => dispatch(toggleTransferMethodModal(true));
  const source =
    network === 'ECOMMERCE'
      ? { uri: `${ICONS_URL_PNG}/visa-or-mc.png` }
      : { uri: `${ICONS_URL_PNG}/${network}.png` };

  const oneMethod = methodsToDisplay?.length < 2;
  const dropdownStyle = {
    backgroundColor: oneMethod ? 'rgba(149, 164, 247, 0.04)' : null,
    borderWidth: oneMethod ? 0 : 1,
  };

  return (
    <Pressable
      style={[styles.dropdown, dropdownStyle]}
      onPress={show}
      disabled={oneMethod}
    >
      <Image source={source} style={styles.image} />
      <AppText medium style={styles.dropdownText}>
        {network}
      </AppText>
      {!oneMethod && <Arrow />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dropdownText: {
    flex: 1,
    marginHorizontal: 12,
    color: colors.PRIMARY_TEXT,
  },
  dropdown: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderColor: '#42475D',
    paddingHorizontal: 15,
  },
  image: {
    marginLeft: 5,
    height: 22,
    width: 60,
    resizeMode: 'contain',
  },
});
