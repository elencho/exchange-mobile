import React, { memo } from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '../constants/colors';
import { IS_IOS } from '../constants/system';

function Background({ children, style, modal }) {
  const { top, bottom, right, left } = useSafeAreaInsets();
  const safeAreaStyles = {
    paddingTop: top,
    paddingLeft: left,
    paddingRight: right,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  };
  return (
    <>
      {IS_IOS && <View style={safeAreaStyles} />}
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
    paddingHorizontal: 20,
  },
  safeArea: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
