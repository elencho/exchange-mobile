import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';

import images from '../../constants/images';
import AppText from '../AppText';

export default function Currency() {
  return (
    <Pressable style={styles.container}>
      <Image source={images.ETH} style={styles.image} />

      <View style={styles.balance}>
        <AppText calendarDay medium style={styles.primary}>
          20000 USD
        </AppText>
        <AppText body style={styles.secondary}>
          Total: 0.0000008 = 30000.00 USD
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  balance: {
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  container: {
    flexDirection: 'row',
    height: 42,
    marginBottom: 25,
  },
  image: {
    width: 42,
    height: 42,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
