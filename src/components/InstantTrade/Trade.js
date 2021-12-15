import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleTransactionDetails } from '../../redux/modals/actions';
import { monthsShort } from '../../constants/months';

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
  };

  const date = () => {
    const date = new Date(lastChangeTime);
    return `${date.getDate()} ${
      monthsShort[date.getMonth()]
    }, ${date.getFullYear()} / ${date.toLocaleTimeString()}`;
  };

  return (
    <Pressable style={styles.container} onPress={show}>
      <View style={styles.row}>
        <AppText style={styles.primary} medium body>
          {baseCurrency} - {quoteCurrency}
        </AppText>
        <AppText style={styles.secondary} subtext>
          {cumulativeCost} {quoteCurrency}{' '}
          <AppText subtext style={styles.primary}>
            / {size} {baseCurrency}
          </AppText>
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText style={styles.primary} body>
          {action === 'BID' ? 'Buy ' : 'Sell '}
          <AppText subtext style={styles.secondary}>
            / Instant Trade
          </AppText>
        </AppText>
        <AppText subtext style={styles.secondary}>
          Price: {price} {quoteCurrency}
        </AppText>
      </View>

      <View style={[styles.row, styles.marginTop]}>
        <AppText subtext style={styles.secondary}>
          {date()}
        </AppText>
        <AppText subtext style={[styles.secondary, styles.capitalize]}>
          {status}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  capitalize: {
    textTransform: 'capitalize',
  },
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
});
