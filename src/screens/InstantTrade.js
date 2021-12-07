import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
import colors from '../constants/colors';

export default function InstantTrade() {
  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="Instant Trade" />
        <View style={{ marginRight: 5 }} />
        <InfoMark inner="?" color={colors.SECONDARY_PURPLE} />
      </View>

      <BuySellSwitch />

      <ScrollView>
        <TradeBlock />
        <TransactionsBlock />
      </ScrollView>

      <InfoModal />
      <BuySellModal />
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
