import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import Trade from './Trade';

const TopRow = () => (
  <View style={styles.topRow}>
    <AppText header style={styles.header}>
      Transactions
    </AppText>
    <AppText subtext body style={styles.subText}>
      <PurpleText text="Hide " />
      other pairs
    </AppText>
  </View>
);

export default function TransactionsBlock() {
  const trades = useSelector((state) => state.trade.trades);
  console.log(trades);

  return (
    <View style={styles.container}>
      <TopRow />

      <ScrollView style={{ height: 280 }}>
        {trades.map((trade) => (
          <Trade trade={trade} key={trade.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
  },
  header: {
    color: colors.PRIMARY_TEXT,
  },
  subText: {
    color: colors.SECONDARY_TEXT,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
