import React, { useCallback, useEffect, useState } from 'react';
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
  const { transactions, loading, totalTransactions } = state;

  const [moreLoading, setMoreLoading] = useState(false);

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

  const renderDate = ({ item }) => (
    <TransactionDate
      date={item}
      transactions={transactions}
      loading={loading}
    />
  );

  const handleScrollEnd = () => {
    dispatch(reachScrollEnd('transactions'));
    if (transactions.length < totalTransactions) {
      setMoreLoading(true);
    } else {
      setMoreLoading(false);
    }
  };
  return (
    <Background>
      <TopRow />

      <Headline title="Transaction History" />

      <View style={styles.filter}>
        <FilterRow array={types} />
        <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
      </View>

      {loading ? (
        <TransactionSkeleton length={[0, 1, 2, 3, 4, 5, 6]} />
      ) : (
        <FlatList
          style={styles.transactions}
          data={uniqueDates}
          renderItem={renderDate}
          keyExtractor={({ index }) => index}
          onEndReached={handleScrollEnd}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1000}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          ListFooterComponent={() =>
            moreLoading ? <TransactionSkeleton length={[0, 1, 2]} /> : <View />
          }
        />
      )}

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
