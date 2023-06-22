import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    }, ${date.getFullYear()} / ${date.toLocaleTimeString('en-US', {
      hour12: false,
    })}`;
  };

  const LeftText = ({ text }) => (
    <View style={styles.leftTextContainer}>
      <AppText style={styles.leftText}>{`${text} :`}</AppText>
    </View>
  );

  const RightText = ({ text }) => (
    <View style={styles.rightTextContainer}>
      {typeof text === 'string' ? (
        <AppText medium numberOfLines={1} style={styles.rightText}>
          {text}
        </AppText>
      ) : (
        <View style={{ alignItems: 'flex-end' }}>{text}</View>
      )}
    </View>
  );

  const backgroundColor =
    status === 'COMPLETED'
      ? '#25D8D1'
      : 'WAITING_DEPOSIT'
      ? '#FADD90'
      : 'FAILED'
      ? '#BE1E3E'
      : 'EXPIRED'
      ? '#BE1E3E'
      : 'PENDING'
      ? '#FADD90'
      : '#F83974';

  return (
    <View style={styles.container}>
      <View>
        {['Amount', 'Price', 'Total', 'Create Date', 'End Date', 'Status'].map(
          (e) => (
            <LeftText key={e} text={e} />
          )
        )}
      </View>

      <View style={styles.right}>
        <RightText
          text={
            <>
              <AppText medium style={{ color: colors.PRIMARY_TEXT }}>
                {size} {baseCurrency}
              </AppText>
            </>
          }
        />
        <RightText text={`${price} ${quoteCurrency}`} />
        <RightText text={`${cumulativeCost} ${quoteCurrency}`} />
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
    width: '100%',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
