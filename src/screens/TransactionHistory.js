import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Background from '../components/Background';
import FilterIcon from '../components/TransactionHistory/FilterIcon';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';
import TransactionDate from '../components/TransactionHistory/TransactionDate';
import TransactionModal from '../components/TransactionHistory/TransactionModal';

import { types } from '../constants/filters';
import { monthsShort } from '../constants/months';
import {
  chooseCurrency,
  clearFilters,
  reachScrollEnd,
  setAbbr,
} from '../redux/transactions/actions';
import TransactionSkeleton from '../components/TransactionHistory/TransactionSkeleton';

function TransactionHistory() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const { transactions, loading, tabRoute } = state;

  useFocusEffect(
    useCallback(() => {
      return () => onRefresh();
    }, [])
  );

  useEffect(() => {
    dispatch(chooseCurrency('Show All Currency'));
    dispatch(setAbbr(null));
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  }, []);

  const onRefresh = () => {
    dispatch(clearFilters());
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  };

  const dates = transactions?.map((tr) => {
    const date = new Date(tr.timestamp);
    return `${date.getDate()} ${
      monthsShort[date.getMonth()]
    }, ${date.getFullYear()}`;
  });

  const uniqueDates = [...new Set(dates)];

  const renderDate = ({ item }) => {
    return loading ? (
      <TransactionSkeleton />
    ) : (
      <TransactionDate
        date={item}
        key={item}
        transactions={transactions}
        loading={loading}
      />
    );
  };

  const handleScrollEnd = (e) => {
    if (
      isCloseToBottom(e.nativeEvent) &&
      navigation.isFocused() &&
      tabRoute === 'Transactions'
    ) {
      dispatch(reachScrollEnd('transactions'));
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return (
      Math.floor(layoutMeasurement.height + contentOffset.y) >=
      Math.floor(contentSize.height)
    );
  };

  return (
    <Background>
      <TopRow />

      <Headline title="Transaction History" />

      <View style={styles.filter}>
        <FilterRow array={types} />
        <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
      </View>
      <FlatList
        style={styles.transactions}
        data={uniqueDates}
        renderItem={renderDate}
        keyExtractor={(item) => item}
        onScroll={handleScrollEnd}
        scrollEventThrottle={1000}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />

      <TransactionModal transactions />
    </Background>
  );
}

export default TransactionHistory;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },
  transactions: {
    flex: 1,
    marginTop: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
