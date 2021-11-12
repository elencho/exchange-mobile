import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

export default function Background({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
