import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppToast() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 35,
    backgroundColor: '#1BBE9E',

    position: 'absolute',
    left: 20,
    right: 20,
    top: 35,
    zIndex: 1,
  },
});
