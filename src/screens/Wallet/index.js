import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import TopRow from '../../components/TransactionHistory/TopRow';
import CurrencySwitch from '../../components/Wallet/CurrencySwitch';
import TotalBalance from '../../components/Wallet/TotalBalance';
import BalancesList from '../../components/Wallet/BalancesList';
import colors from '../../constants/colors';
import CustomRefreshContol from '../../components/CustomRefreshContol';
import { useFocusEffect } from '@react-navigation/native';
import Headline from '../../components/TransactionHistory/Headline';

export default function Wallet() {
  const dispatch = useDispatch();
  const balanceLoading = useSelector((state) => state.trade.balanceLoading);
  const [showRefreshControl, setShowRefreshControl] = useState(false);
  const [value, setValue] = useState('');
  const [showZeroBalances, setShowZeroBalances] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        setShowRefreshControl(true);
      }, 1000);
      return () => {
        onRefresh();
        clearTimeout(timer);
      };
    }, [])
  );

  const onRefresh = () => {
    setValue('');
    setShowZeroBalances(true);
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
  };
  return (
    <Background>
      <TopRow />
      <View style={styles.headRow}>
        <Headline title="My Wallet" />
        <CurrencySwitch />
      </View>
      <ScrollView
        refreshControl={
          showRefreshControl ? (
            <CustomRefreshContol
              refreshing={balanceLoading}
              onRefresh={onRefresh}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      >
        <TotalBalance balanceLoading={balanceLoading} />
        <BalancesList
          setShowZeroBalances={setShowZeroBalances}
          setValue={setValue}
          value={value}
          showZeroBalances={showZeroBalances}
          balanceLoading={balanceLoading}
        />
      </ScrollView>
    </Background>
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
