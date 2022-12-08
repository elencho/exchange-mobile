import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from '../Skeleton';

const TransactionSkeleton = () => {
  return (
    <View style={styles.mainWrapper}>
      <Skeleton width={78} height={8} style={{ marginBottom: 30 }} />
      <View style={styles.wrapper}>
        <View style={styles.lastWrapper}>
          <Skeleton
            width={33}
            height={33}
            style={{ borderTopLeftRadius: 13 }}
          />
          <View style={styles.smallWrapper}>
            <Skeleton width={58} height={10} style={{ marginBottom: 8 }} />
            <Skeleton width={120} height={8} style={{}} />
          </View>
        </View>
        <View style={styles.secSmallWrapper}>
          <Skeleton width={36} height={8} style={{ marginBottom: 8 }} />
          <Skeleton width={66} height={8} style={{}} />
        </View>
      </View>
    </View>
  );
};

export default TransactionSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
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
    marginTop: 20,
  },
});
