import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Background from '../components/Background';
import BuySellSwitch from '../components/InstantTrade/BuySellSwitch';
import QuestionMark from '../components/InstantTrade/QuestionMark';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';

export default function InstantTrade() {
  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="Instant Trade" />
        <QuestionMark />
      </View>

      <BuySellSwitch />
    </Background>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
