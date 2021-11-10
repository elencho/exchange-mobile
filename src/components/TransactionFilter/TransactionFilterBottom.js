import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TransactionFilterBottom() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.white}>Show Result</Text>
      </Pressable>
      <Text style={styles.blue}>Clear Filter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  blue: {
    fontSize: 15,
    color: '#6582FD',
    marginVertical: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A6DFF',
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
  },
  white: {
    fontSize: 15,
    color: 'white',
  },
});
