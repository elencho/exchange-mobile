import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TransactionFilterBottom() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <AppText medium style={styles.white}>
          Show Result
        </AppText>
      </Pressable>

      <Pressable style={styles.download}>
        <Image source={require('../../assets/images/Download.png')} />
        <AppText medium style={styles.blue}>
          Download
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  blue: {
    fontSize: 15,
    color: colors.SECONDARY_PURPLE,
    marginVertical: 30,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: colors.PRIMARY_PURPLE,
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
  },
  download: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
  },
});
