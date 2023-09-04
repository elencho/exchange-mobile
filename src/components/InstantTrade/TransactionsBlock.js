import React, { useEffect, memo } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { t } from 'i18next';

import AppText from '../AppText';
import PurpleText from '../PurpleText';
import OneTransactionSkeleton from '../TransactionHistory/OneTransactionSkeleton';
import List from '../../assets/images/List.svg';

import colors from '../../constants/colors';
import CustomRefreshContol from '../CustomRefreshContol';

import {
  fetchTrades,
  hideOtherPairsAction,
  saveTrades,
  setTradeOffset,
} from '../../redux/trade/actions';
import { reachScrollEnd } from '../../redux/transactions/actions';
import { IS_IOS } from '../../constants/system';
import Transaction from '../TransactionHistory/Transaction';
import TransactionSkeleton from '../TransactionHistory/TransactionSkeleton';

export const TopRow = ({ text, onPress }) => {
  return (
    <View style={styles.topRow}>
      <AppText header style={styles.header}>
        Transactions
      </AppText>

      <View style={{ flex: 1 }}>
        <View style={styles.right}>
          <Purple text={t(text)} onPress={onPress} />
          <AppText subtext body style={styles.subText}>
            {' '}
            {t('Other Pairs')}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const Purple = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <PurpleText onPress={onPress} text={text} />
    </TouchableOpacity>
  );
};

const TransactionsBlock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(hideOtherPairsAction(false));
    };
  }, []);

  const state = useSelector((state) => state);
  const {
    trade: {
      trades,
      hideOtherPairs,
      totalTrades,
      moreTradesLoading,
      tradesLoading,
    },
    transactions: { code: currencyCode, currency, loading, activeTab },
  } = state;

  const handleScrollEnd = () => {
    if (trades.length === totalTrades) {
      return;
    } else if (trades.length <= totalTrades && !moreTradesLoading) {
      dispatch(reachScrollEnd('trades'));
    }
  };

  const onRefresh = () => {
    dispatch(setTradeOffset(0));
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  };

  useEffect(() => {
    return () => onRefresh();
  }, []);

  const renderTrade = ({ item, index }) => (
    <Transaction
      transactionData={item}
      isLast={!moreTradesLoading && index === transactionData.length - 1}
    />
  );

  const transactionData =
    currency === 'Show All Currency'
      ? trades
      : trades.filter(
          (t) =>
            t.quoteCurrency === currencyCode || t.baseCurrency === currencyCode
        );

  const footer = memo(() =>
    moreTradesLoading && !loading ? (
      <TransactionSkeleton
        length={[1]}
        isInstantTrade={activeTab === 'Instant trade'}
        isFooter
      />
    ) : (
      <View />
    )
  );

  const listEmptyContainer = () =>
    !loading && (
      <View style={styles.empty}>
        <List />
        <AppText subtext style={[styles.subText, { marginTop: 17 }]}>
          Instant trade no transactions
        </AppText>
      </View>
    );

  return (
    <View style={styles.container}>
      {tradesLoading && !moreTradesLoading ? (
        <View style={{ marginTop: IS_IOS ? -10 : 20 }}>
          <TransactionSkeleton
            length={[1, 2, 3, 4, 5]}
            isInstantTrade={activeTab === 'Instant trade'}
          />
        </View>
      ) : (
        <FlatList
          style={{ height: 280 }}
          data={transactionData}
          renderItem={renderTrade}
          keyExtractor={(item, idx) => item.creationTime + idx}
          onEndReached={handleScrollEnd}
          onEndReachedThreshold={1}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          ListFooterComponent={trades.length > 0 && footer}
          ListEmptyComponent={listEmptyContainer}
          maxToRenderPerBatch={30}
          refreshControl={
            <CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};
export default memo(TransactionsBlock);
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  empty: {
    marginTop: '35%',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    color: colors.PRIMARY_TEXT,
  },
  right: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  subText: {
    color: colors.SECONDARY_TEXT,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
