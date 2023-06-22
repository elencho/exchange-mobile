import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { getParams } from '../../redux/transactions/selectors';
import Filter from '../../assets/images/Filter';
export default function FilterIcon({ onPress }) {
  const params = useSelector(getParams);
  const { type, currency, fromDateTime, toDateTime, methods } = params;

  const filters = [type, methods, currency, fromDateTime, toDateTime].filter(
    (f) => f
  );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Filter style={styles.icon} />
      {filters.length ? (
        <View style={styles.dotOutline}>
          <View style={styles.dot} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    minWidth: 35,
    borderRadius: 30,
    backgroundColor: colors.SECONDARY_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 13,
    height: 13,
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
    top: -1,
    right: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
