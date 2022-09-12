import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ICONS_URL_PNG } from '../../../constants/api';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleTransferMethodModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';

export default function TransferMethodDropdown() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const { network, walletTab } = wallet;

  const show = () => dispatch(toggleTransferMethodModal(true));
  const source =
    network === 'ECOMMERCE'
      ? { uri: `${ICONS_URL_PNG}/visa-or-mc.png` }
      : { uri: `${ICONS_URL_PNG}/${network}.png` };

  return (
    <Pressable style={styles.dropdown} onPress={show}>
      <Image source={source} style={styles.image} />
      <AppText medium style={styles.dropdownText}>
        {network} {walletTab}
      </AppText>
      <Image source={images.Arrow} />
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
    borderWidth: 1,
    borderRadius: 4,
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
