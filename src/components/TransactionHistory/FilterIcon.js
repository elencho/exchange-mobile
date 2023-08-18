import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { getParams } from '../../redux/transactions/selectors';
import Filter from '../../assets/images/Filter';
import { getParams as getParamsTrade } from '../../redux/trade/selectors';
import { setStatusModalInfo } from '../../redux/modals/actions';
export default function FilterIcon({ onPress, isInstantTrade }) {
  const paramsTransaction = useSelector(getParams);
  const paramsTrade = useSelector(getParamsTrade);
  const { type, currency, fromDateTime, toDateTime, methods, status } =
    paramsTransaction;
  const { actions, cryptoCode, fiatCodes, statuses } = paramsTrade;

  const filters = [
    type,
    methods,
    currency,
    fromDateTime,
    toDateTime,
    status,
  ].filter((f) => f);
  const filtersTrade = [
    actions,
    cryptoCode,
    fiatCodes,
    statuses,
    fromDateTime,
    toDateTime,
  ].filter((f) => f);

  const isFiltered = () => {
    if (isInstantTrade) {
      return filtersTrade.some((i) => i.length > 0 || i > 0);
    } else {
      return filters.length;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isFiltered() && { backgroundColor: colors.PRIMARY_PURPLE },
      ]}
    >
      <Filter style={styles.icon} />
      {isFiltered() ? (
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
