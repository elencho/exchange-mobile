import React from 'react';
import { Pressable, StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { filterAction } from '../../redux/transactions/actions';

export default function FilterRow({ array = [''], multiselect = false }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

  const { typeFilter, method } = state;

  const handleFilter = (filter) => dispatch(filterAction(filter, multiselect));
  const filterConditional = (fil) => {
    if (!multiselect) {
      return typeFilter === fil || (fil === 'ALL' && !typeFilter);
    } else if (method?.length > 0) {
      return method?.includes(fil);
    } else {
      return dispatch(filterAction('All', true));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[
          styles.filterButton,
          filterConditional(item) && {
            backgroundColor: 'rgba(74, 109, 255, 0.18)',
          },
        ]}
        onPress={() => handleFilter(item)}
      >
        <AppText
          style={[
            styles.text,
            filterConditional(item) && { color: colors.SECONDARY_PURPLE },
          ]}
          medium={filterConditional(item)}
          body
        >
          {item}
        </AppText>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={array}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    height: 34,
    paddingHorizontal: 15,
    borderRadius: 40,
    backgroundColor: 'rgba(31, 31, 53, 0.9)',
    marginRight: 6,
    justifyContent: 'center',
  },

  text: {
    color: colors.SECONDARY_TEXT,
  },
});
