import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { transactionDetailsSaga } from '../../redux/transactions/actions';
import { toggleTransactionDetails } from '../../redux/modals/actions';
import images from '../../constants/images';

export default function Transaction({ transaction, date, time }) {
  const dispatch = useDispatch();

  const { type, status, transactionId, amount, currency } = transaction;

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

  const typeIcon = () => {
    if (type === 'DEPOSIT') {
      return images.Deposit;
    }
    if (type === 'WITHDRAWAL') {
      return images.Withdrawal;
    }
  };

  const statusIcon = () => {
    if (status === 'PENDING') {
      return images.Pending;
    }
    if (status === 'SUCCESS') {
      return images.Success;
    }
    if (status === 'FAILED') {
      return images.Failed;
    }
  };

  return (
    <Pressable onPress={showModal} style={styles.container}>
      <Image source={typeIcon()} />

      <View style={styles.middle}>
        <AppText medium style={styles.type}>
          {type}
        </AppText>
        {transactionId ? (
          <AppText style={styles.address}>
            {getReducedAddress(transactionId)}
          </AppText>
        ) : null}
      </View>

      <View style={styles.right}>
        <View style={styles.statusRow}>
          <AppText style={[styles.status, { marginRight: 5 }]}>
            {status}
          </AppText>
          <Image source={statusIcon()} style={styles.dot} />
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
  address: { fontSize: 12, color: colors.SECONDARY_TEXT },
  status: {
    fontSize: 12,
    color: colors.SECONDARY_TEXT,
    marginBottom: 5,
  },
  type: {
    fontSize: 14,
    color: colors.PRIMARY_TEXT,
    marginBottom: 5,
  },
  currency: { fontSize: 14, color: colors.PRIMARY_TEXT },
});
