import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function DownloadTransactions() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Image
          source={require('../../assets/images/Download.png')}
          style={styles.icon}
        />
        <Text style={{ fontSize: 12, color: '#C0C5E0' }}>Download</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#272A4B',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
});
