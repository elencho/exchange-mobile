import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';
import AppText from '../AppText';

export default function TopRow() {
  return (
    <View style={styles.topRow}>
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.logo}
      />

      <View style={styles.profile}>
        <AppText medium style={styles.text}>
          NT
        </AppText>
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 13,
    height: 13,
    borderWidth: 4,
    borderRadius: 2,
    borderColor: colors.PRIMARY_BACKGROUND,
    backgroundColor: '#21E0A5',
    marginTop: -2,
    marginRight: -2,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  profile: {
    backgroundColor: '#323753',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { color: colors.PRIMARY_TEXT, fontSize: 15 },
});
