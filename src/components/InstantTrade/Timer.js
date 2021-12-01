import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProgressBar from 'react-native-animated-progress';

import AppText from '../AppText';

export default function Timer() {
  return (
    <View>
      <ProgressBar
        backgroundColor="#0CCBB5"
        height={3}
        progress={30}
        trackColor="rgba(131, 157, 180, 0.23)"
      />
      <AppText style={styles.text} subtext body>
        Price update in 00:30
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#0CCBB5',
    marginTop: 10,
  },
});
