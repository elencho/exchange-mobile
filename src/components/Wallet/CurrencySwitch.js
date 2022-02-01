import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function CurrencySwitch({ filter, setFilter }) {
  return (
    <View style={styles.row}>
      {['USD', 'BTC'].map((f, i) => (
        <Pressable
          key={f}
          style={[styles.filter, i === 1 && { marginLeft: 8 }]}
          onPress={() => setFilter(f)}
        >
          <AppText
            body
            style={{
              color:
                colors[f === filter ? 'SECONDARY_PURPLE' : 'SECONDARY_TEXT'],
            }}
          >
            {f}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: 55,
    height: 25,
    borderRadius: 13,
    backgroundColor: 'rgba(122, 132, 181, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
