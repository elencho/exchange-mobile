import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const state = useSelector((state) => state);
  const {
    trade: { trades, hideOtherPairs },
    transactions: { tabRoute },
  } = state;

  const toggleShowHide = () => {
    dispatch(hideOtherPairsAction(!hideOtherPairs));
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  };

  const handleScrollEnd = (e) => {
    if (
      isCloseToBottom(e.nativeEvent) &&
      navigation.isFocused() &&
      tabRoute === 'Trade'
    ) {
      dispatch(reachScrollEnd('trades'));
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
    <View style={styles.container}>
      <TopRow
        text={hideOtherPairs ? 'Show ' : 'Hide '}
        onPress={toggleShowHide}
      />

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        // onScroll={handleScrollEnd}
        // onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={4}
        style={{ height: 280 }}
      >
        {trades?.map((trade) => (
          <Trade trade={trade} key={Math.random()} />
        ))}
      </ScrollView>
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
