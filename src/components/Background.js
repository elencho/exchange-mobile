import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Background({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161629',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
