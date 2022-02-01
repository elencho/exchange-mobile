import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Background from '../components/Background';
import TopRow from '../components/TransactionHistory/TopRow';
import Headline from '../components/TransactionHistory/Headline';
import FilterRow from '../components/TransactionHistory/FilterRow';
import AppText from '../components/AppText';
import colors from '../constants/colors';
import CurrencySwitch from '../components/Wallet/CurrencySwitch';

export default function Wallet() {
  const [filter, setFilter] = useState('USD');

  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="My Wallet" />
        <CurrencySwitch filter={filter} setFilter={setFilter} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
