import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import AppInput from '../AppInput';
import AppText from '../AppText';
import CustomRefreshContol from '../CustomRefreshContol';
import Currency from './Currency';
import CurrencySkeleton from './CurrencySkeleton';

export default function BalancesList({ balanceLoading }) {
  const dispatch = useDispatch();
  const balances = useSelector((state) => state.trade.balance.balances);
  const tabRoute = useSelector((state) => state.transactions.tabRoute);
  const [showZeroBalances, setShowZeroBalances] = useState(true);
  const [nonZeroBalances, setNonZeroBalances] = useState([]);
  const [filteredBalances, setFilteredBalances] = useState([]);
  const [value, setValue] = useState('');
  const [showRefreshControl, setShowRefreshControl] = useState(false);

  const onRefresh = () => {
    setValue('');
    setShowZeroBalances(true);
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowZeroBalances(true);
        setValue('');
      };
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRefreshControl(true);
    }, 1000);
    tabRoute === 'Wallet' && onRefresh();
    return () => clearTimeout(timer);
  }, [tabRoute]);

  useEffect(() => {
    if (balances) {
      const nonZeroBalances = balances.filter((b) => b.total > 0);
      setNonZeroBalances(nonZeroBalances);
      setFilteredBalances(balances);
    }
  }, [balances]);

  useEffect(() => {
    if (balances) type(value);
  }, [showZeroBalances]);

  const toggleZeroBalances = () => setShowZeroBalances(!showZeroBalances);

  const type = (text) => {
    setValue(text);
    const array = showZeroBalances ? balances : nonZeroBalances;
    const filteredArray = array.filter((c) => {
      return (
        c.currencyCode.toLowerCase().includes(text.toLowerCase()) ||
        c.currencyName.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredBalances(filteredArray);
  };

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
      <AppInput
        placeholder="Search Coin"
        placeholderTextColor="rgba(105, 111, 142, 0.5)"
        onChangeText={type}
        left={<Image source={images.Search} style={styles.searchIcon} />}
        value={value}
      />

      <Pressable style={styles.hide} onPress={toggleZeroBalances}>
        <View style={styles.radio}>
          {!showZeroBalances && <View style={styles.selected} />}
        </View>
        <AppText body style={styles.secondary}>
          Hide Zero Balances
        </AppText>
      </Pressable>

      <FlatList
        data={filteredBalances}
        renderItem={renderCurrency}
        keyExtractor={(item) => item.currencyCode}
        refreshControl={
          showRefreshControl ? (
            <CustomRefreshContol
              refreshing={balanceLoading}
              onRefresh={onRefresh}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginVertical: 10,
    flex: 1,
  },
  hide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  radio: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.SECONDARY_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.75 }],
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 20,
  },
  selected: {
    backgroundColor: colors.SECONDARY_TEXT,
    borderRadius: 20,
    width: '75%',
    height: '75%',
  },
});
