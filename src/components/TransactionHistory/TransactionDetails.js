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
      action,
      year,
    },
    activeTab,
  } = state;

  const actionMapping = {
    BID: 'Buy',
    ASK: 'Sell',
  };

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

  const Status = ({ statusText }) => {
    return (
      <View style={styles.statusContainer}>
        <View style={{ backgroundColor: statusIcon, width: 4, height: 4 }} />
        <AppText style={styles.rightText}>{statusText}</AppText>
      </View>
    );
  };

  const statusIcon =
    status === 'COMPLETED' || status === 'SUCCESS'
      ? '#25D8D1'
      : status === 'WAITING_DEPOSIT'
      ? '#FADD90'
      : status === 'FAILED'
      ? '#BE1E3E'
      : status === 'EXPIRED'
      ? '#BE1E3E'
      : status === 'PENDING'
      ? '#FADD90'
      : '#F83974';

  const leftInstant = [
    'Transaction type :',
    'Date created :',
    'End Date :',
    'From Amount :',
    'To amount :',
    'Market price :',
    'Status :',
  ];

  const rightInstant = [
    `${actionMapping[action]} - ${type}`,
    `${date} ${year} / ${time}`,
    `${date} ${year} / ${time}`,
    action === 'BID'
      ? `${cumulativeCost} ${quoteCurrency}`
      : `${size} ${baseCurrency}`,
    action === 'BID'
      ? `${size} ${baseCurrency}`
      : `${cumulativeCost} ${quoteCurrency}`,
    `${price} ${quoteCurrency}`,
    <Status statusText={status} />,
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
    `${date} ${year} / ${time}`,
    amount ? `${amount} ${currency}` : ` ${cumulativeCost} ${quoteCurrency}`,
    `${fee} ${currency}`,
    `${totalAmount} ${currency}`,
    <Status statusText={status} />,
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
  },
  rightTextContainer: {
    height: 30,
    justifyContent: 'center',
  },
  rightText: {
    color: colors.PRIMARY_TEXT,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
