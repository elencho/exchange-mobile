import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { fetchOffers } from '../../redux/trade/actions';
import { fetchCurrencies } from '../../redux/transactions/actions';
import AppInput from '../AppInput';
import AppText from '../AppText';
import Currency from './Currency';

export default function BalancesList() {
  const dispatch = useDispatch();
  const balances = useSelector((state) => state.trade.balance.balances);
  const loading = useSelector((state) => state.transactions.loading);
  const [showZeroBalances, setShowZeroBalances] = useState(true);
  const [nonZeroBalances, setNonZeroBalances] = useState([]);
  const [filteredBalances, setFilteredBalances] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchCurrencies());
  }, []);

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

  const renderCurrency = ({ item }) => (
    <Currency
      key={item.currencyName}
      code={item.currencyCode}
      name={item.currencyName}
      available={item.available}
      total={item.total}
      valueBTC={item.valueBTC}
      valueUSD={item.valueUSD}
    />
  );

  const onRefresh = () => dispatch({ type: 'BALANCE_SAGA' });

  return (
    <View style={styles.container}>
      <AppInput
        placeholder="Search Coin"
        placeholderTextColor="rgba(105, 111, 142, 0.5)"
        onChangeText={type}
        left={<Image source={images.Search} style={styles.searchIcon} />}
      />

      <Pressable style={styles.hide} onPress={toggleZeroBalances}>
        <View style={styles.radio}>
          {!showZeroBalances && <View style={styles.selected} />}
        </View>
        <AppText body style={styles.secondary}>
          Hide Zero Balances
        </AppText>
      </Pressable>

      {balances && (
        <FlatList
          data={filteredBalances}
          renderItem={renderCurrency}
          keyExtractor={(item) => item.currencyCode}
          refreshControl={
            <RefreshControl
              tintColor={colors.PRIMARY_PURPLE}
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
        />
      )}
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
