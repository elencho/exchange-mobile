import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import AppText from '../AppText';

export default function DownloadTransactions() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Image
          source={require('../../assets/images/Download.png')}
          style={styles.icon}
        />
        <AppText style={{ fontSize: 12, color: '#C0C5E0' }}>Download</AppText>
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
