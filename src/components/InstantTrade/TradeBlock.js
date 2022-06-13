import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { fetchOffers } from '../../redux/trade/actions';
import AppText from '../AppText';
import CurrencyDropdowns from './CurrencyDropdowns';
import ReadyTrades from './ReadyTrades';
import Timer from './Timer';

export default function TradeBlock() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  const state = useSelector((state) => state.trade);
  const { fiat, crypto, tradeType, pairObject } = state;

  const price = () => {
    let price;
    const { buyPrice, sellPrice, pair } = pairObject;
    if (pair) {
      if (pair.baseCurrency === crypto) {
        price = tradeType === 'Buy' ? buyPrice : sellPrice;
      }
      return price;
    }
  };

  return (
    <View style={styles.container}>
      <CurrencyDropdowns />

      <AppText subtext body style={styles.price}>
        1 {crypto} = {pairObject && price()} {fiat}
      </AppText>

      <ReadyTrades />

      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
    // marginTop: 20,
    marginBottom: 10,
  },
  price: {
    color: colors.SECONDARY_TEXT,
    marginVertical: 10,
  },
});
