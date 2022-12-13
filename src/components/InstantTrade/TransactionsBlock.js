import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import {
  fetchTrades,
  hideOtherPairsAction,
  saveTrades,
} from '../../redux/trade/actions';
import { reachScrollEnd } from '../../redux/transactions/actions';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import Trade from './Trade';

const TopRow = ({ text, onPress }) => (
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

export default function TransactionsBlock() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const {
    trade: { trades, hideOtherPairs },
  } = state;

  const toggleShowHide = () => {
    dispatch(hideOtherPairsAction(!hideOtherPairs));
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  };

  useEffect(() => {
    return () => dispatch(saveTrades([]));
  }, []);

  const handleScrollEnd = () => dispatch(reachScrollEnd('trades'));

  const renderTrade = ({ item }) => {
    return <Trade trade={item} key={item.creationTime} />;
  };

  return (
    <View style={styles.container}>
      <TopRow
        text={hideOtherPairs ? 'Show ' : 'Hide '}
        onPress={toggleShowHide}
      />

      <FlatList
        style={{ height: 280 }}
        data={trades}
        renderItem={renderTrade}
        keyExtractor={(item) => item.creationTime}
        onEndReached={handleScrollEnd}
        nestedScrollEnabled
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        // }
      />
    </View>
  );
}

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
