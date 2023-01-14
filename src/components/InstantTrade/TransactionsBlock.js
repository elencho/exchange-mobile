import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import {
  fetchTrades,
  hideOtherPairsAction,
  saveTrades,
  setTradeOffset,
} from '../../redux/trade/actions';
import { reachScrollEnd } from '../../redux/transactions/actions';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import OneTransactionSkeleton from '../TransactionHistory/OneTransactionSkeleton';
import Trade from './Trade';

export const TopRow = ({ text, onPress }) => (
  <View style={styles.topRow}>
    <AppText header style={styles.header}>
      Transactions
    </AppText>
    <AppText subtext body style={styles.subText}>
      <PurpleText text={text} onPress={onPress} />
      other pairs
    </AppText>
  </View>
);
const TransactionsBlock = ({
  loading,
  innerScrollEnabled,
  handleInnerScroll,
}) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const {
    trade: { trades, hideOtherPairs, totalTrades },
  } = state;

  const [moreLoading, setMoreLoading] = useState(false);

  useEffect(() => {
    return () => dispatch(saveTrades([]));
  }, []);

  const toggleShowHide = () => {
    dispatch(setTradeOffset(0));
    dispatch(hideOtherPairsAction(!hideOtherPairs));
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  };

  const handleScrollEnd = () => {
    dispatch(reachScrollEnd('trades'));
    if (trades.length < totalTrades) {
      setMoreLoading(true);
    } else {
      setMoreLoading(false);
    }
  };

  const onRefresh = () => dispatch(fetchTrades());
  const renderTrade = ({ item }) => (
    <Trade trade={item} key={item.creationTime} />
  );

  const footer = () => (moreLoading ? <OneTransactionSkeleton /> : <View />);

  return (
    <View style={styles.container}>
      <TopRow
        text={hideOtherPairs ? 'Show ' : 'Hide '}
        onPress={toggleShowHide}
      />

      {loading && !moreLoading ? (
        [1, 2, 3].map((i) => (
          <View key={i}>
            <OneTransactionSkeleton />
          </View>
        ))
      ) : (
        <FlatList
          style={{ height: 280 }}
          data={trades}
          renderItem={renderTrade}
          keyExtractor={(item) => item.creationTime}
          onEndReached={handleScrollEnd}
          //onEndReachedThreshold={0.7}
          nestedScrollEnabled
          initialNumToRender={5}
          ListFooterComponent={footer}
          scrollEnabled={innerScrollEnabled}
          onScroll={handleInnerScroll}
          refreshControl={
            <RefreshControl
              tintColor={colors.PRIMARY_PURPLE}
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
};
export default TransactionsBlock;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
  },
  header: {
    color: colors.PRIMARY_TEXT,
  },
  subText: {
    color: colors.SECONDARY_TEXT,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
