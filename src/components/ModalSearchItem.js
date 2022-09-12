import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import colors from '../constants/colors';

export default function ModalSearchItem({
  name,
  code,
  onPress,
  currentItem,
  uri,
}) {
  const backgroundCond = () => {
    if (name === currentItem || code === currentItem) {
      return styles.background;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, backgroundCond()]}
      onPress={onPress}
    >
      <Image source={{ uri }} style={styles.image} />
      <AppText medium style={styles.name}>
        {name}
      </AppText>
      {code ? (
        <AppText medium style={styles.code}>
          {' '}
          ({code})
        </AppText>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: { backgroundColor: 'rgba(101, 130, 253, 0.1 )' },
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
