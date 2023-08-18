import React, { memo } from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';

import colors from '../constants/colors';
import { IS_IOS } from '../constants/system';

function Background({ children, style, modal }) {
  return (
    <>
      {IS_IOS && <SafeAreaView style={styles.safeArea} />}
      <View style={[styles.container, { ...style }]}>{children}</View>
      {IS_IOS && <SafeAreaView style={styles.safeArea} />}
    </>
  );
}
export default memo(Background);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 15,
  },
  safeArea: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
