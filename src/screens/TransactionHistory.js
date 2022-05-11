import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

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
  fetchTransactions,
  reachScrollEnd,
} from '../redux/transactions/actions';

function TransactionHistory() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const { transactions, loading, tabRouteName } = state;

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const dates = transactions.map((tr) => {
    const date = new Date(tr.timestamp);
    return `${date.getDate()} ${
      monthsShort[date.getMonth()]
    }, ${date.getFullYear()}`;
  });

  const uniqueDates = [...new Set(dates)];

  const renderDate = ({ item }) => {
    return (
      <TransactionDate date={item} key={item} transactions={transactions} />
    );
  };

  const handleScrollEnd = (e) => {
    if (
      isCloseToBottom(e.nativeEvent) &&
      navigation.isFocused() &&
      tabRouteName
    ) {
      dispatch(reachScrollEnd());
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  return (
    <Background>
      {/* Top Row */}
      <TopRow />

      <Headline title="Transaction History" />

      {/* Filter Row */}
      {loading ? (
        <ActivityIndicator size="large" color="white" style={styles.loader} />
      ) : (
        <>
          <View style={styles.filter}>
            <FilterRow array={types} />
            <FilterIcon
              onPress={() => navigation.navigate('TransactionFilter')}
            />
          </View>
          {/* Transaction Scrollview */}
          <FlatList
            style={styles.transactions}
            data={uniqueDates}
            renderItem={renderDate}
            keyExtractor={(item) => item}
            onScroll={handleScrollEnd}
            scrollEventThrottle={1000}
          />
        </>
      )}

      {/* Transaction Modal */}
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
