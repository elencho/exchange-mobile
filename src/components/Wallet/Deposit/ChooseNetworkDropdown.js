import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../../../constants/images';
import colors from '../../../constants/colors';
import AppText from '../../AppText';
import { toggleChooseNetworkModal } from '../../../redux/modals/actions';

export default function ChooseNetworkDropdown() {
  const dispatch = useDispatch();
  const network = useSelector((state) => state.wallet.network);

  const handleDropdown = () => {
    dispatch(toggleChooseNetworkModal(true));
  };

  const networkName = () => {
    if (network === 'ERC20') return 'Ethereum Network';
    if (network === 'BEP20') return 'Binance Smart Chain';
  };

  return (
    <Pressable style={styles.dropdown} onPress={handleDropdown}>
      <View style={styles.subtext}>
        <AppText body style={styles.secondary}>
          Choose Network
        </AppText>
      </View>

      <Image source={images.BTC} style={styles.image} />
      <AppText medium style={styles.dropdownText}>
        {networkName()} <AppText style={styles.secondary}>({network})</AppText>
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
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  subtext: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -7,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 8,
  },
});
