import React from 'react';
import { StyleSheet, View } from 'react-native';
import { months } from '../../constants/filters';

import AppText from '../AppText';
import Transaction from './Transaction';

export default function TransactionDate({ date, transactions }) {
  const isDate = () => {
    return transactions.map((tr) => {
      const {
        timestamp,
        type,
        status,
        amount,
        currency,
        transactionId,
        fee,
        method,
      } = tr;

      let currentDate = new Date(timestamp);
      const time = currentDate
        .toTimeString('en-US', { hour12: false })
        .split(' ')[0];

      currentDate = `${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }, ${currentDate.getFullYear()}`;

      if (date === currentDate) {
        return (
          <Transaction
            key={Math.random()}
            type={type}
            status={status}
            amount={amount}
            currency={currency}
            transactionId={transactionId}
            fee={fee}
            method={method}
            date={date}
            time={time}
            currency={currency}
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
    backgroundColor: '#1F1F35',
  },
  date: { fontSize: 15, color: '#696F8E', marginBottom: 15 },
});
