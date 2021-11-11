import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../AppText';

export default function TransactionDetails() {
  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.leftText}>Method:</AppText>
        <AppText style={styles.leftText}>Amount:</AppText>
        <AppText style={styles.leftText}>Fee:</AppText>
        <AppText style={styles.leftText}>Date / Time:</AppText>
        <AppText style={styles.leftText}>Status:</AppText>
      </View>

      <View style={styles.right}>
        <AppText medium style={styles.rightText}>
          Wallet Internal
        </AppText>
        <AppText medium style={styles.rightText}>
          0.00008060 BTC
        </AppText>
        <AppText medium style={styles.rightText}>
          0.00008060 BTC
        </AppText>
        <AppText medium style={styles.rightText}>
          20 May, 2021 / 20:00:06
        </AppText>
        <AppText medium style={styles.rightText}>
          Success
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: 'white',
  },
});
