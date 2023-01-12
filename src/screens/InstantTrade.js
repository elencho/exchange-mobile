import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../components/Background';
import BuySellSwitch from '../components/InstantTrade/BuySellSwitch';
import InfoMark from '../components/InstantTrade/InfoMark';
import TradeBlock from '../components/InstantTrade/TradeBlock';
import TransactionsBlock from '../components/InstantTrade/TransactionsBlock';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';
import BuySellModal from '../components/InstantTrade/BuySellModal';
import InfoModal from '../components/InstantTrade/InfoModal';
import TransactionModal from '../components/TransactionHistory/TransactionModal';
import CryptoModal from '../components/InstantTrade/CryptoModal';
import colors from '../constants/colors';
import FiatModal from '../components/InstantTrade/FiatModal';
import TradeBlockSkeleton from '../components/InstantTrade/TradeBlockSkeleton';
import { fetchTrades } from '../redux/trade/actions';

export default function InstantTrade() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    trade: { tradesLoading, offersLoading },
    transactions: { tabRoute },
  } = state;

  const loading = tradesLoading && offersLoading;
  const onRefresh = () => {
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
    dispatch(fetchTrades());
  };

  const [innerScrollEnabled, setInnerScrollEnabled] = useState(false);

  useEffect(() => {
    tabRoute === 'Trade' && onRefresh();
  }, [tabRoute]);

  const handleOuterScroll = (event) => {
    // disable inner scroll when outer scroll is at top
    if (event.nativeEvent.contentOffset.y === 0) {
      setInnerScrollEnabled(false);
    }
  };

  const handleInnerScroll = (event) => {
    // enable inner scroll when outer scroll is not at top
    if (event.nativeEvent.contentOffset.y !== 0) {
      setInnerScrollEnabled(true);
    }
  };

  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="Instant Trade" />
        <View style={{ marginRight: 5 }} />
        <InfoMark inner="?" color={colors.SECONDARY_PURPLE} />
      </View>

      <BuySellSwitch />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ overflow: 'hidden' }}
        contentContainerStyle={{ overflow: 'hidden' }}
        onScroll={(e) => handleOuterScroll(e)}
        refreshControl={
          <RefreshControl
            tintColor={colors.PRIMARY_PURPLE}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        {offersLoading ? <TradeBlockSkeleton /> : <TradeBlock />}
        <TransactionsBlock
          loading={tradesLoading}
          onScroll={handleInnerScroll}
          scrollEnabled={innerScrollEnabled}
        />
      </ScrollView>

      <InfoModal />
      <BuySellModal />
      <CryptoModal />
      <FiatModal />
      <TransactionModal trades />
    </Background>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
