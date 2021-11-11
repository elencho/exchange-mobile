import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function Currency({ name, abbr }) {
  return (
    <Pressable style={styles.container}>
      <Image
        source={require('../../assets/images/Currencies/BTC.png')}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
      {abbr ? <Text style={styles.abbr}> {`(${abbr})`}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  abbr: {
    fontSize: 15,
    color: '#696F8E',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    marginHorizontal: 10,
  },
  name: {
    fontSize: 15,
    color: 'white',
  },
});
