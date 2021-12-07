import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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
  return (
    <View style={styles.container}>
      <TopRow />

      <ScrollView style={{ height: 230 }}>
        <Trade />
        <Trade />
        <Trade />
        <Trade />
        <Trade />
        <Trade />
        <Trade />
        <Trade />
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
