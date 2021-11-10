import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Transaction() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.deposit}
        source={require('../../assets/images/Deposit.png')}
      />

      <View style={styles.middle}>
        <Text style={{ fontSize: 14, color: 'white' }}>Deposit</Text>
        <Text style={{ fontSize: 12, color: '#696F8E' }}>
          Cdfkmdf..mfdfsdmd
        </Text>
      </View>

      <View style={styles.right}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 12,
              color: '#696F8E',
              marginRight: 5,
            }}
          >
            Failed
          </Text>
          <Image
            source={require('../../assets/images/Failed.png')}
            style={{ width: 5, height: 5 }}
          />
        </View>

        <Text style={{ fontSize: 14, color: 'white' }}>0.00008060 LTC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  deposit: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
    marginRight: 10,
  },
  middle: {
    justifyContent: 'space-between',
    flex: 1,
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
