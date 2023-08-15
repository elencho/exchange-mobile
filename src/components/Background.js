import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

export default function Background({ children, style, modal }) {
  return <View style={[styles.container, { ...style }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 15,
  },
});
