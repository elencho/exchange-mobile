import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Transaction from './Transaction';

export default function TransactionDate() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, color: '#696F8E', marginBottom: 15 }}>
        20 May, 2021
      </Text>

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
