import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { fetchOffers } from '../../redux/trade/actions';
import { generateWirePdf } from '../../utils/walletUtils';
import AppText from '../AppText';
import Currency from './Currency';

export default function BalancesList() {
  const dispatch = useDispatch();
  const balances = useSelector((state) => state.trade.balance.balances);
  const [showZeroBalances, setShowZeroBalances] = useState(true);
  const [nonZeroBalances, setNonZeroBalances] = useState(null);

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  useEffect(() => {
    if (balances) {
      const nonZeroBalances = balances.filter((b) => b.total > 0);
      setNonZeroBalances(nonZeroBalances);
      // generateWirePdf();
    }
  }, [balances]);

  const toggleZeroBalances = () => {
    setShowZeroBalances(!showZeroBalances);
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={images.Search} />
        <TextInput
          placeholder="Search Coin"
          placeholderTextColor="rgba(105, 111, 142, 0.5)"
          style={styles.input}
          // value="https://test-core-matching.cryptx.loc/swagger-connector-1.0/swagger/mobile#/Account%20Methods/generateDepositAddress"
          //   onChangeText={filter}
        />
      </View>

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
          data={showZeroBalances ? balances : nonZeroBalances}
          renderItem={renderCurrency}
          keyExtractor={(item) => item.currencyCode}
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
  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: '100%',
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
    flex: 1,
    marginLeft: 10,
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
