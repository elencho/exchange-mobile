import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import DepositlIcon from '../../assets/images/Deposit.svg';
import WithdrawalIcon from '../../assets/images/Withdrawal.svg';

import colors from '../../constants/colors';
import { transactionDetailsSaga } from '../../redux/transactions/actions';
import { toggleTransactionDetails } from '../../redux/modals/actions';

import Pending from '../../assets/images/Pending.svg';
import Success from '../../assets/images/Success.svg';
import Failed from '../../assets/images/Failed.svg';

export default function Transaction({ transaction, date, time }) {
  const dispatch = useDispatch();

  const { type, status, transactionInfo, amount, currency } = transaction;

  const currentTransaction = {
    ...transaction,
    date,
    time,
  };

  const showModal = () => {
    dispatch(transactionDetailsSaga(currentTransaction));
    dispatch(toggleTransactionDetails(true));
  };

  const getReducedAddress = (address) =>
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  const image = () => {
    if (type === 'DEPOSIT') return <DepositlIcon />;
    if (type === 'WITHDRAWAL') return <WithdrawalIcon />;
  };

  const statusIcon = () => {
    if (status === 'PENDING') return <Pending style={styles.dot} />;
    if (status === 'SUCCESS') return <Success style={styles.dot} />;
    if (status === 'FAILED') return <Failed style={styles.dot} />;
  };

  return (
    <Pressable onPress={showModal} style={styles.container}>
      {image()}

      <View style={styles.middle}>
        <AppText medium style={styles.type} body>
          {type}
        </AppText>
        {transactionInfo ? (
          <AppText style={styles.address}>
            {getReducedAddress(transactionInfo)}
          </AppText>
        ) : null}
      </View>

      <View style={styles.right}>
        <View style={styles.statusRow}>
          <AppText style={[styles.status, { marginRight: 5 }]} body>
            {status}
          </AppText>
          {statusIcon()}
        </View>

        <AppText medium style={styles.currency}>
          {amount} {currency}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  dot: { width: 5, height: 5 },
  middle: {
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center' },

  // Texts
  address: { fontSize: 12, lineHeight: 16, color: colors.SECONDARY_TEXT },
  status: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.SECONDARY_TEXT,
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.PRIMARY_TEXT,
    marginBottom: 5,
  },
  currency: { fontSize: 14, lineHeight: 18, color: colors.PRIMARY_TEXT },
});
