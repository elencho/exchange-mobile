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
import BuyIcon from '../../assets/images/Buy';
import SellIcon from '../../assets/images/Sell';

import { monthsShort } from '../../constants/months';

export default function Transaction({ transactionData, loading, isTransfer }) {
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
    action,
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
  const destinationText = isTransfer ? 'Identifier' : 'From Amount';
  const amountDisplay = isTransfer
    ? `${amount} ${currency}`
    : ` ${cumulativeCost} ${quoteCurrency}`;
  const destinationDisplay = isTransfer
    ? shortenDestination(recipient)
    : `${size} ${baseCurrency}`;

  return (
    <Pressable onPress={showModal} style={styles.container}>
      <View style={styles.topRow}>
        {isTransfer && image()}

        <View style={[styles.middle, isTransfer && { marginLeft: 10 }]}>
          <AppText medium style={styles.primaryText} body>
            {title}
          </AppText>
          {!isTransfer && (
            <View style={{ flexDirection: 'row', marginTop: 7 }}>
              {!isTransfer && action && (
                <>
                  <View style={styles.typeIcon}>
                    {action === 'ASK' ? <SellIcon /> : <BuyIcon />}
                  </View>
                  <AppText style={[styles.secondaryText]}>
                    Instant Trade
                  </AppText>
                </>
              )}
            </View>
          )}
          {isTransfer && (
            <AppText style={styles.secondaryText}>{method}</AppText>
          )}
        </View>

        <View style={styles.right}>
          <AppText medium style={styles.secondaryText}>
            {`${date} /${time}`}
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
    flex: 1,
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9 },

  // Texts
  secondaryText: { fontSize: 14, lineHeight: 16, color: colors.SECONDARY_TEXT },
  status: {
    fontSize: 14,
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
  title: {
    color: colors.PRIMARY_TEXT,
  },
  typeIcon: {
    marginRight: 6,
  },
});
