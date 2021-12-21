import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import { fetchTrades, hideOtherPairsAction } from '../../redux/trade/actions';
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

  const state = useSelector((state) => state.trade);
  const { trades, hideOtherPairs } = state;

  useEffect(() => {
    dispatch(fetchTrades());
  }, [hideOtherPairs]);

  const toggleShowHide = () => {
    dispatch(hideOtherPairsAction(!hideOtherPairs));
  };

  return (
    <View style={styles.container}>
      <TopRow
        text={hideOtherPairs ? 'Show ' : 'Hide '}
        onPress={toggleShowHide}
      />

      <ScrollView style={{ height: 280 }}>
        {trades.map((trade) => (
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
