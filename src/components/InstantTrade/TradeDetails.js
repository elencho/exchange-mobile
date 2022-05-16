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

  const LeftText = ({ text }) => (
    <View style={styles.leftTextContainer}>
      <AppText style={styles.leftText}>{text} :</AppText>
    </View>
  );

  const RightText = ({ text }) => (
    <View style={styles.rightTextContainer}>
      <AppText medium style={styles.rightText}>
        {text}
      </AppText>
    </View>
  );

  const backgroundColor = status === 'COMPLETED' ? '#25D8D1' : '#F83974';

  return (
    <View style={styles.container}>
      <View>
        {['Amount', 'Price', 'Create Date', 'End Date', 'Status'].map((e) => (
          <LeftText key={e} text={e} />
        ))}
      </View>

      <View style={styles.right}>
        <RightText
          text={`${cumulativeCost} ${quoteCurrency} / ${size} ${baseCurrency}`}
        />
        <RightText text={`${price} ${baseCurrency}`} />
        <RightText text={date(creationTime)} />
        <RightText text={date(lastChangeTime)} />

        <View style={styles.status}>
          <RightText text={status} />
          <View style={[styles.bullet, { backgroundColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bullet: { width: 3, height: 3, marginLeft: 6 },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
  },
  leftTextContainer: {
    height: 30,
    justifyContent: 'center',
  },
  rightTextContainer: {
    height: 30,
    justifyContent: 'center',
  },
  leftText: {
    color: '#C0C5E0',
  },
  rightText: {
    color: colors.PRIMARY_TEXT,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
