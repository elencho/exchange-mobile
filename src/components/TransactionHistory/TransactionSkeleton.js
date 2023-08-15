import React from 'react';
import { View, StyleSheet } from 'react-native';
import Skeleton from '../Skeleton';

const MainPart = () => (
  <View style={styles.container}>
    <View style={styles.top}>
      <View style={styles.topLeft}>
        <View style={{ gap: 10 }}>
          <Skeleton width={58} height={10} />
          <Skeleton width={36} height={17} style={{ borderRadius: 22 }} />
        </View>
        <View style={styles.middle}>
          <Skeleton width={84} height={8} style={{ marginBottom: 4 }} />
        </View>
        <View style={styles.right}>
          <Skeleton width={103} height={8} />
          <Skeleton width={60} height={8} style={{ marginBottom: 4 }} />
        </View>
      </View>
    </View>
    <View style={styles.bottom}>
      <View style={styles.bottomLeft}>
        <Skeleton width={80} height={8} />
        <Skeleton width={80} height={8} />
      </View>
      <View style={styles.bottomRight}>
        <Skeleton width={97} height={8} />
        <Skeleton width={66} height={8} />
      </View>
    </View>
    <View style={styles.line} />
  </View>
);

const TransactionSkeleton = ({ length }) =>
  length?.map((a, i) => (
    <View key={i}>
      <MainPart />
    </View>
  ));

export default TransactionSkeleton;

const styles = StyleSheet.create({
  //
  container: {},
  middle: {
    justifyContent: 'flex-end',
    marginLeft: 10,
    flex: 1,
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  top: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topLeft: { flexDirection: 'row' },
  bottomLeft: {
    gap: 13,
  },
  bottomRight: { gap: 13, alignItems: 'flex-end' },
  bottom: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  line: {
    marginTop: 23,
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(63, 66, 91, 0.3)',
  },
});
