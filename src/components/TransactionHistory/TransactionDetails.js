import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TransactionDetails() {
  const state = useSelector((state) => state.transactions);

  const {
    currentTransaction: {
      method,
      amount,
      fee,
      status,
      date,
      time,
      currency,
      type,
      totalAmount,
      providerDisplayName,
    },
  } = state;

  const LeftText = ({ text }) => (
    <View style={styles.leftTextContainer}>
      <AppText style={styles.leftText}>{text}</AppText>
    </View>
  );

  const RightText = ({ text }) => (
    <View style={styles.rightTextContainer}>
      <AppText medium style={styles.rightText}>
        {text}
      </AppText>
    </View>
  );

  const leftArray = [
    'Type :',
    'Network :',
    'Date / Time :',
    'Amount :',
    'Fee :',
    'Total Amount :',
    'Status :',
    'Method :',
  ];
  const rightArray = [
    type,
    providerDisplayName,
    `${date} / ${time}`,
    `${amount} ${currency}`,
    `${fee} ${currency}`,
    `${totalAmount} ${currency}`,
    status,
    method,
  ];

  return (
    <View style={styles.container}>
      <View>
        {leftArray.map((e) => (
          <LeftText key={e} text={e} />
        ))}
      </View>

      <View style={styles.right}>
        {rightArray.map((e) => (
          <RightText text={e} key={Math.random()} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  leftTextContainer: {
    height: 30,
    justifyContent: 'center',
  },
  rightTextContainer: {
    height: 30,
    justifyContent: 'center',
  },
  rightText: {
    color: colors.PRIMARY_TEXT,
  },
});
