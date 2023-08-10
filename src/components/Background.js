import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

export default function Background({ children, style, modal }) {
  return (
    <View style={[styles.container, { ...style }]}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 15,
  },
});
