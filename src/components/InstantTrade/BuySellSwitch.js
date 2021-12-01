import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function BuySellSwitch() {
  return (
    <View style={styles.container}>
      {['Buy', 'Sell'].map((t) => (
        <Pressable style={styles.button} key={t}>
          <AppText style={styles.text} body>
            {t}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CCBB5',
    height: 35,
    width: '48%',
    borderRadius: 40,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
