import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import images from '../../../constants/images';
import colors from '../../../constants/colors';
import AppText from '../../AppText';

export default function ChooseNetworkDropdown() {
  return (
    <Pressable style={styles.dropdown}>
      <View style={styles.subtext}>
        <AppText body style={styles.secondary}>
          Choose Network
        </AppText>
      </View>

      <Image source={images.BTC} style={styles.image} />
      <AppText medium style={styles.dropdownText}>
        Binance smart chain <AppText style={styles.secondary}>(BEP20)</AppText>
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
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 8,
  },
});
