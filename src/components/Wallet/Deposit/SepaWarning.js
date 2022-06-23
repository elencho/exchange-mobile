import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../../AppText';

export default function SepaWarning() {
  return (
    <View style={styles.bullets}>
      <View style={styles.row}>
        <View style={styles.bullet} />
        <AppText style={styles.light} subtext>
          Make sure your bank supports SEPA transfers
        </AppText>
      </View>

      <View style={{ marginVertical: 5 }} />

      <View style={styles.row}>
        <View style={styles.bullet} />
        <AppText style={styles.light} subtext>
          Wire transfers take up to 1 working day
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bullet: {
    backgroundColor: '#FFC65C',
    width: 4,
    height: 4,
    marginRight: 15,
    marginTop: 4,
  },
  bullets: {
    backgroundColor: 'rgba(242, 223, 180, 0.04)',
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginTop: 20,
  },
  light: {
    color: '#F2DFB4',
  },
  row: {
    flexDirection: 'row',
  },
});
