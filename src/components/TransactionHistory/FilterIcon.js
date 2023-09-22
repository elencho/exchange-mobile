import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import Filter from '../../assets/images/Filter';
import { setStatusModalInfo } from '../../redux/modals/actions';
export default function FilterIcon({ onPress, isInstantTrade }) {
  const { trade, transactions } = useSelector((state) => state);
  const {
    cryptoFilter: cryptoTransactions,
    method: selectedMethod,
    typeFilter,
    fromDateTime,
    toDateTime,
    status,
  } = transactions;
  const {
    actionQuery,
    cryptoCodeQuery,
    fiatCodesQuery,
    statusQuery,
    fromDateTimeQuery,
    toDateTimeQuery,
  } = trade;

  const isFilteredTrades = Boolean(
    fiatCodesQuery?.length > 0 ||
      actionQuery?.length > 0 ||
      statusQuery?.length > 0 ||
      cryptoCodeQuery ||
      fromDateTimeQuery ||
      toDateTimeQuery
  );
  const isFilteredTransactions = Boolean(
    typeFilter?.length > 0 ||
      cryptoTransactions ||
      fromDateTime ||
      toDateTime ||
      selectedMethod?.length > 0 ||
      status?.length > 0
  );
  const isFilteredAny = isInstantTrade
    ? isFilteredTrades
    : isFilteredTransactions;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isFilteredAny && { backgroundColor: colors.PRIMARY_PURPLE },
      ]}
    >
      <Filter style={styles.icon} />
      {isFilteredAny ? (
        <View style={styles.dotOutline}>
          <View style={styles.dot} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 44,
    backgroundColor: colors.BUTTON_DISABLED,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 11,
  },
  icon: {
    width: 18,
    height: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 30,
    backgroundColor: colors.SECONDARY_PURPLE,
  },
  dotOutline: {
    width: 12,
    height: 12,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    borderRadius: 30,
    position: 'absolute',
    top: -2,
    right: -2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
