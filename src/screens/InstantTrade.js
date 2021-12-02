import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Background from '../components/Background';
import BuySellSwitch from '../components/InstantTrade/BuySellSwitch';
import QuestionMark from '../components/InstantTrade/QuestionMark';
import TradeBlock from '../components/InstantTrade/TradeBlock';
import TransactionsBlock from '../components/InstantTrade/TransactionsBlock';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';
import BuySellModal from '../components/InstantTrade/BuySellModal';

export default function InstantTrade() {
  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="Instant Trade" />
        <QuestionMark />
      </View>

      <BuySellSwitch />

      <ScrollView>
        <TradeBlock />
        <TransactionsBlock />
      </ScrollView>

      <BuySellModal />
    </Background>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
