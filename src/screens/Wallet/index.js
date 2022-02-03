import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Background from '../../components/Background';
import TopRow from '../../components/TransactionHistory/TopRow';
import Headline from '../../components/TransactionHistory/Headline';
import CurrencySwitch from '../../components/Wallet/CurrencySwitch';
import TotalBalance from '../../components/Wallet/TotalBalance';
import BalancesList from '../../components/Wallet/BalancesList';

export default function Wallet() {
  const [filter, setFilter] = useState('USD');

  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="My Wallet" />
        <CurrencySwitch filter={filter} setFilter={setFilter} />
      </View>

      <TotalBalance filter={filter} />

      <BalancesList />
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
