import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import Skeleton from '../Skeleton';

const CurrencySkeleton = () => {
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.lastWrapper}>
        <Skeleton width={34} height={34} style={{ borderRadius: 100 }} />
        <View style={styles.smallWrapper}>
          <Skeleton width={80} height={10} style={{ marginBottom: 8 }} />
          <Skeleton width={160} height={8} />
        </View>
      </View>
    </View>
  );
};

export default CurrencySkeleton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  smallWrapper: {
    marginLeft: 18,
    justifyContent: 'center',
  },
  lastWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  secSmallWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mainWrapper: {
    marginBottom: 30,
  },
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 24,
    paddingBottom: 30,
    marginBottom: 12,
  },
});
