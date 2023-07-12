import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import Background from '../../components/Background';
import TopRow from '../../components/TransactionHistory/TopRow';
import CurrencySwitch from '../../components/Wallet/CurrencySwitch';
import TotalBalance from '../../components/Wallet/TotalBalance';
import BalancesList from '../../components/Wallet/BalancesList';
import colors from '../../constants/colors';

export default function Wallet() {
  const balanceLoading = useSelector((state) => state.trade.balanceLoading);

  return (
    <>
      <View style={styles.topRowStyle}>
        <TopRow />
        <TotalBalance balanceLoading={balanceLoading} />
      </View>
      <Background>
        <BalancesList balanceLoading={balanceLoading} />
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  topRowStyle: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
});
