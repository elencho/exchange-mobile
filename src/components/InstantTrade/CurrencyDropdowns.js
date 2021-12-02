import React from 'react';
import { StyleSheet, Image, View, Pressable } from 'react-native';

import AppText from '../AppText';
import images from '../../constants/images';
import colors from '../../constants/colors';

export default function CurrencyDropdowns({ style }) {
  return (
    <View style={[styles.container, style]}>
      {['BTC', 'USD'].map((c) => (
        <Pressable style={styles.block} key={c}>
          <Image source={images[c]} />
          <AppText style={styles.text}>{c}</AppText>
          <Image source={images['Arrow']} />
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
    width: '48%',
    height: 45,
    paddingHorizontal: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 10,
    flex: 1,
  },
});
