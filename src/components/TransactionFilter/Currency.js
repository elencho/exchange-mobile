import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';

import colors from '../../constants/colors';
import images from '../../constants/images';

export default function Currency({ name, code, onPress }) {
  const state = useSelector((state) => state);
  const {
    transactions: { currency },
  } = state;

  const backgroundCond = () => {
    if (name === currency) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1 )' };
    }
  };

  return (
    <Pressable style={[styles.container, backgroundCond()]} onPress={onPress}>
      <Image source={images.BTC} style={styles.image} />
      <AppText medium style={styles.name}>
        {name}
      </AppText>
      {code ? (
        <AppText medium style={styles.code}>
          {' '}
          ({code})
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  code: {
    fontSize: 15,
    color: colors.SECONDARY_TEXT,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
    paddingVertical: 10,
  },
  image: {
    marginHorizontal: 10,
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
  },
});
