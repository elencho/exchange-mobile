import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { t } from 'i18next';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleTransactionDetails } from '../../redux/modals/actions';
import { monthsShort } from '../../constants/months';
import { transactionDetailsSaga } from '../../redux/transactions/actions';

export default function Trade({ trade }) {
  const {
    baseCurrency,
    quoteCurrency,
    price,
    size,
    cumulativeCost,
    action,
    status,
    lastChangeTime,
  } = trade;

  const dispatch = useDispatch();

  const show = () => {
    dispatch(toggleTransactionDetails(true));
    dispatch(transactionDetailsSaga(trade));
  };

  const date = () => {
    const date = new Date(lastChangeTime);
    const number = date.getDate();
    const month = monthsShort[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();

    return `${number} ${month}, ${year} / ${time}`;
  };

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
    <Pressable style={styles.container} onPress={show}>
      <View style={styles.row}>
        <AppText style={[styles.primary, { marginRight: 10 }]} medium body>
          {baseCurrency} - {quoteCurrency}
        </AppText>
        <View style={styles.amount}>
          <AppText style={styles.secondary} subtext>
            {cumulativeCost} {quoteCurrency}
          </AppText>
          <AppText subtext style={styles.primary}>
            {' / '}
            {size} {baseCurrency}
          </AppText>
        </View>
      </View>

      <View style={styles.row}>
        <AppText style={styles.primary} subtext>
          {action === 'BID' ? t('Buy') : t('Sell')}
          <AppText subtext style={styles.secondary}>
            {' / '}
            {t('Instant Trade')}
          </AppText>
        </AppText>
        <AppText subtext style={styles.secondary}>
          {t('Price :')} {price} {quoteCurrency}
        </AppText>
      </View>

      <View style={[styles.row, styles.marginTop]}>
        <AppText subtext style={styles.secondary}>
          {date()}
        </AppText>

        <View style={styles.status}>
          <AppText subtext style={styles.secondary}>
            {status}
          </AppText>
          <View style={[styles.bullet, { backgroundColor }]} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bullet: { width: 3, height: 3, marginLeft: 6 },
  container: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#232945',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 8,
    marginBottom: 13,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    flexDirection: 'row',
  },
});
