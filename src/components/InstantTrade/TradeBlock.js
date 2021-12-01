import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import AppText from '../AppText';
import CurrencyDropdowns from './CurrencyDropdowns';
import ReadyTrades from './ReadyTrades';
import Timer from './Timer';

export default function TradeBlock() {
  return (
    <View style={styles.container}>
      <CurrencyDropdowns />

      <AppText subtext body style={styles.price}>
        1 BTC = 181 903.35 GEL
      </AppText>

      <ReadyTrades />

      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  price: {
    color: colors.SECONDARY_TEXT,
    marginVertical: 10,
  },
});
