import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { filterAction } from '../../redux/transactions/actions';

export default function FilterRow({ array = [''], multiselect = false }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

  const { typeFilter, method } = state;

  const handleFilter = (filter) => {
    dispatch(filterAction(filter, multiselect));
  };

  const filterConditional = (fil) => {
    if (!multiselect) {
      return typeFilter === fil || (fil === 'ALL' && !typeFilter);
    } else {
      return method.includes(fil);
    }
  };

  return (
    <View style={styles.filterRow}>
      {array.map((fil) => (
        <Pressable
          key={fil}
          style={[
            styles.filterButton,
            filterConditional(fil) && {
              backgroundColor: 'rgba(74, 109, 255, 0.18)',
            },
          ]}
          onPress={() => handleFilter(fil)}
        >
          <AppText
            style={[
              styles.text,
              filterConditional(fil) && { color: colors.SECONDARY_PURPLE },
            ]}
          >
            {fil}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
    backgroundColor: 'rgba(31, 31, 53, 0.9)',
    marginRight: 5,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.SECONDARY_TEXT,
    textTransform: 'capitalize',
  },
});
