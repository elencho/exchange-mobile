import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import DepositlIcon from '../../assets/images/Deposit.svg';
import WithdrawalIcon from '../../assets/images/Withdrawal.svg';

import colors from '../../constants/colors';
import { transactionDetailsSaga } from '../../redux/transactions/actions';
import { toggleTransactionDetails } from '../../redux/modals/actions';
import { COINS_URL_PNG } from '../../constants/api';

import Pending from '../../assets/images/Pending.svg';
import Success from '../../assets/images/Success.svg';
import Failed from '../../assets/images/Failed.svg';
import { monthsShort } from '../../constants/months';

export default function Transaction({ transactionData, loading, isTransfer }) {
  console.log({ transactionData, loading });
  const dispatch = useDispatch();

  const {
    type,
    status,
    transactionInfo,
    amount,
    currency,
    recipient,
    method,
    baseCurrency,
    quoteCurrency,
    creationTime,
    timestamp,
    cumulativeCost,
    size,
  } = transactionData;

  let date = new Date(isTransfer ? timestamp : creationTime);
  const time = date.toTimeString('en-US', { hour12: false }).split(' ')[0];
  date = `${date.getDate()} ${monthsShort[date.getMonth()]}`;

  const currentTransaction = {
    ...transactionData,
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
    if (isTransfer) {
      if (type === 'DEPOSIT') return <DepositlIcon />;
      if (type === 'WITHDRAWAL') return <WithdrawalIcon />;
    } else {
      return (
        <View style={styles.currencyIcons}>
          <Image
            style={styles.icon}
            source={{
              uri: `${COINS_URL_PNG}/${baseCurrency.toLowerCase()}.png`,
            }}
          />

          <Image
            style={styles.upperIcon}
            source={{
              uri: `${COINS_URL_PNG}/${quoteCurrency.toLowerCase()}.png`,
            }}
          />
        </View>
      );
    }
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

  const shortenDestination = (destination) => {
    return method === 'WALLET_INTERNAL' || method === 'WALLET'
      ? destination.slice(0, 13) + '...' + destination.slice(-10)
      : destination;
  };

  const title = isTransfer ? type : `${baseCurrency}-${quoteCurrency}`;
  const amountText = isTransfer ? 'Amount' : 'To Amount';
  const destinationText = isTransfer ? 'Destination' : 'From Amount';
  const amountDisplay = isTransfer
    ? `${amount} ${currency}`
    : ` ${cumulativeCost} ${quoteCurrency}`;
  const destinationDisplay = isTransfer
    ? shortenDestination(recipient)
    : `${size} ${baseCurrency}`;

  return (
    <Pressable onPress={showModal} style={styles.container}>
      <View style={styles.topRow}>
        {image()}

        <View style={styles.middle}>
          <AppText
            medium
            style={[styles.primaryText, !isTransfer && { marginLeft: 15 }]}
            body
          >
            {title}
          </AppText>
          {/* ToDo */}
          {transactionInfo ? (
            <AppText style={styles.secondaryText}>
              {getReducedAddress(transactionInfo)}
            </AppText>
          ) : null}
        </View>

        <View style={styles.right}>
          <AppText medium style={styles.secondaryText}>
            {`${date}/${time}`}
          </AppText>
          <View style={styles.statusRow}>
            <AppText subtext style={styles.status}>
              {status}
            </AppText>
            <View style={[{ backgroundColor: statusIcon }, styles.bullet]} />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <AppText style={styles.secondaryText}>{destinationText}</AppText>
        <AppText style={styles.secondaryText}>{destinationDisplay}</AppText>
      </View>

      <View style={styles.row}>
        <AppText style={styles.secondaryText}>{amountText}</AppText>
        <AppText medium style={styles.primaryText} body>
          {amountDisplay}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: '#292943',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  bullet: { width: 4, height: 4, marginLeft: 5 },

  middle: {
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1,
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },

  // Texts
  secondaryText: { fontSize: 12, lineHeight: 16, color: colors.SECONDARY_TEXT },
  status: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.SECONDARY_TEXT,
    marginRight: 5,
  },
  primaryText: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.PRIMARY_TEXT,
    marginBottom: 5,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  //icons
  currencyIcons: { flexDirection: 'row' },
  icon: {
    width: 30,
    height: 30,
  },
  upperIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 15,
  },
});
