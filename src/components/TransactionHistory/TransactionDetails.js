import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TransactionDetails() {
  const state = useSelector((state) => state.transactions);

  const {
    currentTransaction: { method, amount, fee, status, date, time, currency },
  } = state;

  const LeftText = ({ text }) => (
    <View style={styles.leftTextContainer}>
      <AppText style={styles.leftText}>{text} :</AppText>
    </View>
  );

  const RightText = ({ text, style }) => (
    <View style={styles.rightTextContainer}>
      <AppText medium style={[styles.rightText, style]}>
        {text}
      </AppText>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        {['Method', 'Amount', 'Fee', 'Date / Time', 'Status'].map((e) => (
          <LeftText key={e} text={e} />
        ))}
      </View>

      <View style={styles.right}>
        <RightText text={method} style={styles.capitalize} />
        <RightText text={`${amount} ${currency}`} />
        <RightText text={`${fee} ${currency}`} />
        <RightText text={`${date} / ${time}`} />
        <RightText text={status} style={styles.capitalize} />
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
