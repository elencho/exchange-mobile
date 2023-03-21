import React from 'react';
import { StyleSheet, Image, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleCryptoModal, toggleFiatModal } from '../../redux/modals/actions';
import { COINS_URL_PNG } from '../../constants/api';
import Arrow from '../../assets/images/Arrow';

export default function CurrencyDropdowns({ style }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.trade);
  const { crypto, fiat } = state;

  const open = (currency) => {
    if (currency === crypto) dispatch(toggleCryptoModal(true));
    if (currency === fiat) dispatch(toggleFiatModal(true));
  };

  return (
    <View style={[styles.container, style]}>
      {[crypto, fiat].map((c) => (
        <Pressable style={styles.block} key={c} onPress={() => open(c)}>
          <Image
            style={styles.icon}
            source={{ uri: `${COINS_URL_PNG}/${c.toLowerCase()}.png` }}
          />
          <AppText style={styles.text}>{c}</AppText>
          <Arrow />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderColor: '#525A86',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: '47%',
    height: 45,
    paddingHorizontal: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 10,
    flex: 1,
  },
});
