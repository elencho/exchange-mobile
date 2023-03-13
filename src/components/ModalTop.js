import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

export default function ModalTop() {
  return (
    <View style={styles.top}>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 6,
    width: '25%',
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  top: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
