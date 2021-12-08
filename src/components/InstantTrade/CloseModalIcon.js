import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import images from '../../constants/images';

export default function CloseModalIcon({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={onPress}>
        <Image source={images.Close} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { alignItems: 'flex-end' },
});
