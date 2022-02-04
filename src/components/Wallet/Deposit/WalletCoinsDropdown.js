import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import images from '../../../constants/images';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { toggleCurrencyModal } from '../../../redux/modals/actions';

export default function WalletCoinsDropdown() {
  const dispatch = useDispatch();

  const handleDropdown = () => {
    dispatch(toggleCurrencyModal(true));
  };

  return (
    <Pressable style={styles.container} onPress={handleDropdown}>
      <Image source={images.ETH} style={styles.image} />

      <View style={styles.balance}>
        <AppText body medium style={styles.primary}>
          0.5 BTC
        </AppText>
        <AppText subtext style={styles.secondary}>
          Total: 0.5 = 20000 USD
        </AppText>
      </View>

      <View style={styles.line} />

      <View style={styles.arrow}>
        <Image source={images.Arrow} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  balance: {
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 18,
    flex: 1,
  },
  container: {
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  image: {
    width: 34,
    height: 34,
  },
  line: {
    width: 1,
    backgroundColor: '#3B4160',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
