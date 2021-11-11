import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../AppText';
import Transaction from './Transaction';

export default function TransactionDate() {
  return (
    <View style={styles.container}>
      <AppText style={{ fontSize: 15, color: '#696F8E', marginBottom: 15 }}>
        20 May, 2021
      </AppText>

      <Transaction />
      <Transaction />
      <Transaction />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#1F1F35',
  },
});
