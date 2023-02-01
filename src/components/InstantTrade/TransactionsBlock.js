import React, { useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';
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
import List from '../../assets/images/List.svg';
import { Trans, useTranslation } from 'react-i18next';

const IS_IOS = Platform.OS === 'ios';

export const TopRow = ({ text, onPress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.topRow}>
      <AppText header style={styles.header}>
        Transactions
      </AppText>

      <View style={styles.right}>
        <AppText subtext body style={styles.subText}>
          <Trans
            i18nKey="togglePairs"
            components={{
              purple: <PurpleText onPress={onPress} text={t(text)} />,
            }}
          />
        </AppText>
      </View>
    </View>
  );
};

const TransactionsBlock = ({
  loading,
  innerScrollEnabled,
  handleInnerScroll,
}) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const {
    trade: { trades, hideOtherPairs, totalTrades, moreTradesLoading },
  } = state;

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
  const footer = () =>
    moreTradesLoading && !loading ? <OneTransactionSkeleton /> : <View />;

  const tradesToShow = () => {
    if (trades.length) {
      return (
        <FlatList
          style={{ height: 280 }}
          data={trades}
          renderItem={renderTrade}
          keyExtractor={(item) => item.creationTime}
          onEndReached={handleScrollEnd}
          onEndReachedThreshold={1}
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
      );
    } else {
      return (
        !loading && (
          <View style={styles.empty}>
            <List />
            <AppText subtext style={[styles.subText, { marginTop: 17 }]}>
              Instant trade no transactions
            </AppText>
          </View>
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <TopRow
        text={hideOtherPairs ? 'Show ' : 'Hide '}
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
        tradesToShow()
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
  empty: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: colors.PRIMARY_TEXT,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
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
