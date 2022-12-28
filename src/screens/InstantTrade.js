import React, { useEffect } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
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
import TransactionsSkeleton from './TransactionsSkeleton';

export default function InstantTrade() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    trade: { tradesLoading, offersLoading },
    transactions: { tabRoute },
  } = state;

  const loading = tradesLoading && offersLoading;
  const onRefresh = () => dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });

  useEffect(() => {
    tabRoute === 'Trade' && onRefresh();
  }, [tabRoute]);

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
        refreshControl={
          <RefreshControl
            tintColor={colors.PRIMARY_PURPLE}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        {offersLoading ? <TradeBlockSkeleton /> : <TradeBlock />}
        <TransactionsBlock loading={tradesLoading} />
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
