import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';

export default function TransactionDetails() {
  const state = useSelector((state) => state.transactions);

  const {
    currentTransaction: { method, amount, fee, status, date, time, currency },
  } = state;

  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.leftText}>Method:</AppText>
        <AppText style={styles.leftText}>Amount:</AppText>
        <AppText style={styles.leftText}>Fee:</AppText>
        <AppText style={styles.leftText}>Date / Time:</AppText>
        <AppText style={styles.leftText}>Status:</AppText>
      </View>

      <View style={styles.right}>
        <AppText medium style={[styles.rightText, styles.capitalize]}>
          {method}
        </AppText>
        <AppText medium style={styles.rightText}>
          {amount} {currency}
        </AppText>
        <AppText medium style={styles.rightText}>
          {fee} {currency}
        </AppText>
        <AppText medium style={styles.rightText}>
          {date} / {time}
        </AppText>
        <AppText medium style={[styles.rightText, styles.capitalize]}>
          {status}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capitalize: { textTransform: 'capitalize' },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
  },
  leftText: {
    color: '#C0C5E0',
    fontSize: 12,
    marginVertical: 5,
  },
  rightText: {
    fontSize: 12,
    marginVertical: 5,
    color: 'white',
  },
});
