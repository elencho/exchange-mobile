import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
        <AppText style={styles.text}>{filters.length}</AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    minWidth: 35,
    borderRadius: 30,
    backgroundColor: '#6582FD',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 13,
    height: 13,
  },
  text: {
    fontSize: 15,
    color: colors.PRIMARY_TEXT,

    marginRight: 8,
  },
});
