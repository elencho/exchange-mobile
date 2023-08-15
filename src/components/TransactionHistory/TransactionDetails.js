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
      cumulativeCost,
      quoteCurrency,
      size,
      baseCurrency,
      price,
    },
    activeTab,
  } = state;

  const isInstantTrade = activeTab === 'Instant trade';

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

  const leftInstant = [
    'Transaction type :',
    'Date created :',
    'End Date',
    'From Amount',
    'To amount',
    'Market price :',
    'Status :',
  ];

  const rightInstant = [
    type,
    `${date} / ${time}`,
    `${date} / ${time}`,
    `${cumulativeCost} ${quoteCurrency}`,
    `${size} ${baseCurrency}`,
    `${price} ${quoteCurrency}`,
    status,
  ];

  const leftTransactions = [
    'Type :',
    'Network :',
    'Date / Time :',
    'Amount :',
    'Fee :',
    'Total Amount :',
    'Status :',
    'Method :',
  ];
  const rightTransactions = [
    type,
    providerDisplayName,
    `${date} / ${time}`,
    amount ? `${amount} ${currency}` : ` ${cumulativeCost} ${quoteCurrency}`,
    `${fee} ${currency}`,
    `${totalAmount} ${currency}`,
    status,
    method,
  ];

  const leftArray = isInstantTrade ? leftInstant : leftTransactions;
  const rightArray = isInstantTrade ? rightInstant : rightTransactions;

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
    marginLeft: 8,
  },
  rightTextContainer: {
    height: 30,
    justifyContent: 'center',
  },
  rightText: {
    color: colors.PRIMARY_TEXT,
  },
});
