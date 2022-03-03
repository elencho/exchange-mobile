import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import AppText from '../../AppText';

export default function TransferMethodDropdown() {
  return (
    <Pressable style={styles.dropdown}>
      <Image source={images.Swift} style={styles.image} />
      <AppText medium style={styles.dropdownText}>
        SWIFT Deposit
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
  },
});
