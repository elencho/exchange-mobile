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
  phoneCountry,
  phoneCode,
}) {
  const backgroundCond = () => {
    if (name === currentItem || code === currentItem) {
      return styles.background;
    }
  };

  const text = phoneCountry ? (
    <>
      <AppText medium style={styles.primary}>
        ({phoneCode})
      </AppText>
      <AppText medium numberOfLines={1} style={[styles.secondary, { flex: 1 }]}>
        {' '}
        {name}
      </AppText>
    </>
  ) : (
    <>
      <AppText medium style={styles.primary}>
        {name}
      </AppText>
      <AppText medium style={styles.secondary}>
        {' '}
        ({code})
      </AppText>
    </>
  );

  return (
    <TouchableOpacity
      style={[styles.container, backgroundCond()]}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri }} />
      {text}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: { backgroundColor: 'rgba(101, 130, 253, 0.1 )' },
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
  primary: { color: colors.PRIMARY_TEXT },
  secondary: { color: colors.SECONDARY_TEXT },
});
