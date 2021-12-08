import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import AppText from '../AppText';

export default function TradeDetails() {
  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.leftText}>Amount:</AppText>
        <AppText style={styles.leftText}>Price:</AppText>
        <AppText style={styles.leftText}>Create Date::</AppText>
        <AppText style={styles.leftText}>End Date:</AppText>
        <AppText style={styles.leftText}>Status:</AppText>
      </View>

      <View style={styles.right}>
        <AppText medium style={[styles.rightText, styles.capitalize]}>
          200.00 GEL / 0.000008 BTC
        </AppText>
        <AppText medium style={styles.rightText}>
          0.00008060 BTC
        </AppText>
        <AppText medium style={styles.rightText}>
          20 August, 2021 / 12:00:00
        </AppText>
        <AppText medium style={styles.rightText}>
          05 July / 10:02:00
        </AppText>
        <AppText medium style={[styles.rightText, styles.capitalize]}>
          Success
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capitalize: { textTransform: 'capitalize' },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
  },
  leftText: {
    color: '#C0C5E0',
    fontSize: 12,
    marginVertical: 5,
  },
  rightText: {
    fontSize: 12,
    marginVertical: 5,
    color: colors.PRIMARY_TEXT,
  },
});
