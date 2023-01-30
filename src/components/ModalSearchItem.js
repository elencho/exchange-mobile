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

  return (
    <TouchableOpacity
      style={[styles.container, backgroundCond()]}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri }} />
      <AppText medium style={{ color: colors.PRIMARY_TEXT }}>
        {name}
      </AppText>
      {code ? (
        <AppText
          medium
          style={{
            color: colors[phoneCountry ? 'PRIMARY_TEXT' : 'SECONDARY_TEXT'],
          }}
        >
          {' '}
          ({phoneCountry ? phoneCode : code})
        </AppText>
      ) : null}
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
});
