import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import Background from '../../components/Background';
import TopRow from '../../components/TransactionHistory/TopRow';
import Headline from '../../components/TransactionHistory/Headline';
import CurrencySwitch from '../../components/Wallet/CurrencySwitch';
import TotalBalance from '../../components/Wallet/TotalBalance';
import BalancesList from '../../components/Wallet/BalancesList';

export default function Wallet() {
  const loading = useSelector((state) => state.transactions.loading);

  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="My Wallet" />
        <CurrencySwitch />
      </View>

      <TotalBalance loading={loading} />

      <BalancesList loading={loading} />
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
