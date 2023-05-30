import React, { useEffect, memo } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { t } from 'i18next';

import AppText from '../AppText';
import PurpleText from '../PurpleText';
import OneTransactionSkeleton from '../TransactionHistory/OneTransactionSkeleton';
import Trade from './Trade';
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

const TransactionsBlock = ({ loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(hideOtherPairsAction(false));
    };
  }, []);

  const state = useSelector((state) => state);
  const {
    trade: { trades, hideOtherPairs, totalTrades, moreTradesLoading },
  } = state;

  const toggleShowHide = () => {
    dispatch(setTradeOffset(0));
    dispatch(hideOtherPairsAction(!hideOtherPairs));
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  };

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

  const renderTrade = ({ item }) => (
    <Trade trade={item} key={item.creationTime} />
  );
  const footer = memo(() =>
    moreTradesLoading && !loading ? <OneTransactionSkeleton /> : <View />
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
      <TopRow
        text={hideOtherPairs ? 'Show' : 'Hide'}
        onPress={toggleShowHide}
      />

      {loading && !moreTradesLoading ? (
        <View style={{ marginTop: IS_IOS ? 0 : 20 }}>
          {[1, 2, 3].map((i) => (
            <View key={i}>
              <OneTransactionSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          style={{ height: 280 }}
          data={trades}
          renderItem={renderTrade}
          keyExtractor={(item) => item.creationTime}
          onEndReached={handleScrollEnd}
          onEndReachedThreshold={1}
          nestedScrollEnabled
          initialNumToRender={5}
          ListFooterComponent={trades.length > 0 && footer}
          ListEmptyComponent={listEmptyContainer}
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
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
  },
  empty: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
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
