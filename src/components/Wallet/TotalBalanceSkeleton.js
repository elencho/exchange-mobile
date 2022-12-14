import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import Skeleton from '../Skeleton';

const TotalBalanceSkeleton = () => {
  return (
    <View style={styles.mainWrapper}>
      <Skeleton width={44} height={44} style={{ borderRadius: 2 }} />
      <View style={styles.wrapper}>
        <Skeleton width={156} height={12} style={{ marginBottom: 10 }} />
        <Skeleton width={84} height={8} style={{}} />
      </View>
    </View>
  );
};

export default TotalBalanceSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginLeft: 20,
  },
  smallWrapper: {
    marginLeft: 18,
  },
  lastWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  secSmallWrapper: {
    alignItems: 'flex-end',
  },
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 28,
    paddingLeft: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
});
