import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Background from '../components/Background';
import FilterIcon from '../components/TransactionHistory/FilterIcon';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';
import AppText from '../components/AppText';
import TopRow from '../components/TransactionHistory/TopRow';
import TransactionDate from '../components/TransactionHistory/TransactionDate';
import TransactionModal from '../components/TransactionHistory/TransactionModal';
import TransactionSkeleton from '../components/TransactionHistory/TransactionSkeleton';
import List from '../assets/images/List.svg';

import { types } from '../constants/filters';
import { monthsShort } from '../constants/months';
import {
  chooseCurrency,
  clearFilters,
  reachScrollEnd,
  setAbbr,
} from '../redux/transactions/actions';
import colors from '../constants/colors';
import CustomRefreshContol from '../components/CustomRefreshContol';

function TransactionHistory() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    transactions: { transactions, loading, totalTransactions },
    trade: { moreTradesLoading },
  } = state;

  useEffect(() => {
    dispatch(chooseCurrency('Show All Currency'));
    dispatch(setAbbr(null));
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    return () => dispatch(clearFilters());
  }, []);

  const onRefresh = () => {
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
  const listEmptyContainer = (
    <View style={styles.empty}>
      <List />
      <AppText subtext style={styles.subtext}>
        Transaction history no transactions
      </AppText>
    </View>
  );

  const handleScrollEnd = () => {
    if (transactions.length === totalTransactions) {
      return;
    } else if (transactions.length <= totalTransactions && !moreTradesLoading) {
      dispatch(reachScrollEnd('transactions'));
    }
  };
  return (
    <Background>
      <TopRow clear={() => dispatch(clearFilters())} />

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
          contentContainerStyle={{ flexGrow: 1 }}
          data={uniqueDates}
          renderItem={renderDate}
          keyExtractor={(item) => item}
          onEndReached={handleScrollEnd}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1000}
          ListEmptyComponent={listEmptyContainer}
          refreshControl={
            <CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
          }
          ListFooterComponent={() =>
            moreTradesLoading && uniqueDates.length > 0 ? (
              <TransactionSkeleton length={[0, 1, 2]} />
            ) : (
              <View />
            )
          }
        />
      )}

      <TransactionModal transactions />
    </Background>
  );
}

export default TransactionHistory;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginTop: 17,
  },
});
