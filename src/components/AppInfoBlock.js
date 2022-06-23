import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';

export default function AppInfoBlock({ text, ...rest }) {
  return (
    <View style={styles.info} {...rest}>
      <AppText subtext style={styles.infoText}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(149, 164, 247, 0.07)',
    marginTop: 16,
  },
  infoText: {
    lineHeight: 18,
    textAlign: 'justify',
    color: '#838BB2',
  },
});
