import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Headline({ title }) {
  return <Text style={styles.text}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: { color: 'white', fontSize: 20, marginVertical: 20 },
});
