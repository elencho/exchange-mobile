import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import Skeleton from '../Skeleton';

const TotalBalanceSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <Skeleton width={156} height={12} style={{ marginBottom: 10 }} />
      <Skeleton width={84} height={8} style={{}} />
    </View>
  );
};

export default TotalBalanceSkeleton;

const styles = StyleSheet.create({
  secSmallWrapper: {
    alignItems: 'flex-end',
  },
  wrapper: {
    paddingVertical: 28,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
});
