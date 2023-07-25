import React from 'react';
import { Pressable, StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { filterAction } from '../../redux/transactions/actions';
import Pending from '../../assets/images/Status_Pending';
import Success from '../../assets/images/Status_Success';
import Failed from '../../assets/images/Status_Failed';

const statusIcons = {
  SUCCESS: <Success />,
  PENDING: <Pending />,
  FAILED: <Failed />,
};
export default function FilterRow({ array = [''], filterType }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

  const { typeFilter, method, status } = state;

  console.log('typeFilter', typeFilter);

  const handleFilter = (filter) => {
    dispatch(filterAction(filter, filterType));
  };
  const filterConditional = (fil) => {
    if (filterType === 'type') return fil === typeFilter;
    if (filterType === 'method') return fil === method;
    if (filterType === 'status') return fil === status;
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
        {filterType === 'status' && statusIcons[item]}
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  text: {
    color: colors.SECONDARY_TEXT,
  },
});
