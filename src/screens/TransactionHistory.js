import React, { useCallback, useEffect } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';

import Background from '../components/Background';
import AppText from '../components/AppText';
import TopRow from '../components/TransactionHistory/TopRow';
import TransactionModal from '../components/TransactionHistory/TransactionModal';
import TransactionSkeleton from '../components/TransactionHistory/TransactionSkeleton';
import List from '../assets/images/List.svg';

import {
  chooseCurrency,
  clearFilters,
  reachScrollEnd,
  setAbbr,
  setActiveTab,
} from '../redux/transactions/actions';
import colors from '../constants/colors';
import CustomRefreshContol from '../components/CustomRefreshContol';
import TabSwitcher from '../components/TransactionHistory/widgets/TabSwitcher';
import SearchAndFilter from '../components/TransactionHistory/widgets/SearchAndFilter';
import TransactionsBlock from '../components/InstantTrade/TransactionsBlock';
import Transaction from '../components/TransactionHistory/Transaction';
import { clearFiltersTrade, saveTrades } from '../redux/trade/actions';

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

  const clearAllFilters = () => {
    dispatch(clearFiltersTrade());
    dispatch(clearFilters());
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    dispatch(setActiveTab('Transfer'));
    Keyboard.dismiss();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(chooseCurrency(currency));
      clearAllFilters();
    }, [currency])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(chooseCurrency('Show All Currency'));
      // dispatch(setAbbr(null));
      dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
      Keyboard.dismiss();
    }, [navigation])
  );

  useEffect(() => {
    if (!route?.params?.isFromTransactions) clearAllFilters();
  }, [navigation]);

  useEffect(() => {
    return () => {
      clearAllFilters();
    };
  }, []);

  const onRefresh = () => {
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  };

  const transactionsCurrencyFiltered =
    currency === 'Show All Currency'
      ? transactions
      : transactions.filter((t) => t.currency == currencyCode);

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
    // if (transactions.length === totalTransactions) {
    //   return;
    // } else if (transactions.length <= totalTransactions && !moreTradesLoading) {
    //   dispatch(reachScrollEnd('transactions'));
    // }
  };

  return (
    <Background>
      <TopRow clear={clearAllFilters} />
      <TabSwitcher />
      <SearchAndFilter
        navigation={navigation}
        isInstantTrade={activeTab === 'Instant trade'}
      />

      {loading ? (
        <View style={{ marginTop: 30 }}>
          <TransactionSkeleton length={[0, 1, 2, 3, 4, 5, 6]} />
        </View>
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
          keyboardShouldPersistTaps="never"
          refreshControl={
            <CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
          }
        />
      ) : (
        <TransactionsBlock />
      )}

      {isFocused && <TransactionModal transactions />}
    </Background>
  );
}

export default TransactionHistory;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    marginTop: '25%',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
  },
  transactions: {
    flex: 1,
    marginTop: 30,
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
