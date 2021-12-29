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
    const buyArray = pairObject.offerEntriesMap.BID;
    const sellArray = pairObject.offerEntriesMap.ASK;
    arrayToIterate = tradeType === 'Buy' ? buyArray : sellArray;
    slicedArray = arrayToIterate.slice(0, 3);
  }

  return (
    <View style={styles.container}>
      {slicedArray.map((t) => (
        <Pressable
          style={styles.block}
          key={Math.random()}
          onPress={() => handleTrade(t)}
        >
          <AppText style={styles.primary} header>
            {Math.trunc(t.price)} <AppText body>{fiat}</AppText>
          </AppText>
          <AppText body subtext style={styles.secondary}>
            {t.size} {crypto}
          </AppText>
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
    borderWidth: 0.5,
    borderColor: 'rgba(101, 130, 253, 0.3)',
    height: 80,
    width: '47%',
    marginBottom: '6%',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
