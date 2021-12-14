import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../AppText';
import Transaction from './Transaction';
import colors from '../../constants/colors';
import { monthsShort } from '../../constants/months';

export default function TransactionDate({ date, transactions }) {
  const isDate = () => {
    return transactions.map((tr) => {
      const transaction = {
        timestamp: tr.timestamp,
        type: tr.type,
        status: tr.status,
        amount: tr.amount,
        currency: tr.currency,
        transactionInfo: tr.transactionInfo,
        fee: tr.fee,
        method: tr.method,
      };

      let currentDate = new Date(transaction.timestamp);
      const time = currentDate
        .toTimeString('en-US', { hour12: false })
        .split(' ')[0];

      currentDate = `${currentDate.getDate()} ${
        monthsShort[currentDate.getMonth()]
      }, ${currentDate.getFullYear()}`;

      if (date === currentDate) {
        return (
          <Transaction
            key={Math.random()}
            transaction={transaction}
            time={time}
            date={date}
          />
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.date}>{date}</AppText>
      {isDate()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  date: { fontSize: 15, color: colors.SECONDARY_TEXT, marginBottom: 15 },
});
