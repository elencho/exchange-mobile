import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomRefreshContol from '../components/CustomRefreshContol';
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
import FiatModal from '../components/InstantTrade/FiatModal';
import TradeBlockSkeleton from '../components/InstantTrade/TradeBlockSkeleton';

import colors from '../constants/colors';
import {
  fetchTrades,
  setTradeOffset,
  setTradeType,
} from '../redux/trade/actions';

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
    dispatch(setTradeOffset(0));
    dispatch(fetchTrades());
  };

  const [showRefreshControl, setShowRefreshControl] = useState(false);

  useEffect(() => {
    tabRoute === 'Trade' && onRefresh();
    const timer = setTimeout(() => {
      setShowRefreshControl(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [tabRoute]);

  return (
    <Background>
      <TopRow clear={() => dispatch(setTradeType('Buy'))} />

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
        refreshControl={
          showRefreshControl ? (
            <CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
          ) : null
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
