import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { toggleBuySellModal } from '../../redux/modals/actions';
import { setCurrentTrade } from '../../redux/trade/actions';
import AppText from '../AppText';

export default function ReadyTrades() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.trade);
  const { tradeType, pairObject, fiat, crypto } = state;
  const buy = tradeType === 'Buy';

  const handleTrade = (t) => {
    const { price, size } = t;
    dispatch(toggleBuySellModal(true));
    if (price && size) {
      dispatch(setCurrentTrade({ price, size }));
    } else {
      dispatch(setCurrentTrade({ price: '', size: '' }));
    }
  };

  let arrayToIterate = [];
  let slicedArray = [];
  if (pairObject) {
    const buyArray = pairObject.offerEntriesMap?.BID;
    const sellArray = pairObject.offerEntriesMap?.ASK;
    arrayToIterate = buy ? buyArray : sellArray;
    slicedArray = arrayToIterate?.slice(0, 3);
  }

  const primary = (t) => {
    const price = buy ? t.price : t.size;
    const currency = buy ? fiat : crypto;
    return (
      <AppText style={styles.primary} header>
        {price} <AppText body>{currency}</AppText>
      </AppText>
    );
  };

  const secondary = (t) => {
    const size = buy ? t.size : t.price;
    const currency = buy ? crypto : fiat;
    return (
      <AppText body subtext style={styles.secondary}>
        {size} {currency}
      </AppText>
    );
  };

  return (
    <View style={styles.container}>
      {slicedArray?.map((item, index) => (
        <Pressable
          style={styles.block}
          key={index}
          onPress={() => handleTrade(item)}
        >
          {primary(item)}
          {secondary(item)}
        </Pressable>
      ))}
      <Pressable style={styles.block} onPress={handleTrade}>
        <AppText medium style={styles.primary}>
          Custom
        </AppText>
        <AppText body subtext style={styles.secondary}>
          Your Amount
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 80,
    width: '47%',
    marginBottom: '6%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 10,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
