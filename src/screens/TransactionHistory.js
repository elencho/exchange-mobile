import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Background from '../components/Background';
import FilterIcon from '../components/TransactionHistory/FilterIcon';
import Download from '../components/TransactionHistory/DownloadTransactions';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';
import TransactionDate from '../components/TransactionHistory/TransactionDate';

import { types } from '../constants/filters';

export default function TransactionHistory({ navigation }) {
  return (
    <Background>
      {/* Top Row */}
      <TopRow />

      <Headline title="Transaction History" />

      {/* Filter Row */}
      <View style={styles.filter}>
        <FilterRow array={types} />
        <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
      </View>

      {/* Transaction Scrollview */}
      <ScrollView style={styles.transactions}>
        <TransactionDate />
        <TransactionDate />
        <TransactionDate />
      </ScrollView>

      {/* DOWNLOAD */}
      <Download />
    </Background>
  );
}

const styles = StyleSheet.create({
  transactions: {
    flex: 1,
    marginVertical: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
