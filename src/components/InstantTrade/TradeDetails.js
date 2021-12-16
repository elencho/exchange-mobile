import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { monthsShort } from '../../constants/months';
import AppText from '../AppText';

export default function TradeDetails() {
  const currentTransaction = useSelector(
    (state) => state.transactions.currentTransaction
  );
  const {
    baseCurrency,
    quoteCurrency,
    price,
    size,
    cumulativeCost,
    status,
    lastChangeTime,
    creationTime,
  } = currentTransaction;

  const date = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${
      monthsShort[date.getMonth()]
    }, ${date.getFullYear()} / ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.leftText}>Amount:</AppText>
        <AppText style={styles.leftText}>Price:</AppText>
        <AppText style={styles.leftText}>Create Date::</AppText>
        <AppText style={styles.leftText}>End Date:</AppText>
        <AppText style={styles.leftText}>Status:</AppText>
      </View>

      <View style={styles.right}>
        <AppText medium style={styles.rightText}>
          {cumulativeCost} {quoteCurrency} / {size} {baseCurrency}
        </AppText>
        <AppText medium style={styles.rightText}>
          {price} {baseCurrency}
        </AppText>
        <AppText medium style={styles.rightText}>
          {date(creationTime)}
        </AppText>
        <AppText medium style={styles.rightText}>
          {date(lastChangeTime)}
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
    color: colors.PRIMARY_TEXT,
  },
});
