import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';

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
import TabSwitcher from '../components/TransactionHistory/widgets/TabSwitcher';
import SearchAndFilter from '../components/TransactionHistory/widgets/SearchAndFilter';
import TransactionsBlock from '../components/InstantTrade/TransactionsBlock';
import Transaction from '../components/TransactionHistory/Transaction';

function TransactionHistory({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const {
    transactions: {
      transactions,
      loading,
      totalTransactions,
      code: currencyCode,
      currency,
      activeTab,
    },
    trade: { moreTradesLoading },
  } = state;

  useFocusEffect(
    useCallback(() => {
      dispatch(chooseCurrency(currency));
      dispatch(setAbbr(currencyCode));
      dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    }, [currency])
  );

  useEffect(() => {
    dispatch(chooseCurrency('Show All Currency'));
    dispatch(setAbbr(null));
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    if (!route?.params?.isFromTransactions) dispatch(clearFilters());
  }, [navigation]);

  const onRefresh = () => {
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  };

  const transactionsCurrencyFiltered =
    currency === 'Show All Currency'
      ? transactions
      : transactions.filter((t) => t.currency == currencyCode);

  console.log('transactionsCurrencyFiltered', currencyCode);

  const renderTransaction = ({ item }) => (
    <Transaction isTransfer transactionData={item} loading={loading} />
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
      <TabSwitcher />
      <SearchAndFilter navigation={navigation} />

      {/* This filter needs to be modified */}
      {/* Components used here need to be deleted */}
      {/* <View style={styles.filter}>
        <FilterRow array={types} />
        <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
      </View> */}

      {loading ? (
        <TransactionSkeleton length={[0, 1, 2, 3, 4, 5, 6]} />
      ) : activeTab === 'Transfer' ? (
        <FlatList
          style={styles.transactions}
          contentContainerStyle={{ flexGrow: 1 }}
          data={transactionsCurrencyFiltered}
          renderItem={renderTransaction}
          keyExtractor={(item, index) => item.transactionId + index}
          onEndReached={handleScrollEnd}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1000}
          ListEmptyComponent={listEmptyContainer}
          refreshControl={
            <CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
          }
          // ListFooterComponent={() =>
          //   moreTradesLoading && uniqueDates.length > 0 ? (
          //     <TransactionSkeleton length={[0, 1, 2]} />
          //   ) : (
          //     <View />
          //   )
          // }
        />
      ) : (
        <TransactionsBlock />
      )}

      {/* <TransactionsBlock loading={tradesLoading || userProfileLoading} /> */}

      {isFocused && <TransactionModal transactions />}
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
    paddingHorizontal: 5,
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
