import React from 'react';
import { FlatList, Platform, StatusBar, StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import Constants from 'expo-constants';

import Currency from './Currency';
import CurrencySkeleton from './CurrencySkeleton';

const height = Platform.select({
  ios: Constants.statusBarHeight + 100,
  android: 85 + StatusBar.currentHeight,
});

export default function BalancesList({ balanceLoading, filteredBalances }) {
  const renderCurrency = ({ item }) =>
    !balanceLoading ? (
      <Currency
        key={item.currencyName}
        code={item.currencyCode}
        name={item.currencyName}
        available={item.available}
        total={item.total}
        valueBTC={item.valueBTC}
        valueUSD={item.valueUSD}
      />
    ) : (
      <CurrencySkeleton />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredBalances}
        renderItem={renderCurrency}
        ListFooterComponent={() => <View style={{ height: height }} />}
        keyExtractor={(item) => item.currencyCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    flex: 1,
    paddingTop: 18,
  },
});
