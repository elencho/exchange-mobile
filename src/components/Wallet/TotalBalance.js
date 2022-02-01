import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import images from '../../constants/images';
import AppText from '../AppText';

export default function TotalBalance({ filter }) {
  const primary = () =>
    filter === 'USD' ? 'Total: 20000 USD' : 'Total: 0.5 BTC';
  const secondary = () => (filter === 'USD' ? '0.5 BTC' : '20000 USD');

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={images.Wallet} />
      </View>

      <View style={styles.justify}>
        <AppText calendarDay style={styles.primary}>
          {primary()}
        </AppText>
        <AppText body style={styles.secondary}>
          {secondary()}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
    flexDirection: 'row',
  },
  image: {
    height: 40,
    justifyContent: 'center',
    marginRight: 20,
  },
  justify: {
    justifyContent: 'space-between',
    height: 40,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
