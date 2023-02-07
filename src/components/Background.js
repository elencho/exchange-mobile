import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

export default function Background({ children, style, modal }) {
  const paddingHorizontal = modal ? 30 : 15;
  return (
    <View style={[styles.container, { paddingHorizontal, ...style }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: 20,
  },
});
