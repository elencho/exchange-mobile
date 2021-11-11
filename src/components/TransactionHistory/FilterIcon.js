import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import AppText from '../AppText';

export default function FilterIcon({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={require('../../assets/images/Filter.png')}
        style={styles.icon}
      />
      <AppText style={styles.text}>3</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    minWidth: 35,
    borderRadius: 30,
    backgroundColor: '#4A6DFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  icon: {
    width: 13,
    height: 13,
  },
  text: {
    fontSize: 15,
    color: 'white',
    marginLeft: 5,
  },
});
