import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '../../components/Background';
import TopRow from '../../components/TransactionHistory/TopRow';
import Headline from '../../components/TransactionHistory/Headline';
import CurrencySwitch from '../../components/Wallet/CurrencySwitch';
import TotalBalance from '../../components/Wallet/TotalBalance';
import BalancesList from '../../components/Wallet/BalancesList';
import { chooseCurrency, setAbbr } from '../../redux/transactions/actions';

export default function Wallet() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(chooseCurrency('Show All Currency'));
      dispatch(setAbbr(null));
    };
  }, []);

  return (
    <Background>
      <TopRow />

      <View style={styles.headRow}>
        <Headline title="My Wallet" />
        <CurrencySwitch />
      </View>

      <TotalBalance />

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
