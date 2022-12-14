import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TopRow } from '../components/InstantTrade/TransactionsBlock';
import Skeleton from '../components/Skeleton';
import colors from '../constants/colors';

const SecondPart = () => (
  <View style={styles.container}>
    <View style={styles.lastWrapper}>
      <View style={styles.smallWrapper}>
        <Skeleton
          width={59}
          height={10}
          style={{ marginBottom: 8, marginTop: 30 }}
        />
        <Skeleton width={96} height={8} style={{ marginBottom: 14 }} />
        <Skeleton width={125} height={7} style={{ marginBottom: 8 }} />
      </View>
    </View>
    <View style={styles.secSmallWrapper}>
      <Skeleton
        width={92}
        height={10}
        style={{ marginBottom: 8, marginTop: 30 }}
      />
      <Skeleton width={122} height={8} style={{ marginBottom: 14 }} />
      <Skeleton width={52} height={7} style={{ marginBottom: 8 }} />
    </View>
  </View>
);

const TransactionsSkeleton = () => (
  <View style={styles.box}>
    <TopRow text={'Hide '} />
    {[1, 2, 3].map(() => (
      <>
        <SecondPart />
        <View style={styles.line} />
      </>
    ))}
  </View>
);
export default TransactionsSkeleton;

const styles = StyleSheet.create({
  smallWrapper: {
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
    marginTop: 30,
  },
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,

    marginBottom: 12,
    flexDirection: 'row',
    flex: 1,
  },
  box: {
    marginTop: 10,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 36,
  },
  line: {
    backgroundColor: '#232945',
    height: 2,
    flex: 1,
  },
});
