import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../../constants/colors';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';

export default function BulletsBlock() {
  const bullets = [
    'A deposit address is necessary if you are receiving assets from outside of Cryptal',
    'You do not need an address to trade',
  ];

  const Bullet = ({ b }) => (
    <View style={styles.row}>
      <View style={styles.bullet} />
      <AppText subtext style={styles.subtext}>
        {b}
      </AppText>
    </View>
  );

  return (
    <View style={styles.block}>
      {bullets.map((b) => (
        <Bullet key={b} b={b} />
      ))}

      <View
        style={[
          styles.row,
          {
            marginBottom: 0,
            flexWrap: 'wrap',
          },
        ]}
      >
        <View style={styles.bullet} />
        <AppText subtext style={styles.subtext}>
          Contact
        </AppText>
        <PurpleText style={styles.purpleText} text="support@cryptal.com" />
        <AppText subtext style={[styles.subtext, { marginLeft: 20 }]}>
          to request a deposit address
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 35,
    marginTop: 12,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#838BB2',
    marginTop: 5,
  },
  purpleText: {
    transform: [{ scale: 0.9 }, { translateY: -1 }],
  },
  row: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  subtext: {
    color: '#838BB2',
    lineHeight: 15,
    marginLeft: 15,
  },
});
