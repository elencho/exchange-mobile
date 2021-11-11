import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import AppText from '../AppText';

export default function Transaction() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.deposit}
        source={require('../../assets/images/Deposit.png')}
      />

      <View style={styles.middle}>
        <AppText medium style={styles.white}>
          Deposit
        </AppText>
        <AppText style={styles.text}>Cdfkmdf..mfdfsdmd</AppText>
      </View>

      <View style={styles.right}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppText style={[styles.text, { marginRight: 5 }]}>Failed</AppText>
          <Image
            source={require('../../assets/images/Failed.png')}
            style={styles.dot}
          />
        </View>

        <AppText medium style={styles.white}>
          0.00008060 LTC
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: { width: 5, height: 5 },
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
  text: { fontSize: 12, color: '#696F8E' },
  white: { fontSize: 14, color: 'white' },
});
