import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import AppText from '../AppText';

export default function TotalBalance() {
  const filter = useSelector((state) => state.wallet.usdBtcSwitch);
  const balance = useSelector((state) => state.trade.balance);

  const { totalValueBTC, totalValueUSD } = balance;

  const primary = () =>
    filter === 'USD'
      ? `Total: ${totalValueUSD} USD`
      : `Total: ${totalValueBTC} BTC`;
  const secondary = () =>
    filter === 'USD' ? `${totalValueBTC} BTC` : `${totalValueUSD} USD`;

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